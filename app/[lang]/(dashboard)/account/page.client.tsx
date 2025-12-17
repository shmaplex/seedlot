// app/[lang]/account/page.client.tsx
"use client";

import type { User } from "@supabase/supabase-js";
import AccountForm from "@/components/account/account-form";
import type { UserProfile } from "@/schemas/profile.schema";

export default function AccountPageClient({
  initialUser,
  initialUserProfile,
}: {
  initialUser: User | null;
  initialUserProfile: UserProfile | null;
}) {
  return (
    <div className="px-4">
      <AccountForm user={initialUser} profile={initialUserProfile} />
    </div>
  );
}
