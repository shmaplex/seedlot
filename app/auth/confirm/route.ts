// app/auth/confirm/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  /**
   * Supabase sends:
   *   ?token=...&type=signup
   * OR (OAuth/magic links):
   *   ?code=...
   */
  const token = url.searchParams.get("token") ?? url.searchParams.get("code");

  const type = url.searchParams.get("type");

  // Infer locale (fallback to en)
  const referer = request.headers.get("referer") ?? "";
  const localeMatch = referer.match(/\/(en|ko)\b/);
  const lang = localeMatch?.[1] ?? "en";

  const successRedirect = new URL(`/${lang}/dashboard/account`, request.url);
  const loginRedirect = new URL(`/${lang}/login`, request.url);

  if (!token) {
    loginRedirect.searchParams.set("error", "otp_invalid");
    return NextResponse.redirect(loginRedirect);
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(token);

  if (!error) {
    return NextResponse.redirect(successRedirect);
  }

  loginRedirect.searchParams.set("error", error.code ?? "otp_invalid");
  return NextResponse.redirect(loginRedirect);
}
