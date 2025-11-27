import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = () => {
  const config = useRuntimeConfig();

  return createClient(
    config.public.SUPABASE_URL!,
    config.public.SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};
