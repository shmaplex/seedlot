"use client";

import { Check, File, Package, Shield } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

// Feature type
export type Feature = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const ICONS: ComponentType<SVGProps<SVGSVGElement>>[] = [
  Check,
  File,
  Shield,
  Package,
];

export default function FeaturesSection({
  features: dict,
}: {
  features: Feature[];
}) {
  // Map dictionary to features with icons
  const features: Feature[] = dict.map((f, i) => ({
    ...f,
    icon: ICONS[i % ICONS.length],
  }));

  return (
    <section className="relative bg-linear-to-b from-background to-zinc-50 dark:from-black dark:to-zinc-900 py-24 px-6 md:py-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-foreground mb-12 md:text-4xl">
          {features.length ? "Features" : ""}
        </h2>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i as any}
                className="relative flex flex-col items-center rounded-xl border border-border bg-background dark:bg-zinc-900 p-6 text-center transition-all hover:shadow-xl hover:scale-105"
              >
                {/* Icon with accent circle */}
                <div className="mb-4 rounded-full bg-primary/10 p-4 flex items-center justify-center">
                  {Icon && <Icon className="w-8 h-8 text-primary" />}
                </div>

                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>

                {/* Optional accent line at bottom */}
                <div className="mt-4 h-1 w-16 bg-primary rounded-full opacity-50"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
