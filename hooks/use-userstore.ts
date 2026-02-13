import type { Profile } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";
import zustandStorage from "@/utils/zustandStorage";
import type { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  // Auth user
  user: User | null;

  // Profile data
  profile: Profile | null;

  // Loading states
  loading: boolean;
  profileLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      loading: true,
      profileLoading: false,

      setUser: (user: User | null) => {
        set({ user });
        if (user) {
          // Fetch profile when user is set
          get().refreshProfile();
        } else {
          set({ profile: null });
        }
      },

      setProfile: (profile: Profile | null) => {
        set({ profile });
      },

      updateProfile: async (updates: Partial<Profile>) => {
        const { user } = get();
        if (!user) throw new Error("No user logged in");

        set({ profileLoading: true });

        try {
          const { data, error } = await supabase
            .from("profiles")
            .update(updates)
            .eq("id", user.id)
            .select()
            .single();

          if (error) throw error;

          set({ profile: data, profileLoading: false });
        } catch (error) {
          console.error("Error updating profile:", error);
          set({ profileLoading: false });
          throw error;
        }
      },

      refreshProfile: async () => {
        const { user } = get();
        if (!user) return;

        set({ profileLoading: true });

        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (error) throw error;

          set({ profile: data, profileLoading: false });
        } catch (error) {
          console.error("Error fetching profile:", error);
          set({ profileLoading: false });
        }
      },

      signOut: async () => {
        try {
          await supabase.auth.signOut();
          set({ user: null, profile: null });
        } catch (error) {
          console.error("Error signing out:", error);
          throw error;
        }
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => zustandStorage),
      // Only persist user and profile, not loading states
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
      }),
    },
  ),
);

export default useUserStore;

// Helper hook for birthday data
export const useBirthday = () => {
  const profile = useUserStore((state) => state.profile);

  if (!profile?.birthday_month || !profile?.birthday_day) {
    return null;
  }

  return {
    month: profile.birthday_month,
    day: profile.birthday_day,
  };
};
