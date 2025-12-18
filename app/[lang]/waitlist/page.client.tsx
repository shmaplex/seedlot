"use client";

import Image from "next/image";
import Link from "next/link";
import WaitlistForm from "@/components/forms/waitlist-form";

export default function WaitlistPageClient({
  dict,
  lang,
}: {
  dict: any; // replace with proper type if you have one
  lang: string;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 pb-4 flex flex-col justify-center items-center pt-8 gap-8">
      {/* Seedlot Logo */}
      <Link href="/">
        <Image
          src="/png/seedlot-logo@2x.png"
          alt="Seedlot logo"
          width={250}
          height={50}
          className="dark:invert"
          priority
        />
      </Link>

      {/* Waitlist Form */}
      <div className="w-full max-w-md">
        <WaitlistForm dict={dict} />
      </div>
    </div>
  );
}
