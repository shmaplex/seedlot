import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import SignupPageClient from "./page.client";

/**
 * Server-side signup page
 */
export default async function SignupPage({
  params,
}: PageProps<"/[lang]/forgot-password">) {
  const { lang } = await params;

  // Fetch translations for the signup page
  const dict = await getDictionary(lang as Locale);
  const fpDict = dict.auth.forgotPassword;

  return <SignupPageClient lang={lang} dict={fpDict} />;
}
