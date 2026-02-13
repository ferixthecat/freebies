import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import SectionWrapper from "./SectionWrapper";
import SettingRow from "./SettingRow";

const NotificationsSection = () => {
  const {
    enabled,
    dayBefore,
    weekBefore,
    advanceSignup,
    toggleEnabled,
    toggleDayBefore,
    toggleWeekBefore,
    toggleAdvanceSignup,
  } = useNotificationSettings();

  return (
    <SectionWrapper title="Notifications">
      <SettingRow
        icon={enabled ? "notifications" : "notifications-off"}
        label="Enable Notifications"
        description="Get reminders about your birthday freebies"
        toggle={{ value: enabled, onChange: toggleEnabled }}
      />

      {enabled && (
        <>
          <SettingRow
            indent
            label="Day Before Birthday"
            description="Remind me the day before my birthday"
            toggle={{ value: dayBefore, onChange: toggleDayBefore }}
          />
          <SettingRow
            indent
            label="Week Before Birthday"
            description="Remind me a week before my birthday"
            toggle={{ value: weekBefore, onChange: toggleWeekBefore }}
          />
          <SettingRow
            indent
            label="Advance Signup Reminders"
            description="Alert me when freebies need early signup"
            toggle={{ value: advanceSignup, onChange: toggleAdvanceSignup }}
          />
        </>
      )}
    </SectionWrapper>
  );
};

export default NotificationsSection;
