// app/auth/confirm/route.ts
import type { EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;

  // Infer locale from referer (fallback to 'en')
  const referer = request.headers.get("referer") ?? "";
  const localeMatch = referer.match(/\/(en|ko)\b/);
  const lang = localeMatch?.[1] ?? "en";

  const successRedirect = `/${lang}/account`;
  const loginRedirect = new URL(`/${lang}/login`, request.url);

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      return NextResponse.redirect(successRedirect);
    }

    // Pass a semantic error code
    loginRedirect.searchParams.set("error", error.code ?? "otp_invalid");
    return NextResponse.redirect(loginRedirect);
  }

  // Missing token/type → invalid link
  loginRedirect.searchParams.set("error", "otp_invalid");
  return NextResponse.redirect(loginRedirect);
}
