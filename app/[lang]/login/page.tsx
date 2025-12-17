import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/server/dictionaries";
import LoginPageClient from "./page.client";

export default async function LoginPage({
  params,
  searchParams,
}: PageProps<"/[lang]/login">) {
  const { lang } = await params;

  const sp = await searchParams;
  const error: string | null = Array.isArray(sp?.error)
    ? sp.error[0]
    : (sp?.error ?? null);
  const email: string | null = Array.isArray(sp?.email)
    ? sp.email[0]
    : (sp?.email ?? null);

  const dict = await getDictionary(lang as Locale);
  const { login: loginDict, errors: errorDict } = dict.auth;

  const notice: string | null = Array.isArray(sp?.notice)
    ? sp.notice[0]
    : (sp?.notice ?? null);

  return (
    <LoginPageClient
      lang={lang}
      loginDict={loginDict}
      errorDict={errorDict}
      error={error}
      notice={notice}
      email={email}
    />
  );
}
