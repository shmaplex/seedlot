// app/[lang]/(dashboard)/layout.tsx

import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import DashboardClientLayout from "./layout.client";

export default async function DashboardLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const initialUser = await getCurrentUser();
  const { lang } = await params;

  if (!initialUser) {
    redirect(`/${lang}/login`);
  }

  return (
    <>
      <DashboardClientLayout>{children}</DashboardClientLayout>
      <Toaster richColors toastOptions={{ style: { zIndex: 9999 } }} />
    </>
  );
}
