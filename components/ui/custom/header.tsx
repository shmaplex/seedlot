"use client";

import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignUpButton } from "@/components/account";
import { UserButton } from "@/components/account/user-button";
import { Button } from "@/components/ui/button";
import { HeaderLogo } from "@/components/ui/custom";
import { ModeToggle } from "@/components/ui/custom/mode-toggle";

export function Header() {
  const router = useRouter();

  const handleSignInRedirect = () => router.push("/auth/login");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 sm:px-6 shadow-md bg-background border-b border-border text-foreground">
        {/* Logo */}
        <HeaderLogo />

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <SignedOut>
            <Button variant="outline" onClick={handleSignInRedirect}>
              Sign In
            </Button>
            <SignUpButton mode="redirect">Sign Up</SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <ModeToggle />
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Button aria-label="Open Menu">☰</Button>
        </div>
      </header>

      {/* Mobile floating avatar */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </>
  );
}
