import BirthdayCountdown from "@/components/calendar/BirthdayCountdown";
import FreebieGroup from "@/components/calendar/FreebieGroup";
import NoBirthdayState from "@/components/calendar/NoBirthdayState";
import NoSavedFreebiesState from "@/components/calendar/NoSavedFreebiesState";
import SignupActionBanner from "@/components/calendar/SignupActionBanner";
import { Colors } from "@/constants/theme";
import { useCalendarData } from "@/hooks/useCalendarData";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CalendarPage = () => {
  const insets = useSafeAreaInsets();
  const {
    daysUntilBirthday,
    birthday,
    hasBirthday,
    dayFreebies,
    weekFreebies,
    monthFreebies,
    signupNow,
    signupSoon,
  } = useCalendarData();

  const totalSaved =
    dayFreebies.length + weekFreebies.length + monthFreebies.length;

  if (!hasBirthday) return <NoBirthdayState />;
  if (totalSaved === 0) return <NoSavedFreebiesState />;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 60 }, // account for large header
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Birthday Countdown */}
      <BirthdayCountdown daysUntil={daysUntilBirthday!} birthday={birthday!} />

      {/* Advance Signup Alerts */}
      <SignupActionBanner signupNow={signupNow} signupSoon={signupSoon} />

      {/* Freebie Groups by Redemption Window */}
      <FreebieGroup
        title="On Your Birthday"
        icon="calendar"
        freebies={dayFreebies}
        accentColor="#EF4444"
        startExpanded
      />
      <FreebieGroup
        title="Birthday Week"
        icon="calendar-outline"
        freebies={weekFreebies}
        accentColor={Colors.secondary}
        startExpanded
      />
      <FreebieGroup
        title="Entire Birth Month"
        icon="calendar-clear-outline"
        freebies={monthFreebies}
        accentColor="#10B981"
        startExpanded={false}
      />

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  content: {
    paddingBottom: 20,
  },
});

export default CalendarPage;
