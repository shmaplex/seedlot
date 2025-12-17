// lib/supabase/proxy.ts

// WARNING: Be careful when protecting pages. The server gets the user session from the cookies, which anyone can spoof.
// Always use supabase.auth.getUser() to protect pages and user data.
// Never trust supabase.auth.getSession() inside server code such as proxy. It isn't guaranteed to revalidate the Auth token.
// It's safe to trust getUser() because it sends a request to the Supabase Auth server every time to revalidate the Auth token.

import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options: object }[],
        ) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // refreshing the auth token
  await supabase.auth.getUser();

  return supabaseResponse;
}
