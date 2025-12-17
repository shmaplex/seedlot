"use client";

import Image from "next/image";
import { LegalContent } from "@/components/legal/legal-content";

export default function TermsPageClient({
  dict,
  lang,
}: {
  dict: any;
  lang: string;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 pb-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        <h1 className="text-4xl font-extrabold text-center">{dict.title}</h1>

        <p className="text-sm text-muted-foreground">
          {dict.updatedLabel}: {dict.lastUpdated}
        </p>

        <LegalContent content={dict.content} />
      </div>
    </div>
  );
}
