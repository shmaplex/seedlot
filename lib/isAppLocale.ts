// lib/isAppLocale.ts
import { type AppLocale, routing } from "@/i18n/routing";

/**
 * Checks whether a value is a valid application locale.
 *
 * Acts as a TypeScript type guard, narrowing the value
 * to AppLocale ("en" | "ko") when true.
 *
 * @param value - Arbitrary locale string
 */
export function isAppLocale(value: string): value is AppLocale {
  return routing.locales.includes(value as AppLocale);
}
