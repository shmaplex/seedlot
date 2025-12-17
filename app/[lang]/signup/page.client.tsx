"use client";

import Image from "next/image";
import Link from "next/link";
import { SignupForm } from "@/components/account/signup-form";

interface SignupPageClientProps {
  lang: string;
  signupDict: any;
  errorsDict: any;
}

export default function SignupPageClient({
  lang,
  signupDict,
  errorsDict,
}: SignupPageClientProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel */}
      <div className="relative hidden h-screen w-1/2 flex-col justify-between overflow-hidden bg-primary/5 p-10 lg:flex">
        <div className="absolute top-6 left-6 w-48 opacity-100 hover:opacity-90 duration-500 ease-in-out">
          <Link href="/">
            <Image
              src="/png/seedlot-logo@2x.png"
              alt="Seedlot logo"
              width={128}
              height={50}
              priority
            />
          </Link>
        </div>

        <div className="absolute bottom-10 left-10 max-w-sm text-foreground text-sm">
          <blockquote className="leading-snug italic">
            &ldquo;Every seed you register today is a step toward a traceable,
            compliant, and effortless export tomorrow.&rdquo;
          </blockquote>
          <p className="mt-4 font-semibold">- Seedlot Team</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <SignupForm
            lang={lang}
            errorsDict={errorsDict}
            signupDict={signupDict}
          />
        </div>
      </div>
    </div>
  );
}
