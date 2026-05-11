import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ftzwloyrezghdavmdvns.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0endsb3lyZXpnaGRhdm1kdm5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MDQ4ODQsImV4cCI6MjA5Mzk4MDg4NH0.9YIDLDhY605HVsE9QM5id-n77eqDQ2i6JbCRVtPhPhE";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);