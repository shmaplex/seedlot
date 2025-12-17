// app/[lang]/account/page.tsx
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import AccountPageClient from "./page.client";

export default async function AccountPage({
  params,
}: {
  params: { lang: string };
}) {
  const initialUser = await getCurrentUser();
  const initialUserProfile = await getCurrentUserProfile();

  return (
    <AccountPageClient
      lang={params.lang}
      initialUserProfile={initialUserProfile}
      initialUser={initialUser}
    />
  );
}
