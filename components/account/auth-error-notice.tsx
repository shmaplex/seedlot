"use client";

import { Button } from "@/components/ui/button";

interface AuthErrorNoticeProps {
  messages: Record<string, string>;
  error: string | null;
  email: string | null;
  status: "idle" | "sent";
  onResend: () => Promise<void>;
}

export function AuthErrorNotice({
  messages,
  error,
  email,
  status,
  onResend,
}: AuthErrorNoticeProps) {
  if (!error) return null;

  const message = messages[error] ?? messages.unknown_error;

  return (
    <div className="rounded-md border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400 space-y-2">
      <p>{message}</p>

      {error === "unconfirmed_email" &&
        email &&
        (status === "sent" ? (
          <p className="text-green-600">{messages.confirmation_sent}</p>
        ) : (
          <Button
            type="button"
            variant="link"
            className="h-auto p-0 text-sm"
            onClick={onResend}
          >
            {messages.resend_confirmation}
          </Button>
        ))}
    </div>
  );
}
