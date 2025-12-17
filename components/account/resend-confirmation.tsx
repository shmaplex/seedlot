"use client";

import { useState } from "react";
import { resendConfirmation } from "@/app/auth/actions";

export function ResendConfirm({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  async function handleResend() {
    const res = await resendConfirmation(email);
    setStatus(res.success ? "sent" : "error");
  }

  return (
    <div className="text-sm text-center">
      {status === "sent" ? (
        <p className="text-green-600">Confirmation email sent.</p>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          className="underline underline-offset-4"
        >
          Resend confirmation email
        </button>
      )}
    </div>
  );
}
