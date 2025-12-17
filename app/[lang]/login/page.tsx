import Link from "next/link";
import { notFound } from "next/navigation";
import { login } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDictionary, hasLocale } from "../dictionaries";

/**
 * Localized login page
 */
export default async function LoginPage({
  params,
}: PageProps<"/[lang]/login">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const t = dict.auth.login;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form action={login} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.email.label}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t.email.placeholder}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.password.label}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={t.password.placeholder}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {t.submit}
            </Button>
          </form>

          {/* 👇 Signup link */}
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            {t.noAccount}{" "}
            <Link
              href={`/${lang}/signup`}
              className="font-medium text-black underline-offset-4 hover:underline dark:text-zinc-50"
            >
              {t.signupLink}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
