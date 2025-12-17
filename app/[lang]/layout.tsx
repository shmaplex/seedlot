// app/[lang]/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getDictionary, hasLocale } from "@/lib/server/dictionaries";
import "@/styles/globals.css";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { Footer } from "@/components/ui/custom";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { UserProvider } from "@/providers/UserProvider";

// --- Fonts ---
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- Metadata (can be dynamic per locale if needed) ---
export const metadata: Metadata = {
  title: "Seedlot – Seed compliance without the chaos",
  description:
    "Import, validate, and manage seed lots with regulatory-grade clarity.",
};

// --- Static params for i18n ---
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ko" }];
}

// --- Root layout for /[lang] routes ---
export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const initialUser = await getCurrentUser();

  // Preload translations (optional)
  const messages = await getDictionary(lang);

  // Optional: validate supported locales
  const supportedLocales = ["en", "ko"] as const;
  type SupportedLocale = (typeof supportedLocales)[number];
  const currentLang: SupportedLocale = supportedLocales.includes(
    lang as SupportedLocale,
  )
    ? (lang as SupportedLocale)
    : "en";

  return (
    <html lang={currentLang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={lang} messages={messages}>
          <UserProvider initialUser={initialUser}>{children}</UserProvider>
          <Footer lang={lang} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
