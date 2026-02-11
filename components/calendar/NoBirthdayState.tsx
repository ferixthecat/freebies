import { Colors, Fonts } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NoBirthdayState = () => (
  <View style={styles.container}>
    <View style={styles.iconContainer}>
      <Ionicons name="calendar-outline" size={64} color={Colors.light} />
    </View>
    <Text style={styles.title}>Set Your Birthday</Text>
    <Text style={styles.subtitle}>
      Add your birthday to see your personalized freebie timeline and get
      reminded when to sign up and claim
    </Text>
    <Link href="/(app)/(auth)/(tabs)/profile" asChild>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="person-outline" size={18} color="#fff" />
        <Text style={styles.buttonText}>Go to Profile</Text>
      </TouchableOpacity>
    </Link>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 80,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.brandBold,
    color: Colors.dark,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: Colors.muted,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default NoBirthdayState;
