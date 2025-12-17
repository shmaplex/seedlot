"use client";

import Image from "next/image";
import { LegalContent } from "@/components/legal/legal-content";

export default function PrivacyPageClient({
  dict,
  lang,
}: {
  dict: any;
  lang: string;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 pb-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Page title */}
        <h1 className="text-4xl font-extrabold text-center">
          {dict.title ?? "Privacy Policy"}
        </h1>

        {/* Updated date */}
        <p className="text-sm text-muted-foreground">
          {dict.updatedLabel ?? "Last updated"}:{" "}
          {dict.lastUpdated ?? "December 17, 2025"}
        </p>

        {/* Structured content */}
        {Array.isArray(dict.content) ? (
          <LegalContent content={dict.content} />
        ) : (
          <div className="prose max-w-none text-left">
            <p>
              Seedlot values your privacy. This Privacy Policy explains how we
              collect, use, and protect your information when you use our
              services.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
