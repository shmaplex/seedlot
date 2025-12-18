import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/server/dictionaries";
import WaitlistPageClient from "./page.client";

export default async function WaitlistPage({
  params,
}: PageProps<"/[lang]/waitlist">) {
  const { lang } = await params;

  // Fetch translations or other server-side data if needed
  const dict = await getDictionary(lang as Locale);
  const waitlistDict = dict.waitlist; // Assume you have a waitlist namespace in your dictionaries

  return <WaitlistPageClient lang={lang} dict={waitlistDict} />;
}
