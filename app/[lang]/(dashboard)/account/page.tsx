"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AccountForm from "@/components/account/account-form";
import { Loader } from "@/components/ui/loader";
import { useUser } from "@/providers/UserProvider";

export default function AccountPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader message="Loading your account..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8 flex justify-center">
      <AccountForm user={user} />
    </div>
  );
}
