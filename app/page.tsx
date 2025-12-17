// app/page.tsx
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Root entrypoint
 *
 * Redirects `/` → `/{defaultLocale}`
 * All UI rendering happens under `/[lang]`
 */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
