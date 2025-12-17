"use client";

import type { ReactNode } from "react";
import { useUser } from "@/providers/UserProvider";

interface SignedOutProps {
  children: ReactNode;
}

/**
 * Only renders children if the user is signed out (no authenticated user)
 *
 * Uses UserProvider context to determine auth state.
 *
 * @example
 * ```tsx
 * <UserProvider>
 *   <SignedOut>
 *     <LoginForm />
 *   </SignedOut>
 * </UserProvider>
 * ```
 */
export function SignedOut({ children }: SignedOutProps) {
  const { user, loading } = useUser();

  // If loading auth state, render nothing to avoid flicker
  if (loading) return null;

  // Render children only if no user is authenticated
  if (user) return null;

  return <>{children}</>;
}
