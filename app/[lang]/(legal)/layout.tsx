// app/[lang]/(legal)/layout.tsx
import { Toaster } from "@/components/ui/sonner";
import LegalLayoutClient from "./layout.client";

export default async function LegalLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <>
      <LegalLayoutClient>{children}</LegalLayoutClient>
      <Toaster richColors toastOptions={{ style: { zIndex: 9999 } }} />
    </>
  );
}
