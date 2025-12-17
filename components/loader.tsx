"use client";

interface LoaderProps {
  message?: string;
}

export default function Loader({ message = "Loading..." }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin dark:border-zinc-700 dark:border-t-zinc-50"></div>
      <p className="mt-4 text-gray-700 dark:text-zinc-50">{message}</p>
    </div>
  );
}
