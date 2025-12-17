import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token_hash = url.searchParams.get("token_hash");
  const typeParam = url.searchParams.get("type"); // string | null

  const referer = request.headers.get("referer") ?? "";
  const localeMatch = referer.match(/\/(en|ko)\b/);
  const lang = localeMatch?.[1] ?? "en";

  const resetPage = new URL(`/${lang}/reset-password`, request.url);

  // Use "recovery" as Supabase expects for password reset
  if (token_hash && typeParam === "recovery") {
    resetPage.searchParams.set("token_hash", token_hash);
    return NextResponse.redirect(resetPage);
  }

  resetPage.searchParams.set("error", "invalid_link");
  return NextResponse.redirect(resetPage);
}
