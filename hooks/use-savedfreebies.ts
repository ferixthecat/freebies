import zustandStorage from "@/utils/zustandStorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SavedFreebiesStore {
  savedFreebies: string[];

  // Actions
  saveFreebie: (freebieId: string) => void;
  unsaveFreebie: (freebieId: string) => void;
  toggleFreebie: (freebieId: string) => void;
  isSaved: (freebieId: string) => boolean;
  clearAll: () => void;

  // Computed
  savedCount: number;
}

export const useSavedFreebiesStore = create<SavedFreebiesStore>()(
  persist(
    (set, get) => ({
      savedFreebies: [],
      savedCount: 0,

      saveFreebie: (freebieId: string) =>
        set((state) => {
          if (state.savedFreebies.includes(freebieId)) {
            return state; // Already saved
          }
          const newSaved = [...state.savedFreebies, freebieId];
          return {
            savedFreebies: newSaved,
            savedCount: newSaved.length,
          };
        }),

      unsaveFreebie: (freebieId: string) =>
        set((state) => {
          const newSaved = state.savedFreebies.filter((id) => id !== freebieId);
          return {
            savedFreebies: newSaved,
            savedCount: newSaved.length,
          };
        }),

      toggleFreebie: (freebieId: string) =>
        set((state) => {
          const isSaved = state.savedFreebies.includes(freebieId);
          const newSaved = isSaved
            ? state.savedFreebies.filter((id) => id !== freebieId)
            : [...state.savedFreebies, freebieId];

          return {
            savedFreebies: newSaved,
            savedCount: newSaved.length,
          };
        }),

      isSaved: (freebieId: string) => {
        return get().savedFreebies.includes(freebieId);
      },

      clearAll: () => set({ savedFreebies: [], savedCount: 0 }),
    }),
    {
      name: "saved-freebies",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
