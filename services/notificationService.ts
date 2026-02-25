import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Types
export interface BirthdayNotificationConfig {
  freebieId: string;
  businessName: string;
  offerTitle: string;
  birthday: { month: number; day: number };
  settings: {
    enabled: boolean;
    dayBefore: boolean;
    weekBefore: boolean;
    advanceSignup: boolean;
  };
  advanceSignupDays: number;
}

export interface ScheduledNotificationResult {
  freebieId: string;
  scheduledIds: string[];
  skipped: boolean;
  reason?: string;
}

// Permission
export async function requestNotificationPermissions(): Promise<boolean> {
  if (!Device.isDevice) {
    console.warn("[Notifications] Must use physical device for notifications");
    return false;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("birthday-freebies", {
      name: "BirthdayStash",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#0094DD",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  if (existingStatus === "granted") return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

export async function getNotificationPermissionStatus(): Promise<
  "granted" | "denied" | "undetermined"
> {
  const { status } = await Notifications.getPermissionsAsync();
  return status;
}

// Core Scheduling
/**
 * Builds the trigger date for a notification.
 * Always targets the NEXT occurrence of the birthday (this year or next).
 */
function buildTriggerDate(
  birthday: { month: number; day: number },
  offsetDays: number,
  hour = 9,
): Date | null {
  const now = new Date();

  const trigger = new Date(
    now.getFullYear(),
    birthday.month - 1,
    birthday.day,
    hour,
    0,
    0,
    0,
  );

  // Apply offset (e.g. -7 for week before)
  trigger.setDate(trigger.getDate() + offsetDays);

  // If the trigger date has already passed this year, schedule for next year
  if (trigger <= now) {
    trigger.setFullYear(trigger.getFullYear() + 1);
  }

  return trigger;
}

/**
 * Schedule all notifications for a single freebie.
 * Returns the list of notification IDs that were scheduled.
 */
export async function scheduleFreebieNotifications(
  config: BirthdayNotificationConfig,
): Promise<ScheduledNotificationResult> {
  const { freebieId, businessName, offerTitle, birthday, settings, advanceSignupDays } = config;

  if (!settings.enabled) {
    return { freebieId, scheduledIds: [], skipped: true, reason: "notifications disabled" };
  }

  const scheduledIds: string[] = [];

  // 1. Advance signup reminder
  if (settings.advanceSignup && advanceSignupDays > 0) {
    const triggerDate = buildTriggerDate(birthday, -advanceSignupDays);
    if (triggerDate) {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: `⏰ Sign up for ${businessName} freebie`,
          body: `You need to sign up ${advanceSignupDays} days before your birthday to claim: ${offerTitle}`,
          data: { freebieId, type: "advance_signup" },
          sound: true,
        },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
      });
      scheduledIds.push(id);
    }
  }

  // ── 2. Week before ──────────────────────────────────────────────────────
  if (settings.weekBefore) {
    const triggerDate = buildTriggerDate(birthday, -7);
    if (triggerDate) {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: `🎂 Your birthday is in 1 week!`,
          body: `Don't forget: ${businessName} has a freebie for you — ${offerTitle}`,
          data: { freebieId, type: "week_before" },
          sound: true,
        },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
      });
      scheduledIds.push(id);
    }
  }

  // ── 3. Day before ───────────────────────────────────────────────────────
  if (settings.dayBefore) {
    const triggerDate = buildTriggerDate(birthday, -1);
    if (triggerDate) {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: `🎉 Tomorrow is your birthday!`,
          body: `Get ready to claim your ${businessName} freebie: ${offerTitle}`,
          data: { freebieId, type: "day_before" },
          sound: true,
        },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
      });
      scheduledIds.push(id);
    }
  }

  // ── 4. Birthday day ─────────────────────────────────────────────────────
  // Always schedule birthday-day notification when notifications are enabled
  const birthdayTrigger = buildTriggerDate(birthday, 0, 8); // 8am on birthday
  if (birthdayTrigger) {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `🎁 Happy Birthday! Time to claim your freebies!`,
        body: `${businessName}: ${offerTitle} is ready to claim today!`,
        data: { freebieId, type: "birthday_day" },
        sound: true,
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: birthdayTrigger },
    });
    scheduledIds.push(id);
  }

  return { freebieId, scheduledIds, skipped: false };
}

// Batch Operations
/**
 * Schedule notifications for ALL saved freebies at once.
 * Cancels any existing notifications first to avoid duplicates.
 *
 * iOS hard limit: 64 scheduled notifications.
 * Strategy: prioritise advance-signup reminders, then birthday-day,
 * then week/day-before, dropping the least important when over budget.
 */
export async function scheduleAllFreebieNotifications(
  configs: BirthdayNotificationConfig[],
): Promise<void> {
  // Cancel all existing scheduled notifications before rescheduling
  await cancelAllNotifications();

  // iOS budget: 64 total. Each freebie can produce up to 4 notifications.
  // Sort by priority: freebies with advance signup requirements first.
  const sorted = [...configs].sort(
    (a, b) => b.advanceSignupDays - a.advanceSignupDays,
  );

  let totalScheduled = 0;
  const IOS_LIMIT = 60; // leave small buffer

  for (const config of sorted) {
    if (Platform.OS === "ios" && totalScheduled >= IOS_LIMIT) {
      console.warn(
        `[Notifications] iOS limit reached. Skipping ${config.businessName}`,
      );
      break;
    }

    try {
      const result = await scheduleFreebieNotifications(config);
      totalScheduled += result.scheduledIds.length;
    } catch (err) {
      console.error(
        `[Notifications] Failed to schedule for ${config.businessName}:`,
        err,
      );
    }
  }

  console.log(
    `[Notifications] Scheduled ${totalScheduled} notifications for ${sorted.length} freebies`,
  );
}

// Cancel 
export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function cancelNotificationsForFreebie(
  freebieId: string,
): Promise<void> {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const toCancel = scheduled.filter(
    (n) => n.content.data?.freebieId === freebieId,
  );
  await Promise.all(
    toCancel.map((n) => Notifications.cancelScheduledNotificationAsync(n.identifier)),
  );
}

// Debug Helpers
export async function getScheduledNotifications(): Promise<
  Notifications.NotificationRequest[]
> {
  return Notifications.getAllScheduledNotificationsAsync();
}

export async function debugLogScheduled(): Promise<void> {
  const scheduled = await getScheduledNotifications();
  console.log(`[Notifications] ${scheduled.length} notifications scheduled:`);
  scheduled.forEach((n) => {
    console.log(
      `  - ${n.content.title} | freebie: ${n.content.data?.freebieId} | type: ${n.content.data?.type}`,
    );
  });
}

