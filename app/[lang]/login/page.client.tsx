"use client";

import Image from "next/image";
import { useState } from "react";
import { resendConfirmation } from "@/app/auth/actions";
import { AuthErrorNotice } from "@/components/account/auth-error-notice";
import { LoginForm } from "@/components/account/login-form";

interface LoginPageClientProps {
  lang: string;
  loginDict: any;
  errorDict: any;
  error: string | null;
  email: string | null;
}

export default function LoginPageClient({
  lang,
  loginDict,
  errorDict,
  error,
  email,
}: LoginPageClientProps) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  async function handleResend() {
    if (!email) return;
    await resendConfirmation(email);
    setStatus("sent");
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel */}
      <div className="relative hidden h-screen w-1/2 flex-col justify-between overflow-hidden bg-primary/5 p-10 lg:flex">
        <div className="absolute top-6 left-6 w-48">
          <Image
            src="/png/seedlot-logo@2x.png"
            alt="Seedlot logo"
            width={250}
            height={50}
            priority
          />
        </div>

        <div className="absolute bottom-10 left-10 max-w-sm text-foreground text-sm">
          <blockquote className="leading-snug">
            &ldquo;With Seedlot, every seed lot is fully traceable and
            export-ready. It simplifies compliance, reduces risk, and makes
            international seed trade effortless.&rdquo;
          </blockquote>
          <p className="mt-4 font-semibold">- Dr. Riley Thompson</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          {error && (
            <AuthErrorNotice
              messages={{
                invalid_credentials: errorDict.invalid_credentials,
                otp_expired: errorDict.otp_expired,
                otp_invalid: errorDict.otp_invalid,
                unconfirmed_email: errorDict.unconfirmed_email,
                unknown_error: errorDict.unknown_error,
                confirmation_sent: loginDict.confirmation_sent,
                resend_confirmation: loginDict.resend_confirmation,
              }}
              error={error}
              email={email}
              status={status}
              onResend={handleResend}
            />
          )}

          <LoginForm lang={lang} loginDict={loginDict} />

          {/* Signup link */}
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-4">
            {loginDict.noAccount}{" "}
            <a
              href={`/${lang}/signup`}
              className="font-medium text-black underline-offset-4 hover:underline dark:text-zinc-50"
            >
              {loginDict.signupLink}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
