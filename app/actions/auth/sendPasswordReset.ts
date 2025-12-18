"use server";

import { createClient } from "@/lib/supabase/server";

export async function sendPasswordReset(email: string, lang: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset`,
  });

  if (error) {
    return { success: false, error: error.code ?? "reset_failed" };
  }

  return { success: true };
}
