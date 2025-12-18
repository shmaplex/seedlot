"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DocumentationPageClient({
  dict,
  lang,
}: {
  dict: {
    title: string;
    message: string;
    backHome: string;
    getStarted: string;
  };
  lang: string;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 py-16 relative overflow-hidden">
      {/* Clickable Logo */}
      <div className="mb-12">
        <Link href={`/${lang}/`}>
          <Image
            src="/png/seedlot-logo@2x.png"
            alt="Seedlot logo"
            width={150}
            height={50}
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6">
        {dict.title}
      </h1>

      {/* Friendly message */}
      <p className="text-lg sm:text-xl text-center text-muted-foreground max-w-2xl mb-8">
        {dict.message}
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 justify-center">
        <Button
          asChild
          size="lg"
          className="rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Link href={`/${lang}/`}>{dict.backHome}</Link>
        </Button>

        <Button
          asChild
          size="lg"
          variant="outline"
          className="rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Link href={`/${lang}/waitlist`}>{dict.getStarted}</Link>
        </Button>
      </div>

      {/* Decorative circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none"></div>
    </div>
  );
}
