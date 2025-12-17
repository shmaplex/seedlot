// app/page.tsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const supportedLocales = ["en", "ko"] as const;
type SupportedLocale = (typeof supportedLocales)[number];

export default async function RootLayout() {
  // Await the headers object
  const headersList = await headers();
  const acceptLang = headersList.get("accept-language") || "";

  let preferredLang: SupportedLocale = "en";

  if (acceptLang) {
    // Extract the first language from header
    const firstLang = acceptLang.split(",")[0].split("-")[0];
    if (supportedLocales.includes(firstLang as SupportedLocale)) {
      preferredLang = firstLang as SupportedLocale;
    }
  }

  // Redirect to /[lang] route
  redirect(`/${preferredLang}`);
}
