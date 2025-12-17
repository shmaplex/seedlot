"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center justify-center opacity-90 hover:opacity-100 transition"
        >
          <Image
            src="/png/seedlot-logo@2x.png"
            alt="Seedlot"
            width={140}
            height={48}
            priority
          />
        </Link>

        <h1 className="text-xl font-semibold">Something went wrong</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          We ran into an unexpected issue. Please refresh the page or come back
          in a moment.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => window.location.reload()}>Refresh page</Button>

          <Link
            href="/"
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
