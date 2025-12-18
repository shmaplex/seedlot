import { notFound } from "next/navigation";
import { SeedLotDashboard } from "@/components/seedlots"; // use new exported component
import type { Locale } from "@/i18n-config";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getDictionary } from "@/lib/server/dictionaries";

interface SeedLotPageProps {
  params: { lang: string };
}

/**
 * SeedLot Dashboard / Overview Page
 */
export default async function SeedLotPage({ params }: SeedLotPageProps) {
  const { lang } = params;

  const user = await getCurrentUser();
  if (!user) return notFound();

  // Load translations/dictionary for seedlots page
  const dict = await getDictionary(lang as Locale);
  const seedlotsDict = dict.seedlots;

  return <SeedLotDashboard orgId={user.orgId} dict={seedlotsDict} />;
}
