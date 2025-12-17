"use client";

import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NoticeVariant = "error" | "success" | "info";

interface AuthNoticeProps {
  messages: Record<string, string>;
  code: string | null;
  variant?: NoticeVariant;
  email?: string | null;
  status?: "idle" | "sent";
  onResend?: () => Promise<void>;
}

const VARIANT_STYLES: Record<
  NoticeVariant,
  {
    container: string;
    icon: React.ReactNode;
  }
> = {
  error: {
    container: "border-red-500/30 bg-red-500/5 text-red-700 dark:text-red-400",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  success: {
    container:
      "border-green-500/30 bg-green-500/5 text-green-700 dark:text-green-400",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  info: {
    container:
      "border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-400",
    icon: <Info className="h-4 w-4" />,
  },
};

export function AuthNotice({
  messages,
  code,
  variant = "error",
  email,
  status = "idle",
  onResend,
}: AuthNoticeProps) {
  if (!code) return null;

  const message = messages[code] ?? messages.unknown_error;
  const { container, icon } = VARIANT_STYLES[variant];

  return (
    <div className={cn("mb-4 rounded-lg border px-4 py-3 text-sm", container)}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0 opacity-80">{icon}</div>

        <div className="flex-1 space-y-1.5">
          <p className="leading-relaxed">{message}</p>

          {code === "unconfirmed_email" &&
            email &&
            onResend &&
            (status === "sent" ? (
              <p className="text-xs opacity-70">{messages.confirmation_sent}</p>
            ) : (
              <Button
                type="button"
                variant="link"
                size="sm"
                className="px-0 text-sm"
                onClick={onResend}
              >
                {messages.resend_confirmation}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
}
