import AboutSection from "@/components/profile/AboutSection";
import AccountSection from "@/components/profile/AccountSection";
import BirthdaySection from "@/components/profile/BirthdaySection";
import NotificationsSection from "@/components/profile/NotificationSection";
import SavedFreebiesSection from "@/components/profile/SavedFreebiesSection";
import { useSavedFreebiesStore } from "@/hooks/use-savedfreebies";
import { ScrollView, StyleSheet, View } from "react-native";

const ProfilePage = () => {
  const { savedCount, clearAll } = useSavedFreebiesStore();

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <BirthdaySection />
      <NotificationsSection />
      <SavedFreebiesSection savedCount={savedCount} clearAll={clearAll} />
      <AccountSection />
      <AboutSection />
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
});

export default ProfilePage;
