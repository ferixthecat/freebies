import zustandStorage from "@/utils/zustandStorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ClaimedFreebiesStore {
  claimedFreebies: string[]; // freebieId_year (e.g. "rest_001_2026")
  claimFreebie: (freebieId: string) => void;
  unclaimFreebie: (freebieId: string) => void;
  isClaimed: (freebieId: string) => boolean;
}

// Key includes year so claims reset each birthday year
const claimKey = (freebieId: string) =>
  `${freebieId}_${new Date().getFullYear()}`;

export const useClaimedFreebiesStore = create<ClaimedFreebiesStore>()(
  persist(
    (set, get) => ({
      claimedFreebies: [],

      claimFreebie: (freebieId: string) =>
        set((state) => ({
          claimedFreebies: [...state.claimedFreebies, claimKey(freebieId)],
        })),

      unclaimFreebie: (freebieId: string) =>
        set((state) => ({
          claimedFreebies: state.claimedFreebies.filter(
            (id) => id !== claimKey(freebieId),
          ),
        })),

      isClaimed: (freebieId: string) =>
        get().claimedFreebies.includes(claimKey(freebieId)),
    }),
    {
      name: "claimed-freebies",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
