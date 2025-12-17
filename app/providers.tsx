"use client";

import { Theme } from "@radix-ui/themes";
import type React from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";

interface ProvidersProps {
  children: React.ReactNode;
  lang?: string;
}

/**
 * Global providers for the app including:
 * - Auth state (UserProvider)
 *
 * Wrap your app in this component to provide global state.
 */
export function Providers({ children, lang }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Theme>{children}</Theme>
    </ThemeProvider>
  );
}
