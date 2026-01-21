export interface NotificationSchedule {
  freebieId: string;
  userId: string;
  birthday: {
    month: number;
    day: number;
  };
  notifications: {
    monthStart: boolean;
    weekBefore: boolean;
    dayOf: boolean;
  };
}

export const notificationService = {
  /**
   * Schedule birthday notifications for saved freebies
   */
  scheduleNotifications: async (
    schedule: NotificationSchedule,
  ): Promise<{ success: boolean }> => {
    // TODO: Implement with expo-notifications
    console.log("Scheduling notifications:", schedule);

    return {
      success: true,
    };
  },

  /**
   * Cancel all notifications for a freebie
   */
  cancelNotifications: async (freebieId: string): Promise<void> => {
    // TODO: Implement notification cancellation
    console.log("Canceling notifications for:", freebieId);
  },
};
