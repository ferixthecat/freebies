import { useClaimedFreebiesStore } from "@/hooks/use-claimedfreebies";
import { useSavedFreebiesStore } from "@/hooks/use-savedfreebies";
import useUserStore from "@/hooks/use-userstore";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { useCallback, useEffect } from "react";

/**
 * AuthProvider
 *
 * Wrap your app with this to:
 * 1. Listen for auth state changes
 * 2. Sync user data when logged in
 * 3. Clear data when logged out
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useUserStore((state) => state.setUser);
  const syncSavedFreebies = useSavedFreebiesStore(
    (state) => state.syncWithSupabase,
  );
  const syncClaimedFreebies = useClaimedFreebiesStore(
    (state) => state.syncWithSupabase,
  );

  const handleSessionChange = useCallback(
    async (session: Session | null) => {
      if (session?.user) {
        // User logged in
        setUser(session.user);

        // Sync all data from Supabase
        await Promise.all([syncSavedFreebies(), syncClaimedFreebies()]);
      } else {
        // User logged out
        setUser(null);
      }
    },
    [setUser, syncSavedFreebies, syncClaimedFreebies],
  );

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSessionChange(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSessionChange(session);
    });

    return () => subscription.unsubscribe();
  }, [handleSessionChange]);

  return <>{children}</>;
};

// Hook to get current auth session
export const useAuth = () => {
  const user = useUserStore((state) => state.user);
  const profile = useUserStore((state) => state.profile);
  const loading = useUserStore((state) => state.loading);

  return {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
  };
};
