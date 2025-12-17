// app/lib/supabase/service.ts
import { createServerClient } from "@supabase/ssr";

/**
 * Creates a Supabase client using the Service Role key.
 * This client bypasses RLS and should only be used on the server.
 */
export async function createServiceClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        // stub methods since Service Role bypasses RLS
        getAll: () => [],
        setAll: (_: any[]) => {},
      },
    }
  );
}
