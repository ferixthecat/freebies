import { Colors } from "@/constants/theme";
import {
  birthdayToDate,
  dateToBirthday,
  formatBirthday,
} from "@/utils/dateUtils";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SectionWrapper from "./SectionWrapper";
import SettingRow from "./SettingRow";

interface BirthdaySectionProps {
  user: any;
  setUser: (user: any) => void;
}

const BirthdaySection = ({ user, setUser }: BirthdaySectionProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (!selectedDate) return;

    setUser({ ...user, birthday: dateToBirthday(selectedDate) });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <SectionWrapper title="Birthday">
      <SettingRow
        icon="calendar"
        label="Your Birthday"
        value={formatBirthday(user?.birthday)}
        onPress={() => setShowPicker(true)}
        showChevron
      />

      {user?.birthday && (
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
          value={birthdayToDate(user?.birthday)}
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
});

export default BirthdaySection;
