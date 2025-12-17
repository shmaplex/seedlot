// app/[lang]/(dashboard)/layout.tsx

import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { UserRole } from "@/lib/generated/prisma/enums";
import DashboardClientLayout from "./layout.client";

export default async function DashboardLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const initialUser = await getCurrentUser();
  const initialProfile = await getCurrentUserProfile();
  const { lang } = await params;

  if (!initialUser) {
    redirect(`/${lang}/login`);
  }

  return (
    <>
      <DashboardClientLayout role={initialProfile?.role ?? UserRole.EXPORTER}>
        {children}
      </DashboardClientLayout>
      <Toaster richColors toastOptions={{ style: { zIndex: 9999 } }} />
    </>
  );
}
