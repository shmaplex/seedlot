// app/[lang]/account/page.tsx
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import AccountPageClient from "./page.client";

export default async function AccountPage() {
  const initialUser = await getCurrentUser();
  const initialUserProfile = await getCurrentUserProfile();

  return (
    <AccountPageClient
      initialUserProfile={initialUserProfile}
      initialUser={initialUser}
    />
  );
}
