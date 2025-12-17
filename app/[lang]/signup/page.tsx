import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/server/dictionaries";
import SignupPageClient from "./page.client";

/**
 * Server-side signup page
 */
export default async function SignupPage({
  params,
}: PageProps<"/[lang]/signup">) {
  const { lang } = await params;

  // Fetch translations for the signup page
  const dict = await getDictionary(lang as Locale);
  const signupDict = dict.auth.signup;
  const errorsDict = dict.auth.errors;

  return (
    <SignupPageClient
      lang={lang}
      errorsDict={errorsDict}
      signupDict={signupDict}
    />
  );
}
