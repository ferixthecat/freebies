import { Colors } from "@/constants/theme";
import useUserStore from "@/hooks/use-userstore";
import { birthdayToDate, formatBirthday } from "@/utils/dateUtils";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import SectionWrapper from "./SectionWrapper";
import SettingRow from "./SettingRow";

const BirthdaySection = () => {
  const { profile, updateProfile, profileLoading } = useUserStore();
  const [showPicker, setShowPicker] = useState(false);

  const birthday =
    profile?.birthday_month && profile?.birthday_day
      ? { month: profile.birthday_month, day: profile.birthday_day }
      : { month: 1, day: 1 };

  const handleDateChange = async (_event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (!selectedDate) return;

    try {
      await updateProfile({
        birthday_month: selectedDate.getMonth() + 1,
        birthday_day: selectedDate.getDate(),
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error("Error updating birthday:", error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <SectionWrapper title="Birthday">
      <SettingRow
        icon="calendar"
        label="Your Birthday"
        value={formatBirthday(birthday)}
        onPress={() => setShowPicker(true)}
        showChevron
      />

      {profileLoading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="small" color={Colors.secondary} />
          <Text style={styles.loadingText}>Updating...</Text>
        </View>
      )}

      {birthday && !profileLoading && (
        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle"
            size={16}
            color={Colors.secondary}
          />
          <Text style={styles.infoText}>
            We&apos;ll notify you about freebies you can claim around this date
          </Text>
        </View>
      )}

      {showPicker && (
        <DateTimePicker
          value={birthdayToDate(birthday)}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </SectionWrapper>
  );
};

const styles = StyleSheet.create({
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 8,
    padding: 12,
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Colors.secondary,
    lineHeight: 18,
  },
  loadingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 8,
    padding: 12,
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
  },
  loadingText: {
    fontSize: 13,
    color: Colors.secondary,
  },
});

export default BirthdaySection;
