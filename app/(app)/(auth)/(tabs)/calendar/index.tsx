import { restaurants } from "@/data/businesses";
import { useSavedFreebiesStore } from "@/hooks/use-savedfreebies";
import useUserStore from "@/hooks/use-userstore";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const CalendarPage = () => {
  const { savedFreebies } = useSavedFreebiesStore();
  const { user } = useUserStore();

  if (!user?.birthday) {
    return (
      <View style={styles.emptyState}>
        <Text>Set your birthday in Profile to see your timeline</Text>
      </View>
    );
  }

  const savedFreebiesList = restaurants.filter((f) =>
    savedFreebies.includes(f.id),
  );

  // Calculate days until birthday
  const today = new Date();
  const birthday = new Date(
    today.getFullYear(),
    user.birthday.month - 1,
    user.birthday.day,
  );

  if (birthday < today) {
    birthday.setFullYear(birthday.getFullYear() + 1);
  }

  const daysUntilBirthday = Math.ceil(
    (birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Group freebies by signup deadline
  const needSignupNow = savedFreebiesList.filter(
    (f) =>
      f.requirements.advanceSignupDays > 0 &&
      daysUntilBirthday <= f.requirements.advanceSignupDays + 7,
  );

  return (
    <ScrollView style={styles.container}>
      {/* Birthday Countdown */}
      <View style={styles.countdownCard}>
        <Ionicons name="calendar" size={32} color="#EC4899" />
        <Text style={styles.countdownDays}>{daysUntilBirthday}</Text>
        <Text style={styles.countdownText}>days until your birthday</Text>
      </View>

      {/* Action Items */}
      {needSignupNow.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏰ Sign Up Now</Text>
          {needSignupNow.map((freebie) => (
            <View key={freebie.id} style={styles.deadlineCard}>
              <View style={styles.deadlineIcon}>
                <Ionicons name="alert-circle" size={24} color="#F59E0B" />
              </View>
              <View style={styles.deadlineInfo}>
                <Text style={styles.deadlineBusiness}>{freebie.name}</Text>
                <Text style={styles.deadlineText}>
                  Sign up at least {freebie.requirements.advanceSignupDays} days
                  before birthday
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Birthday Day Freebies */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          🎂 On Your Birthday ({user.birthday.month}/{user.birthday.day})
        </Text>
        {savedFreebiesList
          .filter((f) => f.redemptionWindow === "day")
          .map((freebie) => (
            <View key={freebie.id} style={styles.freebieCard}>
              <Text style={styles.freebieName}>{freebie.name}</Text>
              <Text style={styles.freebieOffer}>{freebie.offer.title}</Text>
            </View>
          ))}
      </View>

      {/* Birthday Week Freebies */}
      {savedFreebiesList.filter((f) => f.redemptionWindow === "week").length >
        0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📆 During Your Birthday Week</Text>
          {savedFreebiesList
            .filter((f) => f.redemptionWindow === "week")
            .map((freebie) => (
              <View key={freebie.id} style={styles.freebieCard}>
                <Text style={styles.freebieName}>{freebie.name}</Text>
                <Text style={styles.freebieOffer}>{freebie.offer.title}</Text>
              </View>
            ))}
        </View>
      )}

      {/* Birthday Month Freebies */}
      {savedFreebiesList.filter((f) => f.redemptionWindow === "month").length >
        0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            🗓️ Anytime in Your Birth Month
          </Text>
          {savedFreebiesList
            .filter((f) => f.redemptionWindow === "month")
            .map((freebie) => (
              <View key={freebie.id} style={styles.freebieCard}>
                <Text style={styles.freebieName}>{freebie.name}</Text>
                <Text style={styles.freebieOffer}>{freebie.offer.title}</Text>
              </View>
            ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  countdownCard: {
    backgroundColor: "white",
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  countdownDays: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#EC4899",
    marginTop: 8,
  },
  countdownText: {
    fontSize: 16,
    color: "#6B7280",
  },
  section: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  deadlineCard: {
    flexDirection: "row",
    backgroundColor: "#FEF3C7",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  deadlineIcon: {
    marginRight: 12,
  },
  deadlineInfo: {
    flex: 1,
  },
  deadlineBusiness: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  deadlineText: {
    fontSize: 14,
    color: "#92400E",
  },
  freebieCard: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  freebieName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  freebieOffer: {
    fontSize: 14,
    color: "#6B7280",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
});

export default CalendarPage;
