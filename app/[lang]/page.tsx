// app/[lang]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/dictionaries";

/**
 * Localized home / landing page
 */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/logo-alt.webp"
          alt="Seedlot logo"
          width={250}
          height={50}
          priority
        />

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            {dict.home.title}
          </h1>

          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {dict.home.description}
          </p>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Button asChild size="lg" className="rounded-full">
            <Link href={`/${lang}/login`}>{dict.home.actions.login}</Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.home.actions.docs}
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
