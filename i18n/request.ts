// i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { isAppLocale } from "@/lib/isAppLocale";
import { getDictionary } from "@/lib/server/dictionaries";
import { type AppLocale, routing } from "./routing";

/**
 * next-intl request configuration
 *
 * Resolves the active locale and loads the corresponding
 * message bundle for each request.
 *
 * Locale resolution order:
 * 1. Explicit locale passed to server helpers (e.g. getTranslations)
 * 2. Route segment ([lang])
 * 3. routing.defaultLocale
 */
export default getRequestConfig(async ({ locale }) => {
  const candidate = locale ?? routing.defaultLocale;
  const resolvedLocale: AppLocale = isAppLocale(candidate)
    ? candidate
    : routing.defaultLocale;

  return {
    locale: resolvedLocale,
    messages: await getDictionary(resolvedLocale),
  };
});
