import { supabase } from "@/lib/supabase";
import zustandStorage from "@/utils/zustandStorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SavedFreebiesStore {
  savedFreebies: string[];
  savedCount: number;
  loading: boolean;
  synced: boolean; // Track if we've synced with server

  // Actions
  saveFreebie: (freebieId: string) => Promise<void>;
  unsaveFreebie: (freebieId: string) => Promise<void>;
  toggleFreebie: (freebieId: string) => Promise<void>;
  isSaved: (freebieId: string) => boolean;
  clearAll: () => Promise<void>;
  syncWithSupabase: () => Promise<void>;
}

export const useSavedFreebiesStore = create<SavedFreebiesStore>()(
  persist(
    (set, get) => ({
      savedFreebies: [],
      savedCount: 0,
      loading: false,
      synced: false,

      saveFreebie: async (freebieId: string) => {
        // Optimistic update
        const state = get();
        if (state.savedFreebies.includes(freebieId)) return;

        const newSaved = [...state.savedFreebies, freebieId];
        set({
          savedFreebies: newSaved,
          savedCount: newSaved.length,
        });

        // Sync to Supabase
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) return; // Not logged in, keep local only

          const { error } = await supabase.from("saved_freebies").insert({
            user_id: user.id,
            freebie_id: freebieId,
          });

          if (error && error.code !== "23505") {
            // Ignore duplicate key error
            throw error;
          }
        } catch (error) {
          console.error("Error saving to Supabase:", error);
          // Keep optimistic update even if sync fails
        }
      },

      unsaveFreebie: async (freebieId: string) => {
        // Optimistic update
        const newSaved = get().savedFreebies.filter((id) => id !== freebieId);
        set({
          savedFreebies: newSaved,
          savedCount: newSaved.length,
        });

        // Sync to Supabase
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) return;

          const { error } = await supabase
            .from("saved_freebies")
            .delete()
            .eq("user_id", user.id)
            .eq("freebie_id", freebieId);

          if (error) throw error;
        } catch (error) {
          console.error("Error deleting from Supabase:", error);
        }
      },

      toggleFreebie: async (freebieId: string) => {
        const isSaved = get().savedFreebies.includes(freebieId);
        if (isSaved) {
          await get().unsaveFreebie(freebieId);
        } else {
          await get().saveFreebie(freebieId);
        }
      },

      isSaved: (freebieId: string) => {
        return get().savedFreebies.includes(freebieId);
      },

      clearAll: async () => {
        // Clear local
        set({ savedFreebies: [], savedCount: 0 });

        // Clear Supabase
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) return;

          const { error } = await supabase
            .from("saved_freebies")
            .delete()
            .eq("user_id", user.id);

          if (error) throw error;
        } catch (error) {
          console.error("Error clearing Supabase:", error);
        }
      },

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

          // Fetch from Supabase
          const { data, error } = await supabase
            .from("saved_freebies")
            .select("freebie_id")
            .eq("user_id", user.id);

          if (error) throw error;

          const savedIds = data?.map((item) => item.freebie_id) || [];

          set({
            savedFreebies: savedIds,
            savedCount: savedIds.length,
            loading: false,
            synced: true,
          });
        } catch (error) {
          console.error("Error syncing with Supabase:", error);
          set({ loading: false });
        }
      },
    }),
    {
      name: "saved-freebies",
      storage: createJSONStorage(() => zustandStorage),
      // Don't persist loading/synced states
      partialize: (state) => ({
        savedFreebies: state.savedFreebies,
        savedCount: state.savedCount,
      }),
    },
  ),
);
