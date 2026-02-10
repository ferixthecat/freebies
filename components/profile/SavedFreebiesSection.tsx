import { Colors, Fonts } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SectionWrapper from "./SectionWrapper";

interface SavedFreebiesSectionProps {
  savedCount: number;
  clearAll: () => void;
}

const SavedFreebiesSection = ({
  savedCount,
  clearAll,
}: SavedFreebiesSectionProps) => {
  const handleClear = () => {
    Alert.alert(
      "Clear All Saved Freebies?",
      `This will remove all ${savedCount} saved freebies from your list.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => {
            clearAll();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        },
      ],
    );
  };

  return (
    <SectionWrapper title="Saved Freebies">
      <View style={styles.statCard}>
        <View style={styles.statIcon}>
          <MaterialIcons name="bookmark" size={24} color={Colors.secondary} />
        </View>
        <View>
          <Text style={styles.statValue}>{savedCount}</Text>
          <Text style={styles.statLabel}>Freebies Saved</Text>
        </View>
      </View>

      {savedCount > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
          <Text style={styles.clearButtonText}>Clear All Saved Freebies</Text>
        </TouchableOpacity>
      )}
    </SectionWrapper>
  );
};

const styles = StyleSheet.create({
  statCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontFamily: Fonts.brandBold,
    color: Colors.dark,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.muted,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 8,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    backgroundColor: "#FEF2F2",
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#EF4444",
  },
});

export default SavedFreebiesSection;
