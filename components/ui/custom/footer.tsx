"use client";

import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  const mainLinks = [
    { href: "/docs", label: "Docs" },
    { href: "https://github.com/shmaplex/seedlot", label: "GitHub" },
    { href: "/pricing", label: "Pricing" },
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
  ];

  const authLinks = [
    { href: "/login", label: "Log In" },
    { href: "/signup", label: "Sign Up" },
  ];

  return (
    <footer className="bg-card text-card-foreground border-t border-border transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-0">
        {/* Brand / Copyright */}
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:gap-2">
          <p className="text-base font-semibold text-foreground">Seedlot</p>
          <p className="text-sm text-muted-foreground">
            &copy; {year}. All rights reserved.
          </p>
        </div>

        {/* Main Links */}
        <nav className="flex flex-wrap gap-6 md:gap-8 text-base">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Links */}
        <div className="flex gap-4 md:gap-6">
          {authLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors font-semibold text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
