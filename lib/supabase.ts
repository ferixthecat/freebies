import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// TypeScript types for database tables
export type Profile = {
  id: string;
  email: string | null;
  birthday_month: number | null;
  birthday_day: number | null;
  location: string | null;
  created_at: string;
  updated_at: string;
};

export type NotificationSettings = {
  id: string;
  user_id: string;
  enabled: boolean;
  day_before: boolean;
  week_before: boolean;
  advance_signup: boolean;
  created_at: string;
  updated_at: string;
};

export type SavedFreebie = {
  id: string;
  user_id: string;
  freebie_id: string;
  saved_at: string;
};

export type ClaimedFreebie = {
  id: string;
  user_id: string;
  freebie_id: string;
  year: number;
  claimed_at: string;
};

// Database type
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>;
      };
      notification_settings: {
        Row: NotificationSettings;
        Insert: Omit<NotificationSettings, "id" | "created_at" | "updated_at">;
        Update: Partial<
          Omit<NotificationSettings, "id" | "created_at" | "updated_at">
        >;
      };
      saved_freebies: {
        Row: SavedFreebie;
        Insert: Omit<SavedFreebie, "id" | "saved_at">;
        Update: never;
      };
      claimed_freebies: {
        Row: ClaimedFreebie;
        Insert: Omit<ClaimedFreebie, "id" | "claimed_at">;
        Update: never;
      };
    };
  };
};
