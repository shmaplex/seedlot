// app/(dashboard)/layout.client.tsx
"use client";
import { usePathname } from "next/navigation";
import { Providers } from "@/app/providers";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { navConfig } from "@/data/nav";
import type { UserRole } from "@/schemas/enums";

interface DashboardClientLayoutProps {
  children: React.ReactNode;
  role?: UserRole;
}

export default function DashboardClientLayout({
  children,
  role = "EXPORTER",
}: DashboardClientLayoutProps) {
  const pathname = usePathname();

  const nav = navConfig[role.toLowerCase() as keyof typeof navConfig];

  const allNavItems = [
    ...nav.main,
    ...nav.secondary,
    ...nav.documents.map((d) => ({ title: d.title, url: d.url })),
  ];

  const currentTitle =
    allNavItems.find((item) => item.url === pathname)?.title ?? "Dashboard";

  return (
    <Providers>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" currentPath={pathname} navItems={nav} />
        <SidebarInset>
          <SiteHeader title={currentTitle} />
          <main className="flex flex-1 flex-col overflow-auto">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {children}
              </div>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </Providers>
  );
}
