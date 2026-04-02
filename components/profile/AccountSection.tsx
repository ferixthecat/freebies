import useUserStore from "@/hooks/use-userstore";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import SectionWrapper from "./SectionWrapper";
import SettingRow from "./SettingRow";

const AccountSection = () => {
  const { user, profile, signOut } = useUserStore();
  const router = useRouter();

  const handleLocationPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/(app)/(auth)/(modal)/location");
  };

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          } catch (error) {
            console.error("Error signing out:", error);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          }
        },
      },
    ]);
  };

  return (
    <SectionWrapper title="Account">
      <SettingRow
        icon="person"
        label="Email"
        value={profile?.email || user?.email || "Not signed in"}
      />
      <SettingRow
        icon="location"
        label="Location"
        value={profile?.location || "Tap to set location"}
        onPress={handleLocationPress}
        showChevron
      />
      <SettingRow
        icon="shield-checkmark"
        label="Privacy & Security"
        onPress={() => {}}
        showChevron
      />
      <SettingRow
        icon="log-out-outline"
        label="Sign Out"
        onPress={handleSignOut}
        danger
      />
    </SectionWrapper>
  );
};

export default AccountSection;
