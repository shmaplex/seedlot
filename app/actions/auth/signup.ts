"use server";

import { redirect } from "next/navigation";
import { PUBLIC_SIGNUP_ROLES } from "@/lib/auth/allowed-roles";
import { prisma } from "@/lib/server/prisma";
import { createClient } from "@/lib/supabase/server";
import { SignupSchema } from "@/schemas/auth";
import type { UserRole } from "@/schemas/enums";

type SignupState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

/* ----------------------------------
 * SIGNUP
 * ---------------------------------- */
export async function signup(
  formData: FormData,
  lang: string,
): Promise<SignupState> {
  const supabase = await createClient();

  const parsed = SignupSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password, fullName, role } = parsed.data;

  // 🛑 Role allowlist
  if (!PUBLIC_SIGNUP_ROLES.includes(role as UserRole)) {
    return { error: "invalid_role" };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      data: {
        // Identity
        full_name: fullName ?? null,
        role,
        initial_role: role,

        // Localization
        preferred_lang: parsed.data.preferredLang ?? "en",
        timezone: parsed.data.timezone ?? null,

        // Attribution / audit
        signup_source: "web",
        email_domain: email.split("@")[1],

        // Legal / compliance
        accepted_terms_at: new Date().toISOString(),
      },
    },
  });

  if (error || !data.user) {
    return { error: "signup_failed" };
  }

  try {
    await prisma.profile.create({
      data: {
        id: data.user.id,
        email,
        fullName,
        role,
      },
    });
  } catch (e) {
    console.error("Profile creation failed:", e);
    return { error: "profile_creation_failed" };
  }

  redirect(
    `/${lang}/login?notice=signup_success&email=${encodeURIComponent(email)}`,
  );
}
