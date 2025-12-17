"use client";

import { useEffect, useState } from "react";

export function AuthCallbackError() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (!hash.startsWith("#")) return;

    const params = new URLSearchParams(hash.slice(1));
    const description = params.get("error_description");

    if (description) {
      setError(decodeURIComponent(description.replace(/\+/g, " ")));

      // Clean the URL (remove hash)
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  if (!error) return null;

  return (
    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
      {error}
    </div>
  );
}
