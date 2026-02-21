import { Colors } from "@/constants/theme";
import useUserStore from "@/hooks/use-userstore";
import { birthdayToDate, formatBirthday } from "@/utils/dateUtils";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SectionWrapper from "./SectionWrapper";
import SettingRow from "./SettingRow";

const BirthdaySection = () => {
  const { profile, updateProfile, profileLoading } = useUserStore();
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const birthday =
    profile?.birthday_month && profile?.birthday_day
      ? { month: profile.birthday_month, day: profile.birthday_day }
      : { month: 1, day: 1 };

  const handleOpenPicker = () => {
    // Initialize temp date with current birthday
    setTempDate(birthdayToDate(birthday));
    setShowPicker(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleDateChange = async (_event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (!selectedDate) return;
    setTempDate(selectedDate);

    if (Platform.OS === "android") {
      // Auto-save on Android
      await saveBirthday(selectedDate);
    }
  };

  const saveBirthday = async (date: Date) => {
    try {
      await updateProfile({
        birthday_month: date.getMonth() + 1,
        birthday_day: date.getDate(),
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setShowPicker(false);
    } catch (error) {
      console.error("Error updating birthday:", error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleCancel = () => {
    setShowPicker(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleDone = () => {
    saveBirthday(tempDate);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SectionWrapper title="Birthday">
      <SettingRow
        icon="calendar"
        label="Your Birthday"
        value={formatBirthday(birthday)}
        onPress={handleOpenPicker}
        showChevron
      />

      {profileLoading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="small" color={Colors.secondary} />
          <Text style={styles.loadingText}>Updating...</Text>
        </View>
      )}

      {profile?.birthday_month && profile?.birthday_day && !profileLoading && (
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

      {/* iOS Modal Picker */}
      {Platform.OS === "ios" && showPicker && (
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
          onRequestClose={handleCancel}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.pickerContainer}>
              {/* Header */}
              <View style={styles.pickerHeader}>
                <TouchableOpacity onPress={handleCancel}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.pickerTitle}>Select Birthday</Text>
                <TouchableOpacity onPress={handleDone}>
                  <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
              </View>

              {/* Picker */}
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                maximumDate={new Date()}
                style={styles.picker}
              />
            </View>
          </View>
        </Modal>
      )}

      {/* Android Native Picker */}
      {Platform.OS === "android" && showPicker && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
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
  // iOS Picker Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 34, // Safe area for home indicator
  },
  pickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5E5",
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark,
  },
  cancelButton: {
    fontSize: 16,
    color: Colors.muted,
  },
  doneButton: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.secondary,
  },
  picker: {
    height: 200,
  },
});

export default BirthdaySection;
