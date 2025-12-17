"use client";

import Image from "next/image";
import type { ReactNode } from "react";

interface LegalLayoutClientProps {
  children: ReactNode;
}

export default function LegalLayoutClient({
  children,
}: LegalLayoutClientProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header with logo */}
      <header className="flex justify-center py-4">
        <Image
          src="/png/seedlot-logo@2x.png"
          alt="Seedlot logo"
          width={150}
          height={50}
          style={{ objectFit: "contain" }}
          priority
        />
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center px-6 py-12 md:py-12">
        <div className="w-full max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
