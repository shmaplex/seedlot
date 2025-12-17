// app/[lang]/(legal)/privacy/page.tsx
import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/server/dictionaries";
import PrivacyPageClient from "./page.client";

export default async function PrivacyPage({
  params,
}: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;

  // Fetch translations
  const dict = await getDictionary(lang as Locale);
  const privacyDict = dict.legal.privacy;

  return <PrivacyPageClient lang={lang} dict={privacyDict} />;
}
