import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/server/dictionaries";
import DocumentationPageClient from "./page.client";

/**
 * Server-side docs page
 */
export default async function DocumentationPage({
  params,
}: PageProps<"/[lang]/docs">) {
  const { lang } = await params;

  // Fetch translations for the docs page
  const dict = await getDictionary(lang as Locale);
  const docsDict = dict.docs;

  return <DocumentationPageClient lang={lang} dict={docsDict} />;
}
