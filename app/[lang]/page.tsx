// app/[lang]/page.tsx
import CTASection from "@/components/home/cta-section";
import FeaturesSection from "@/components/home/features-section";
import HeroSection from "@/components/home/hero-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/server/dictionaries";

/**
 * Localized home / landing page
 */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="font-sans bg-background text-foreground dark:bg-black dark:text-white">
      {/* Hero */}
      <HeroSection lang={lang} dict={dict.home} />

      {/* Features */}
      <FeaturesSection features={dict.home.features} />

      {/* How It Works */}
      <HowItWorksSection steps={dict.home.howItWorks} />

      {/* Call to Action */}
      <CTASection lang={lang} actions={dict.home.actions} />
    </div>
  );
}
