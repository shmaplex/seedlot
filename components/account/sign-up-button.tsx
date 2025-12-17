"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/providers/UserProvider";

interface SignUpButtonProps {
  children: ReactNode;
  /** Trigger mode: 'modal' uses internal modal, 'redirect' goes to signup page */
  mode?: "modal" | "redirect";
  /** Redirect URL for signup page, used in redirect mode */
  redirectUrl?: string;
}

/**
 * SignUpButton using our design-system Button
 * - Works with keyboard & mouse automatically
 * - Supports modal or redirect mode
 * - Calls UserProvider refresh if modal signup succeeds
 */
export function SignUpButton({
  children,
  mode = "redirect",
  redirectUrl = "/auth/signup",
}: SignUpButtonProps) {
  const { refreshUser } = useUser();

  const handleClick = () => {
    if (mode === "redirect") {
      window.location.href = redirectUrl;
    } else {
      // Dispatch modal event for internal modal signup
      const event = new CustomEvent("open-signup-modal", {
        detail: { onSuccess: refreshUser },
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <Button type="button" onClick={handleClick}>
      {children}
    </Button>
  );
}
