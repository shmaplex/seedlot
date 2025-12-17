"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection({
  lang,
  actions,
}: {
  lang: string;
  actions: {
    ctaTitle?: string;
    ctaDescription?: string;
    signup: string;
    login?: string;
    docs?: string;
    cta?: string;
  };
}) {
  return (
    <section className="relative bg-linear-to-r from-secondary via-accent to-primary/60 py-24 px-6 md:py-32 text-center text-primary-foreground overflow-hidden">
      {/* Decorative radial highlights */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
        {/* Headline */}
        <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
          {actions.ctaTitle || "Start Growing Your Seed Compliance Today"}
        </h2>

        {/* Description */}
        {actions.ctaDescription && (
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl">
            {actions.ctaDescription}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          {/* Primary: Sign Up */}
          <Button
            asChild
            size="lg"
            className="rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Link href={`/${lang}/signup`}>
              {actions.signup || "Get Started"}
            </Link>
          </Button>

          {/* Secondary: Login */}
          {actions.login && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full font-semibold hover:bg-primary-foreground hover:border-transparent hover:text-primary shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Link href={`/${lang}/login`}>{actions.login}</Link>
            </Button>
          )}

          {/* Optional: Docs Button */}
          {/* {actions.docs && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full font-semibold hover:bg-primary-foreground hover:border-transparent hover:text-primary shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Link href={`/${lang}/docs`}>{actions.docs}</Link>
            </Button>
          )} */}
        </div>
      </div>
    </section>
  );
}
