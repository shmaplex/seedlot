// app/[lang]/account/page.client.tsx
"use client";

import type { User } from "@supabase/supabase-js";
import AccountForm from "@/components/account/account-form";
import type { UserProfile } from "@/schemas/profile.schema";

export default function AccountPageClient({
  lang,
  initialUser,
  initialUserProfile,
}: {
  lang: string;
  initialUser: User | null;
  initialUserProfile: UserProfile | null;
}) {
  return (
    <div className="px-4 py-8">
      <AccountForm user={initialUser} profile={initialUserProfile} />
    </div>
  );
}
