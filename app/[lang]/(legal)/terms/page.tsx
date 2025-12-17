// app/[lang]/(legal)/terms/page.tsx
import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/server/dictionaries";
import TermsPageClient from "./page.client";

export default async function TermsPage({
  params,
}: PageProps<"/[lang]/terms">) {
  const { lang } = await params;

  // Fetch translations
  const dict = await getDictionary(lang as Locale);
  const termsDict = dict.legal.terms;

  return <TermsPageClient lang={lang} dict={termsDict} />;
}
