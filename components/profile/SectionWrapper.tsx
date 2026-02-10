import { Colors } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
}

const SectionWrapper = ({ title, children }: SectionWrapperProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#fff",
    marginTop: 24,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});

export default SectionWrapper;
