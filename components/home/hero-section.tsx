import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection({
  lang,
  dict,
}: {
  lang: string;
  dict: any;
}) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-card px-8 py-24 text-center md:py-32 md:text-left">
      <div className="max-w-4xl">
        <Image
          src="/png/seedlot-logo@2x.png"
          alt="Seedlot logo"
          width={250}
          height={50}
          className="mx-auto mb-8 dark:invert md:mx-0"
          priority
        />
        <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl">
          {dict.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
          {dict.description}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Button asChild size="lg" className="rounded-full">
            <Link href={`/${lang}/login`}>{dict.actions.login}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href={`/${lang}/docs`}>{dict.actions.docs}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
