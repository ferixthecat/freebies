import AboutSection from "@/components/profile/AboutSection";
import AccountSection from "@/components/profile/AccountSection";
import BirthdaySection from "@/components/profile/BirthdaySection";
import NotificationsSection from "@/components/profile/NotificationSection";
import SavedFreebiesSection from "@/components/profile/SavedFreebiesSection";
import { Colors, Fonts } from "@/constants/theme";
import { useSavedFreebiesStore } from "@/hooks/use-savedfreebies";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfilePage = () => {
  const insets = useSafeAreaInsets();
  const { savedCount, clearAll } = useSavedFreebiesStore();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Custom header matching Explore/Saved/Calendar style */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <BirthdaySection />
        <NotificationsSection />
        <SavedFreebiesSection savedCount={savedCount} clearAll={clearAll} />
        <AccountSection />
        <AboutSection />
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4, // tighter — sections have their own top padding
    backgroundColor: Colors.background,
  },
  headerTitle: {
    fontFamily: Fonts.brandBlack,
    fontSize: 32,
    color: "#000",
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 0,
  },
});

export default ProfilePage;
