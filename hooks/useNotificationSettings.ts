import * as Haptics from "expo-haptics";
import { useState } from "react";

interface NotificationSettings {
  enabled: boolean;
  dayBefore: boolean;
  weekBefore: boolean;
  advanceSignup: boolean;
}

interface UseNotificationSettingsProps {
  user: any;
  setUser: (user: any) => void;
}

export const useNotificationSettings = ({
  user,
  setUser,
}: UseNotificationSettingsProps) => {
  const [enabled, setEnabled] = useState<boolean>(
    user?.notifications?.enabled ?? true,
  );
  const [dayBefore, setDayBefore] = useState<boolean>(
    user?.notifications?.dayBefore ?? true,
  );
  const [weekBefore, setWeekBefore] = useState<boolean>(
    user?.notifications?.weekBefore ?? true,
  );
  const [advanceSignup, setAdvanceSignup] = useState<boolean>(
    user?.notifications?.advanceSignup ?? true,
  );

  const updateUser = (updated: Partial<NotificationSettings>) => {
    setUser({
      ...user,
      notifications: {
        ...user?.notifications,
        ...updated,
      },
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const toggleEnabled = (value: boolean) => {
    setEnabled(value);
    updateUser({ enabled: value });
  };

  const toggleDayBefore = (value: boolean) => {
    setDayBefore(value);
    updateUser({ dayBefore: value });
  };

  const toggleWeekBefore = (value: boolean) => {
    setWeekBefore(value);
    updateUser({ weekBefore: value });
  };

  const toggleAdvanceSignup = (value: boolean) => {
    setAdvanceSignup(value);
    updateUser({ advanceSignup: value });
  };

  return {
    enabled,
    dayBefore,
    weekBefore,
    advanceSignup,
    toggleEnabled,
    toggleDayBefore,
    toggleWeekBefore,
    toggleAdvanceSignup,
  };
};
