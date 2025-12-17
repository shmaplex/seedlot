// i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ko"] as const,
  defaultLocale: "en",
});

export type AppLocale = (typeof routing.locales)[number];
