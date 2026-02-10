import * as Haptics from "expo-haptics";
import { Alert } from "react-native";
import SectionWrapper from "./SectionWrapper";
import SettingRow from "./SettingRow";

interface AccountSectionProps {
  user: any;
  setUser: (user: any) => void;
}

const AccountSection = ({ user, setUser }: AccountSectionProps) => {
  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          setUser(null);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        },
      },
    ]);
  };

  return (
    <SectionWrapper title="Account">
      <SettingRow
        icon="person"
        label="Email"
        value={user?.email || "Not signed in"}
      />
      <SettingRow
        icon="location"
        label="Location"
        value={user?.location || "Toronto, ON"}
        onPress={() => {}}
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
