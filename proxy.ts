// proxy.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/proxy";

/**
 * Resolve the best locale for the incoming request.
 * Priority:
 * 1. Existing locale in pathname
 * 2. Accept-Language header
 * 3. routing.defaultLocale
 */
function resolveLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");

  if (!acceptLanguage) return routing.defaultLocale;

  const preferred = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim());

  return (
    preferred.find((lang) => routing.locales.includes(lang as any)) ??
    routing.defaultLocale
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /**
   * 1️⃣ Refresh Supabase auth session (must happen first)
   */
  const sessionResponse = await updateSession(request);
  if (sessionResponse) return sessionResponse;

  /**
   * 2️⃣ Check if the pathname already contains a locale
   */
  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  /**
   * 3️⃣ Redirect to locale-prefixed route
   */
  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /**
     * Exclude:
     * - Next.js internals
     * - Static assets
     * - Image optimization
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
