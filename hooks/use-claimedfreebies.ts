import { supabase } from "@/lib/supabase";
import zustandStorage from "@/utils/zustandStorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ClaimedFreebiesStore {
  claimedFreebies: string[]; // Format: "freebieId_year"
  loading: boolean;
  synced: boolean;

  // Actions
  claimFreebie: (freebieId: string) => Promise<void>;
  unclaimFreebie: (freebieId: string) => Promise<void>;
  isClaimed: (freebieId: string) => boolean;
  syncWithSupabase: () => Promise<void>;
}

// Key includes year so claims reset each birthday year
const claimKey = (freebieId: string) =>
  `${freebieId}_${new Date().getFullYear()}`;

export const useClaimedFreebiesStore = create<ClaimedFreebiesStore>()(
  persist(
    (set, get) => ({
      claimedFreebies: [],
      loading: false,
      synced: false,

      claimFreebie: async (freebieId: string) => {
        const key = claimKey(freebieId);
        const year = new Date().getFullYear();

        // Optimistic update
        set((state) => ({
          claimedFreebies: [...state.claimedFreebies, key],
        }));

        // Sync to Supabase
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) return;

          const { error } = await supabase.from("claimed_freebies").insert({
            user_id: user.id,
            freebie_id: freebieId,
            year,
          });

          if (error && error.code !== "23505") {
            // Ignore duplicate
            throw error;
          }
        } catch (error) {
          console.error("Error claiming in Supabase:", error);
        }
      },

      unclaimFreebie: async (freebieId: string) => {
        const key = claimKey(freebieId);
        const year = new Date().getFullYear();

        // Optimistic update
        set((state) => ({
          claimedFreebies: state.claimedFreebies.filter((id) => id !== key),
        }));

        // Sync to Supabase
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) return;

          const { error } = await supabase
            .from("claimed_freebies")
            .delete()
            .eq("user_id", user.id)
            .eq("freebie_id", freebieId)
            .eq("year", year);

          if (error) throw error;
        } catch (error) {
          console.error("Error unclaiming in Supabase:", error);
        }
      },

      isClaimed: (freebieId: string) =>
        get().claimedFreebies.includes(claimKey(freebieId)),

      syncWithSupabase: async () => {
        set({ loading: true });

        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) {
            set({ loading: false });
            return;
          }

          const currentYear = new Date().getFullYear();

          // Fetch this year's claimed freebies
          const { data, error } = await supabase
            .from("claimed_freebies")
            .select("freebie_id, year")
            .eq("user_id", user.id)
            .eq("year", currentYear);

          if (error) throw error;

          const claimedKeys =
            data?.map((item) => `${item.freebie_id}_${item.year}`) || [];

          set({
            claimedFreebies: claimedKeys,
            loading: false,
            synced: true,
          });
        } catch (error) {
          console.error("Error syncing claimed freebies:", error);
          set({ loading: false });
        }
      },
    }),
    {
      name: "claimed-freebies",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        claimedFreebies: state.claimedFreebies,
      }),
    },
  ),
);
