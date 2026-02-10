const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatBirthday = (birthday?: {
  month: number;
  day: number;
}): string => {
  if (!birthday) return "Not set";
  return `${MONTHS[birthday.month - 1]} ${birthday.day}`;
};

export const getDaysUntilBirthday = (birthday?: {
  month: number;
  day: number;
}): number | null => {
  if (!birthday) return null;

  const today = new Date();
  const next = new Date(today.getFullYear(), birthday.month - 1, birthday.day);

  if (next < today) {
    next.setFullYear(next.getFullYear() + 1);
  }

  return Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

export const birthdayToDate = (birthday?: {
  month: number;
  day: number;
}): Date => {
  if (!birthday) return new Date(2000, 0, 1);
  return new Date(2000, birthday.month - 1, birthday.day);
};

export const dateToBirthday = (date: Date): { month: number; day: number } => ({
  month: date.getMonth() + 1,
  day: date.getDate(),
});
