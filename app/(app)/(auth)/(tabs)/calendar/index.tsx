import BirthdayCountdown from "@/components/calendar/BirthdayCountdown";
import FreebieGroup from "@/components/calendar/FreebieGroup";
import NoBirthdayState from "@/components/calendar/NoBirthdayState";
import NoSavedFreebiesState from "@/components/calendar/NoSavedFreebiesState";
import SignupActionBanner from "@/components/calendar/SignupActionBanner";
import { Colors, Fonts } from "@/constants/theme";
import { useCalendarData } from "@/hooks/useCalendarData";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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

  const showEmptyState = !hasBirthday || totalSaved === 0;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header always visible regardless of state */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendar</Text>
      </View>

      {/* No birthday set */}
      {!hasBirthday && (
        <View style={styles.emptyWrapper}>
          <NoBirthdayState />
        </View>
      )}

      {/* Birthday set but nothing saved */}
      {hasBirthday && totalSaved === 0 && (
        <View style={styles.emptyWrapper}>
          <NoSavedFreebiesState />
        </View>
      )}

      {/* Main content */}
      {!showEmptyState && (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <BirthdayCountdown
            daysUntil={daysUntilBirthday!}
            birthday={birthday!}
          />
          <SignupActionBanner signupNow={signupNow} signupSoon={signupSoon} />

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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: Colors.background,
  },
  headerTitle: {
    fontFamily: Fonts.brandBlack,
    fontSize: 32,
    color: "#000",
  },
  emptyWrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
});

export default CalendarPage;
