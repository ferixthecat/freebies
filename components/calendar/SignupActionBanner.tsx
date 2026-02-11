import { Colors, Fonts } from "@/constants/theme";
import { FreebieWithDeadline } from "@/hooks/useCalendarData";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SignupActionBannerProps {
  signupNow: FreebieWithDeadline[];
  signupSoon: FreebieWithDeadline[];
}

const SignupActionBanner = ({
  signupNow,
  signupSoon,
}: SignupActionBannerProps) => {
  if (signupNow.length === 0 && signupSoon.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="alert-circle" size={18} color="#D97706" />
        <Text style={styles.headerText}>Action Required</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Overdue signups */}
        {signupNow.map((freebie) => (
          <Link
            key={freebie.id}
            href={`/(modal)/(restaurant)/${freebie.id}`}
            asChild
          >
            <TouchableOpacity style={[styles.card, styles.cardUrgent]}>
              <Ionicons name="warning" size={16} color="#EF4444" />
              <Text style={styles.cardName} numberOfLines={1}>
                {freebie.name}
              </Text>
              <Text style={styles.cardDeadlineUrgent}>
                Sign up NOW — overdue!
              </Text>
            </TouchableOpacity>
          </Link>
        ))}

        {/* Upcoming signups */}
        {signupSoon.map((freebie) => (
          <Link
            key={freebie.id}
            href={`/(modal)/(restaurant)/${freebie.id}`}
            asChild
          >
            <TouchableOpacity
              style={[styles.card, freebie.isUrgent && styles.cardWarning]}
            >
              <Ionicons
                name="time"
                size={16}
                color={freebie.isUrgent ? "#F59E0B" : Colors.secondary}
              />
              <Text style={styles.cardName} numberOfLines={1}>
                {freebie.name}
              </Text>
              <Text
                style={[
                  styles.cardDeadline,
                  freebie.isUrgent && styles.cardDeadlineWarning,
                ]}
              >
                Sign up in {freebie.signupDeadlineDays}d
              </Text>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "#FFFBEB",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 14,
    fontFamily: Fonts.brandBold,
    color: "#D97706",
  },
  scroll: {
    gap: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    minWidth: 140,
    maxWidth: 160,
    borderWidth: 1,
    borderColor: Colors.light,
    gap: 4,
  },
  cardUrgent: {
    borderColor: "#FCA5A5",
    backgroundColor: "#FEF2F2",
  },
  cardWarning: {
    borderColor: "#FCD34D",
    backgroundColor: "#FFFBEB",
  },
  cardName: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.dark,
  },
  cardDeadline: {
    fontSize: 11,
    color: Colors.secondary,
    fontWeight: "500",
  },
  cardDeadlineUrgent: {
    fontSize: 11,
    color: "#EF4444",
    fontWeight: "600",
  },
  cardDeadlineWarning: {
    color: "#F59E0B",
  },
});

export default SignupActionBanner;
