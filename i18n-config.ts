// i18n-config.ts

/**
 * Seedlot supported locales configuration
 */
export const i18n = {
  defaultLocale: "en",
  locales: ["en", "ko"], // add more locales here if needed
} as const;

// Type for supported locales
export type Locale = (typeof i18n)["locales"][number];
