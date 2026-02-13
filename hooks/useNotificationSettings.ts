import useUserStore from "@/hooks/use-userstore";
import { supabase } from "@/lib/supabase";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";

interface NotificationSettings {
  enabled: boolean;
  dayBefore: boolean;
  weekBefore: boolean;
  advanceSignup: boolean;
}

export const useNotificationSettings = () => {
  const { user } = useUserStore();
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: true,
    dayBefore: true,
    weekBefore: true,
    advanceSignup: true,
  });
  const [loading, setLoading] = useState(false);

  // Fetch notification settings from Supabase
  useEffect(() => {
    if (!user) return;

    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("notification_settings")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error) {
          // If no settings exist, they'll be auto-created by the trigger
          console.log("No notification settings yet");
          return;
        }

        if (data) {
          setSettings({
            enabled: data.enabled,
            dayBefore: data.day_before,
            weekBefore: data.week_before,
            advanceSignup: data.advance_signup,
          });
        }
      } catch (error) {
        console.error("Error fetching notification settings:", error);
      }
    };

    fetchSettings();
  }, [user]);

  const updateSetting = async (updated: Partial<NotificationSettings>) => {
    if (!user) return;

    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Optimistic update
    setSettings((prev) => ({ ...prev, ...updated }));

    try {
      const dbUpdate: any = {};
      if ("enabled" in updated) dbUpdate.enabled = updated.enabled;
      if ("dayBefore" in updated) dbUpdate.day_before = updated.dayBefore;
      if ("weekBefore" in updated) dbUpdate.week_before = updated.weekBefore;
      if ("advanceSignup" in updated)
        dbUpdate.advance_signup = updated.advanceSignup;

      const { error } = await supabase
        .from("notification_settings")
        .update(dbUpdate)
        .eq("user_id", user.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating notification settings:", error);
      // Revert optimistic update on error
      setSettings((prev) => ({
        ...prev,
        ...Object.fromEntries(Object.entries(updated).map(([k, v]) => [k, !v])),
      }));
    } finally {
      setLoading(false);
    }
  };

  const toggleEnabled = (value: boolean) => updateSetting({ enabled: value });
  const toggleDayBefore = (value: boolean) =>
    updateSetting({ dayBefore: value });
  const toggleWeekBefore = (value: boolean) =>
    updateSetting({ weekBefore: value });
  const toggleAdvanceSignup = (value: boolean) =>
    updateSetting({ advanceSignup: value });

  return {
    ...settings,
    loading,
    toggleEnabled,
    toggleDayBefore,
    toggleWeekBefore,
    toggleAdvanceSignup,
  };
};
