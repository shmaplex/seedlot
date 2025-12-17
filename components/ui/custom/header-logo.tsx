"use client";

import Image from "next/image";
import Link from "next/link";

export function HeaderLogo({ href = "/" }: { href?: string }) {
  return (
    <div className="flex w-28 mt-2 ml-2">
      <Link href={href} className="flex items-center">
        <Image
          src="/png/seedlot-logo@2x.png" // updated to Seedlot logo
          alt="Seedlot Logo"
          width={1025} // original image width
          height={416} // original image height
          priority
        />
        {/* Optional text if you want: */}
        {/* <span className="ml-2 font-bold text-lg sm:text-xl tracking-tight hover:text-primary transition-colors">
          Seedlot
        </span> */}
      </Link>
    </div>
  );
}
