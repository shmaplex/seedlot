"use client";

import type { ReactNode } from "react";
import { useUser } from "@/providers/UserProvider";

interface SignedInProps {
  children: ReactNode;
}

/**
 * Only renders children if the user is signed in (authenticated)
 *
 * Uses UserProvider context to determine auth state, including MFA.
 *
 * @example
 * ```tsx
 * <UserProvider>
 *   <SignedIn>
 *     <Dashboard />
 *   </SignedIn>
 * </UserProvider>
 * ```
 */
export function SignedIn({ children }: SignedInProps) {
  const { user, loading } = useUser();

  // Avoid rendering anything while auth state is loading
  if (loading) return null;

  // Render children only if a user is authenticated
  if (!user) return null;

  return <>{children}</>;
}
