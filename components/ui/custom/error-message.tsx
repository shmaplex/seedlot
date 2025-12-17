// apps/web/components/ui/custom/error-message.tsx
"use client";

interface ErrorMessageProps {
  title?: string;
  message: string;
}

export function ErrorMessage({ title, message }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title || "Something went wrong"}
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{message}</p>
    </div>
  );
}
