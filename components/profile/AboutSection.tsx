import { Colors } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";
import SectionWrapper from "./SectionWrapper";
import SettingRow from "./SettingRow";

const AboutSection = () => (
  <SectionWrapper title="About">
    <SettingRow
      icon="help-circle"
      label="Help & Support"
      onPress={() => {}}
      showChevron
    />
    <SettingRow
      icon="document-text"
      label="Terms of Service"
      onPress={() => {}}
      showChevron
    />
    <SettingRow
      icon="lock-closed"
      label="Privacy Policy"
      onPress={() => {}}
      showChevron
    />
    <View style={styles.version}>
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </View>
  </SectionWrapper>
);

const styles = StyleSheet.create({
  version: {
    paddingVertical: 16,
    alignItems: "center",
  },
  versionText: {
    fontSize: 13,
    color: Colors.muted,
  },
});

export default AboutSection;
