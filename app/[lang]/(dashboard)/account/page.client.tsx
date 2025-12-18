"use client";

import type { User } from "@supabase/supabase-js";
import AccountForm from "@/components/account/account-form";
import type { ProfileBase } from "@/schemas/profile.schema";

type AccountPageClientProps = {
  initialUser: User | null;
  initialUserProfile: ProfileBase | null;
};

export default function AccountPageClient({
  initialUser,
  initialUserProfile,
}: AccountPageClientProps) {
  return (
    <div className="px-4">
      <AccountForm user={initialUser} profile={initialUserProfile} />
    </div>
  );
}
