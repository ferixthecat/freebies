import AboutSection from "@/components/profile/AboutSection";
import AccountSection from "@/components/profile/AccountSection";
import BirthdaySection from "@/components/profile/BirthdaySection";
import NotificationsSection from "@/components/profile/NotificationSection";
import SavedFreebiesSection from "@/components/profile/SavedFreebiesSection";
import { useSavedFreebiesStore } from "@/hooks/use-savedfreebies";
import useUserStore from "@/hooks/use-userstore";
import { ScrollView, StyleSheet, View } from "react-native";

const ProfilePage = () => {
  const { user, setUser } = useUserStore();
  const { savedCount, clearAll } = useSavedFreebiesStore();

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <BirthdaySection user={user} setUser={setUser} />
      <NotificationsSection user={user} setUser={setUser} />
      <SavedFreebiesSection savedCount={savedCount} clearAll={clearAll} />
      <AccountSection user={user} setUser={setUser} />
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
