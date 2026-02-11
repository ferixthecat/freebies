import type { Restaurant } from "@/data/businesses";
import { restaurants } from "@/data/businesses";
import { useSavedFreebiesStore } from "@/hooks/use-savedfreebies";
import useUserStore from "@/hooks/use-userstore";
import { getDaysUntilBirthday } from "@/utils/dateUtils";
import { useMemo } from "react";

export interface FreebieWithDeadline extends Restaurant {
  signupDeadlineDays: number; // days from today to sign up by
  isUrgent: boolean; // deadline within 14 days
}

export interface CalendarData {
  daysUntilBirthday: number | null;
  birthday: { month: number; day: number } | null;
  hasBirthday: boolean;

  // Grouped saved freebies
  dayFreebies: Restaurant[];
  weekFreebies: Restaurant[];
  monthFreebies: Restaurant[];

  // Action items
  signupNow: FreebieWithDeadline[]; // need to sign up ASAP
  signupSoon: FreebieWithDeadline[]; // need to sign up within 30 days

  // Today's claimable (if birthday is today/this week/this month)
  claimableToday: Restaurant[];
}

export const useCalendarData = (): CalendarData => {
  const { user } = useUserStore();
  const { savedFreebies } = useSavedFreebiesStore();

  const birthday = user?.birthday ?? null;
  const daysUntilBirthday = getDaysUntilBirthday(birthday);

  const savedList = useMemo(
    () => restaurants.filter((r) => savedFreebies.includes(r.id)),
    [savedFreebies],
  );

  const dayFreebies = useMemo(
    () => savedList.filter((r) => r.redemptionWindow === "day"),
    [savedList],
  );

  const weekFreebies = useMemo(
    () => savedList.filter((r) => r.redemptionWindow === "week"),
    [savedList],
  );

  const monthFreebies = useMemo(
    () => savedList.filter((r) => r.redemptionWindow === "month"),
    [savedList],
  );

  // Freebies that require advance signup
  const freebiesWithDeadlines: FreebieWithDeadline[] = useMemo(() => {
    if (daysUntilBirthday === null) return [];
    return savedList
      .filter((r) => r.requirements.advanceSignupDays > 0)
      .map((r) => {
        const signupDeadlineDays =
          daysUntilBirthday - r.requirements.advanceSignupDays;
        return {
          ...r,
          signupDeadlineDays,
          isUrgent: signupDeadlineDays <= 7,
        };
      })
      .sort((a, b) => a.signupDeadlineDays - b.signupDeadlineDays);
  }, [savedList, daysUntilBirthday]);

  const signupNow = freebiesWithDeadlines.filter(
    (r) => r.signupDeadlineDays <= 0,
  );

  const signupSoon = freebiesWithDeadlines.filter(
    (r) => r.signupDeadlineDays > 0 && r.signupDeadlineDays <= 30,
  );

  // What can be claimed right now based on how close birthday is
  const claimableToday = useMemo(() => {
    if (daysUntilBirthday === null) return [];
    if (daysUntilBirthday === 0) return savedList; // birthday today!
    if (daysUntilBirthday <= 7) return [...weekFreebies, ...monthFreebies];
    if (daysUntilBirthday <= 31) return monthFreebies;
    return [];
  }, [daysUntilBirthday, savedList, weekFreebies, monthFreebies]);

  return {
    daysUntilBirthday,
    birthday,
    hasBirthday: !!birthday,
    dayFreebies,
    weekFreebies,
    monthFreebies,
    signupNow,
    signupSoon,
    claimableToday,
  };
};
