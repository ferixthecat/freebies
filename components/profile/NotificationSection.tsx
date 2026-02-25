import { Colors } from "@/constants/theme";
import { useNotificationScheduler } from "@/hooks/useNotificationScheduler";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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

  const {
    permissionStatus,
    isScheduling,
    requestPermission,
    rescheduleAll,
    hasBirthday,
    hasPermission,
  } = useNotificationScheduler();

  const handleRequestPermission = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const granted = await requestPermission();

    if (!granted) {
      Alert.alert(
        "Notifications Blocked",
        "To receive birthday freebie reminders, enable notifications in your device settings.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Open Settings",
            onPress: () => Linking.openSettings(),
          },
        ],
      );
    }
  };

  const handleReschedule = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await rescheduleAll();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Done", "Notifications have been rescheduled.");
  };

  // Permission denied banner
  if (permissionStatus === "denied") {
    return (
      <SectionWrapper title="Notifications">
        <View style={styles.permissionBanner}>
          <Ionicons name="notifications-off" size={32} color="#F59E0B" />
          <Text style={styles.permissionTitle}>Notifications are blocked</Text>
          <Text style={styles.permissionSubtitle}>
            Enable notifications so we can remind you to claim your birthday
            freebies on time.
          </Text>
          <TouchableOpacity
            style={styles.openSettingsButton}
            onPress={() => Linking.openSettings()}
          >
            <Text style={styles.openSettingsText}>Open Device Settings</Text>
          </TouchableOpacity>
        </View>
      </SectionWrapper>
    );
  }

  // Permission not yet requested
  if (permissionStatus === "undetermined") {
    return (
      <SectionWrapper title="Notifications">
        <View style={styles.permissionBanner}>
          <Ionicons
            name="notifications-outline"
            size={32}
            color={Colors.secondary}
          />
          <Text style={styles.permissionTitle}>Enable Notifications</Text>
          <Text style={styles.permissionSubtitle}>
            Get reminders to sign up for freebies early, and alerts when your
            birthday freebies are ready to claim.
          </Text>
          <TouchableOpacity
            style={styles.enableButton}
            onPress={handleRequestPermission}
          >
            <Text style={styles.enableButtonText}>Enable Notifications</Text>
          </TouchableOpacity>
        </View>
      </SectionWrapper>
    );
  }

  // No birthday set warning
  const NoBirthdayWarning = !hasBirthday ? (
    <View style={styles.warningBox}>
      <Ionicons name="alert-circle-outline" size={16} color="#F59E0B" />
      <Text style={styles.warningText}>
        Set your birthday in the Birthday section above to activate reminders.
      </Text>
    </View>
  ) : null;

  // Scheduling Indicator
  const SchedulingIndicator = isScheduling ? (
    <View style={styles.schedulingRow}>
      <ActivityIndicator size="small" color={Colors.secondary} />
      <Text style={styles.schedulingText}>Updating notifications...</Text>
    </View>
  ) : null;

  return (
    <SectionWrapper title="Notifications">
      {NoBirthdayWarning}
      {SchedulingIndicator}

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
            label="Birthday Day Reminder"
            description="Alert on your birthday morning at 8am"
            toggle={{ value: true, onChange: () => {} }}
          />
          <SettingRow
            indent
            label="Day Before Birthday"
            description="Remind me the day before"
            toggle={{ value: dayBefore, onChange: toggleDayBefore }}
          />
          <SettingRow
            indent
            label="Week Before Birthday"
            description="Remind me a week before"
            toggle={{ value: weekBefore, onChange: toggleWeekBefore }}
          />
          <SettingRow
            indent
            label="Advance Signup Reminders"
            description="Alert when freebies need early signup"
            toggle={{ value: advanceSignup, onChange: toggleAdvanceSignup }}
          />

          {/* Manual reschedule */}
          {hasPermission && hasBirthday && (
            <TouchableOpacity
              style={styles.rescheduleButton}
              onPress={handleReschedule}
              disabled={isScheduling}
            >
              <Ionicons name="refresh" size={16} color={Colors.secondary} />
              <Text style={styles.rescheduleText}>
                {isScheduling ? "Rescheduling..." : "Reschedule All Reminders"}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </SectionWrapper>
  );
};

const styles = StyleSheet.create({
  permissionBanner: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 8,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.dark,
    textAlign: "center",
    marginTop: 4,
  },
  permissionSubtitle: {
    fontSize: 14,
    color: Colors.muted,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 8,
  },
  enableButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  enableButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  openSettingsButton: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  openSettingsText: {
    color: Colors.secondary,
    fontWeight: "600",
    fontSize: 15,
  },
  warningBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    padding: 12,
    backgroundColor: "#FFFBEB",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: "#92400E",
    lineHeight: 18,
  },
  schedulingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    padding: 12,
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
  },
  schedulingText: {
    fontSize: 13,
    color: Colors.secondary,
  },
  rescheduleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    backgroundColor: Colors.primaryLight,
  },
  rescheduleText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.secondary,
  },
});

export default NotificationsSection;
