"use client";

import Link from "next/link";
import { signup } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface SignupFormProps {
  lang: string;
  signupDict: any;
  disableSocialLogin?: boolean; // new prop
}

export function SignupForm({
  lang,
  signupDict,
  disableSocialLogin = true,
}: SignupFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{signupDict.title}</CardTitle>
        <CardDescription>{signupDict.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={(data: FormData) => signup(data, lang)}
          className="space-y-4"
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">{signupDict.name.label}</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder={signupDict.name.placeholder}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">{signupDict.email.label}</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={signupDict.email.placeholder}
                required
              />
              <FieldDescription>
                {signupDict.email.description}
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">
                {signupDict.password.label}
              </FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={signupDict.password.placeholder}
                required
              />
              <FieldDescription>
                {signupDict.password.description}
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">
                {signupDict.confirmPassword.label}
              </FieldLabel>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder={signupDict.confirmPassword.placeholder}
                required
              />
              <FieldDescription>
                {signupDict.confirmPassword.description}
              </FieldDescription>
            </Field>

            <FieldGroup>
              <Field className="space-y-2">
                <Button type="submit" className="w-full">
                  {signupDict.submit}
                </Button>

                {!disableSocialLogin && (
                  <Button variant="outline" type="button" className="w-full">
                    {signupDict.socialLogin || "Sign up with Google"}
                  </Button>
                )}

                <FieldDescription className="px-6 text-center">
                  {signupDict.haveAccount}{" "}
                  <Link
                    href={`/${lang}/login`}
                    className="font-medium underline-offset-4 hover:underline"
                  >
                    {signupDict.loginLink}
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
