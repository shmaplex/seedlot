"use client";

import Link from "next/link";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "../ui/password-input";

interface LoginFormProps {
  lang: string;
  loginDict: any;
}

export function LoginForm({ lang, loginDict }: LoginFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{loginDict.title}</CardTitle>
        <CardDescription>{loginDict.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form
          action={(data: FormData) => login(data, lang)}
          className="space-y-4"
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">{loginDict.email.label}</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={loginDict.email.placeholder}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">
                {loginDict.password.label}
              </FieldLabel>
              <PasswordInput
                id="password"
                name="password"
                type="password"
                placeholder={loginDict.password.placeholder}
                required
              />
              <div className="text-right mt-1">
                <Link
                  href={`/${lang}/forgot-password`}
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                  prefetch={false}
                >
                  {loginDict.forgotPassword || "Forgot password?"}
                </Link>
              </div>
            </Field>

            <Field>
              <Button type="submit" className="w-full">
                {loginDict.submit}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
