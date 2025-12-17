"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotLoggedIn({
  redirectTo = "/",
}: {
  redirectTo?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    router.replace(redirectTo);
  }, [router, redirectTo]);

  return null;
}
