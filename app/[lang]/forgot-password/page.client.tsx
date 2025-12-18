"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { sendPasswordReset } from "@/app/actions/auth";
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

interface ForgotPasswordPageProps {
  lang: string;
  dict: any;
}

export default function ForgotPasswordPage({
  lang,
  dict,
}: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setErrorMsg("");

    try {
      const result = await sendPasswordReset(email, lang);
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Unknown error occurred");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Unknown error occurred");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black px-4">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/png/seedlot-logo@2x.png" // Seedlot logo
          alt="Seedlot logo"
          width={250}
          height={50}
          className="dark:invert"
          priority
        />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{dict.title}</CardTitle>
          <CardDescription>{dict.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Success/Error Messages */}
          {status === "success" && (
            <p className="text-green-600">{dict.successMessage}</p>
          )}
          {status === "error" && (
            <p className="text-red-600">{dict.errorMessage || errorMsg}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{dict.emailLabel}</Label>
              <Input
                id="email"
                type="email"
                placeholder={dict.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {dict.submit}
            </Button>
          </form>

          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            <Link
              href={`/${lang}/login`}
              className="font-medium text-black underline-offset-4 hover:underline dark:text-zinc-50"
              prefetch={false}
            >
              {dict.backToLogin || "Back to login"}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
