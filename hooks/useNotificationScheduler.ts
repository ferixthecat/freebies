import { restaurants } from "@/data/businesses";
import { useSavedFreebiesStore } from "@/hooks/use-savedfreebies";
import useUserStore from "@/hooks/use-userstore";
import {
  BirthdayNotificationConfig,
  cancelAllNotifications,
  cancelNotificationsForFreebie,
  getNotificationPermissionStatus,
  requestNotificationPermissions,
  scheduleAllFreebieNotifications,
  scheduleFreebieNotifications,
} from "@/services/notificationService";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNotificationSettings } from "./useNotificationSettings";

/**
 * Central hook that owns the notification scheduling lifecycle.
 *
 * Responsibilities:
 * - Request permission on first call
 * - Rebuild and reschedule whenever birthday, savedFreebies, or settings change
 * - Expose permission status + manual reschedule trigger to the UI
 */

export const useNotificationScheduler = () => {
  const { profile } = useUserStore();
  const { savedFreebies } = useSavedFreebiesStore();
  const settings = useNotificationSettings();

  const [permissionStatus, setPermissionStatus] = useState<
    "granted" | "denied" | "undetermined" | "loading"
  >("loading");
  const [isScheduling, setIsScheduling] = useState(false);

  // Track the last values we scheduled for — avoids redundant reschedules
  const lastScheduledRef = useRef<string>("");

  const birthday = useMemo(
    () =>
      profile?.birthday_month && profile?.birthday_day
        ? { month: profile.birthday_month, day: profile.birthday_day }
        : null,
    [profile?.birthday_month, profile?.birthday_day],
  );

  // Permission check on mount
  useEffect(() => {
    getNotificationPermissionStatus().then(setPermissionStatus);
  }, []);

  // Build configs from current state
  const buildConfigs = useCallback((): BirthdayNotificationConfig[] => {
    if (!birthday || savedFreebies.length === 0) return [];

    return savedFreebies
      .map((id) => restaurants.find((r) => r.id === id))
      .filter((r): r is NonNullable<typeof r> => !!r)
      .map((r) => ({
        freebieId: r.id,
        businessName: r.name,
        offerTitle: r.offer.title,
        birthday,
        settings: {
          enabled: settings.enabled,
          dayBefore: settings.dayBefore,
          weekBefore: settings.weekBefore,
          advanceSignup: settings.advanceSignup,
        },
        advanceSignupDays: r.requirements.advanceSignupDays,
      }));
  }, [birthday, savedFreebies, settings]);

  // Reschedule whenever inputs change
  useEffect(() => {
    // Create a stable fingerprint of current state
    const fingerprint = JSON.stringify({
      birthday,
      savedFreebies: [...savedFreebies].sort(),
      settings: {
        enabled: settings.enabled,
        dayBefore: settings.dayBefore,
        weekBefore: settings.weekBefore,
        advanceSignup: settings.advanceSignup,
      },
    });

    // Skip if nothing changed
    if (fingerprint === lastScheduledRef.current) return;
    lastScheduledRef.current = fingerprint;

    const reschedule = async () => {
      const status = await getNotificationPermissionStatus();
      setPermissionStatus(status);

      if (status !== "granted") return;
      if (!settings.enabled) {
        await cancelAllNotifications();
        return;
      }

      setIsScheduling(true);
      try {
        const configs = buildConfigs();
        await scheduleAllFreebieNotifications(configs);
      } finally {
        setIsScheduling(false);
      }
    };

    reschedule();
  }, [birthday, savedFreebies, settings, buildConfigs]);

  // Public API
  const requestPermission = useCallback(async (): Promise<boolean> => {
    const granted = await requestNotificationPermissions();
    setPermissionStatus(granted ? "granted" : "denied");

    if (granted && settings.enabled) {
      setIsScheduling(true);
      try {
        await scheduleAllFreebieNotifications(buildConfigs());
      } finally {
        setIsScheduling(false);
      }
    }

    return granted;
  }, [settings.enabled, buildConfigs]);

  /** Call this after saving a new freebie for immediate scheduling */
  const scheduleForFreebie = useCallback(
    async (freebieId: string) => {
      if (permissionStatus !== "granted" || !settings.enabled || !birthday)
        return;

      const restaurant = restaurants.find((r) => r.id === freebieId);
      if (!restaurant) return;

      await scheduleFreebieNotifications({
        freebieId: restaurant.id,
        businessName: restaurant.name,
        offerTitle: restaurant.offer.title,
        birthday,
        settings: {
          enabled: settings.enabled,
          dayBefore: settings.dayBefore,
          weekBefore: settings.weekBefore,
          advanceSignup: settings.advanceSignup,
        },
        advanceSignupDays: restaurant.requirements.advanceSignupDays,
      });
    },
    [birthday, permissionStatus, settings],
  );

  /** Call this after unsaving a freebie */
  const cancelForFreebie = useCallback(async (freebieId: string) => {
    await cancelNotificationsForFreebie(freebieId);
  }, []);

  /** Manual full reschedule — expose to settings UI */
  const rescheduleAll = useCallback(async () => {
    if (permissionStatus !== "granted") return;
    lastScheduledRef.current = ""; // force reschedule
    setIsScheduling(true);
    try {
      await scheduleAllFreebieNotifications(buildConfigs());
    } finally {
      setIsScheduling(false);
    }
  }, [permissionStatus, buildConfigs]);

  return {
    permissionStatus,
    isScheduling,
    requestPermission,
    scheduleForFreebie,
    cancelForFreebie,
    rescheduleAll,
    hasBirthday: !!birthday,
    hasPermission: permissionStatus === "granted",
  };
};
