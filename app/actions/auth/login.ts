"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/* ----------------------------------
 * LOGIN
 * ---------------------------------- */
export async function login(formData: FormData, lang: string) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/${lang}/login?error=invalid_credentials`);
  }

  redirect(`/${lang}/dashboard`);
}
