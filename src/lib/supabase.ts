import { createClient } from "@supabase/supabase-js";

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Güvenlik kontrolü
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase environment variables are missing. Check your .env file."
  );
}

// Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Supabase config kontrol fonksiyonu
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};

// Types
export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
};

export type Favorite = {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
};