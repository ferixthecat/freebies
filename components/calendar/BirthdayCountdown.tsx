import { Colors, Fonts } from "@/constants/theme";
import { formatBirthday } from "@/utils/dateUtils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

interface BirthdayCountdownProps {
  daysUntil: number;
  birthday: { month: number; day: number };
}

const BirthdayCountdown = ({ daysUntil, birthday }: BirthdayCountdownProps) => {
  const isToday = daysUntil === 0;
  const isThisWeek = daysUntil <= 7 && daysUntil > 0;

  const getMessage = () => {
    if (isToday) return "🎉 It's your birthday today!";
    if (isThisWeek) return "Your birthday is this week!";
    if (daysUntil <= 30) return "Your birthday is coming up!";
    return `Your birthday is on ${formatBirthday(birthday)}`;
  };

  return (
    <View style={[styles.card, isToday && styles.cardToday]}>
      <View style={styles.left}>
        <View style={[styles.iconRing, isToday && styles.iconRingToday]}>
          <Ionicons
            name="calendar"
            size={28}
            color={isToday ? "#fff" : Colors.secondary}
          />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.message}>{getMessage()}</Text>
        <Text style={styles.date}>{formatBirthday(birthday)}</Text>
      </View>

      <View style={styles.right}>
        {isToday ? (
          <Text style={styles.todayText}>🎂</Text>
        ) : (
          <>
            <Text style={[styles.days, isThisWeek && styles.daysUrgent]}>
              {daysUntil}
            </Text>
            <Text style={styles.daysLabel}>days</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    gap: 12,
    borderWidth: 2,
    borderColor: Colors.primaryLight,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
  },
  cardToday: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  left: {
    justifyContent: "center",
  },
  iconRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  iconRingToday: {
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  content: {
    flex: 1,
  },
  message: {
    fontSize: 15,
    fontFamily: Fonts.brandBold,
    color: Colors.dark,
    marginBottom: 2,
  },
  date: {
    fontSize: 13,
    color: Colors.muted,
  },
  right: {
    alignItems: "center",
    minWidth: 44,
  },
  days: {
    fontSize: 32,
    fontFamily: Fonts.brandBlack,
    color: Colors.secondary,
    lineHeight: 36,
  },
  daysUrgent: {
    color: "#F59E0B",
  },
  daysLabel: {
    fontSize: 12,
    color: Colors.muted,
    fontWeight: "500",
  },
  todayText: {
    fontSize: 36,
  },
});

export default BirthdayCountdown;
