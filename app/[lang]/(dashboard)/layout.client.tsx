"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Providers } from "@/app/providers";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UserModeSwitcher } from "@/components/ui/user-mode-switcher";
import { navConfig } from "@/data/nav";
import type { UserRole } from "@/schemas/enums";

interface DashboardClientLayoutProps {
  children: React.ReactNode;
  lang?: string;
  role?: UserRole;
}

export default function DashboardClientLayout({
  children,
  role = "EXPORTER",
  lang = "en",
}: DashboardClientLayoutProps) {
  const pathname = usePathname();

  // Mode state based on URL or default role
  const initialMode =
    pathname.split("/")[3]?.toLowerCase() || role.toLowerCase();
  const [mode, setMode] = useState(initialMode);

  // Update nav whenever mode changes
  const nav = navConfig[mode as keyof typeof navConfig];

  const prefixLang = (url: string) => `/${lang}${url}`;

  const allNavItems = [
    ...nav.main.map((item) => ({ ...item, url: prefixLang(item.url) })),
    ...nav.secondary.map((item) => ({ ...item, url: prefixLang(item.url) })),
    ...nav.documents.map((item) => ({ ...item, url: prefixLang(item.url) })),
  ];

  const currentTitle =
    allNavItems.find((item) => item.url === pathname)?.title ?? "Dashboard";

  // Keep mode in sync if URL changes externally
  useEffect(() => {
    const urlMode = pathname.split("/")[3]?.toLowerCase();
    if (urlMode && urlMode !== mode) setMode(urlMode);
  }, [mode, pathname]);

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
        <AppSidebar
          variant="inset"
          currentPath={pathname}
          navItems={{
            main: nav.main.map((i) => ({ ...i, url: prefixLang(i.url) })),
            secondary: nav.secondary.map((i) => ({
              ...i,
              url: prefixLang(i.url),
            })),
            documents: nav.documents.map((i) => ({
              ...i,
              url: prefixLang(i.url),
            })),
          }}
        />
        <SidebarInset>
          <SiteHeader
            title={currentTitle} // just the string
            currentLang={lang}
            showModeSwitcher={true} // optional, default is true
          />
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
