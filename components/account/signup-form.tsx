"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { signup } from "@/app/actions/auth";
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
import { PasswordInput } from "@/components/ui/password-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PUBLIC_SIGNUP_ROLES } from "@/lib/auth/allowed-roles";

type SignupState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

function SubmitButton({
  label,
  disabled,
}: {
  label: string;
  disabled: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={disabled || pending} className="w-full">
      {pending ? "…" : label}
    </Button>
  );
}

export function SignupForm({
  lang,
  signupDict,
  errorsDict,
  disableSocialLogin = true,
}: {
  lang: string;
  signupDict: any;
  errorsDict: any;
  disableSocialLogin?: boolean;
}) {
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const passwordsMismatch =
    form.confirmPassword.length > 0 && form.password !== form.confirmPassword;

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const [state, formAction] = React.useActionState<SignupState, FormData>(
    (_, data) => signup(data, lang),
    {},
  );

  useEffect(() => {
    if (state.error) {
      toast.error(errorsDict[state.error] ?? errorsDict.unknown_error);
    }
  }, [state.error, errorsDict]);

  const isValid = !!form.role && !passwordsMismatch;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{signupDict.title}</CardTitle>
        <CardDescription>{signupDict.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-4">
          <FieldGroup>
            {/* Full name */}
            <Field>
              <FieldLabel>{signupDict.name.label}</FieldLabel>
              <Input
                name="fullName"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder={signupDict.name.placeholder}
                required
              />
              {state.fieldErrors?.fullName && (
                <FieldDescription className="text-destructive">
                  {state.fieldErrors.fullName[0]}
                </FieldDescription>
              )}
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel>{signupDict.email.label}</FieldLabel>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder={signupDict.email.placeholder}
                required
              />
              {signupDict.email.description && (
                <FieldDescription>
                  {signupDict.email.description}
                </FieldDescription>
              )}
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel>{signupDict.password.label}</FieldLabel>
              <PasswordInput
                name="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder={signupDict.password.placeholder}
                required
              />
              {signupDict.password.description && (
                <FieldDescription>
                  {signupDict.password.description}
                </FieldDescription>
              )}
            </Field>

            {/* Confirm password */}
            <Field>
              <FieldLabel>{signupDict.confirmPassword.label}</FieldLabel>
              <PasswordInput
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                placeholder={signupDict.confirmPassword.placeholder}
                required
              />
              {signupDict.confirmPassword.description && (
                <FieldDescription>
                  {signupDict.confirmPassword.description}
                </FieldDescription>
              )}
            </Field>

            {passwordsMismatch && (
              <FieldDescription className="text-destructive">
                {errorsDict.password_mismatch ??
                  errorsDict.unknown_error ??
                  "Passwords do not match."}
              </FieldDescription>
            )}

            {/* Role */}
            <Field>
              <FieldLabel>{signupDict.role.label}</FieldLabel>

              <Select
                value={form.role}
                onValueChange={(value) => update("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={signupDict.role.placeholder} />
                </SelectTrigger>

                <SelectContent>
                  {PUBLIC_SIGNUP_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {signupDict.roles?.[role] ?? role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <input type="hidden" name="role" value={form.role} />

              {signupDict.role.description && (
                <FieldDescription>
                  {signupDict.role.description}
                </FieldDescription>
              )}
            </Field>

            {/* Submit */}
            <SubmitButton label={signupDict.submit} disabled={!isValid} />

            {/* Social login */}
            {!disableSocialLogin && (
              <Button variant="outline" type="button" className="w-full">
                {signupDict.socialLogin}
              </Button>
            )}

            {/* Footer */}
            <FieldDescription className="text-center">
              {signupDict.haveAccount}{" "}
              <Link href={`/${lang}/login`} className="underline">
                {signupDict.loginLink}
              </Link>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
