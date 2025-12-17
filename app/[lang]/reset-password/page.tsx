"use client";

import Image from "next/image";
import { useState } from "react";
import { updatePassword } from "@/app/auth/actions";
import NotLoggedIn from "@/components/account/not-logged-in";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/providers/UserProvider";

export default function ChangePasswordForm() {
  const { user, loading } = useUser();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (loading) return <Loader message="Checking user session..." />;
  if (!user) return <NotLoggedIn redirectTo="/" />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setErrorMsg("");

    try {
      const result = await updatePassword(password);
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Failed to update password.");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "An unexpected error occurred.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="mb-8">
        <Image
          src="/logo-alt.webp"
          alt="Seedlot logo"
          width={250}
          height={50}
          className="dark:invert"
          priority
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md"
      >
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />
        <Button type="submit" className="w-full">
          Update Password
        </Button>

        {status === "success" && (
          <p className="text-green-600 text-center">
            Password updated successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center">{errorMsg}</p>
        )}
      </form>
    </div>
  );
}
