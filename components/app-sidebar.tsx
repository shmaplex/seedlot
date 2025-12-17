"use client";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { HeaderLogo } from "@/components/ui/custom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar({
  currentPath,
  navItems,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  currentPath: string;
  navItems: {
    main: Array<{ title: string; url: string; icon?: any }>;
    secondary: Array<{ title: string; url: string; icon?: any }>;
    documents: Array<{ title: string; url: string; icon?: any }>;
  };
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* ---------- Header ---------- */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <HeaderLogo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ---------- Main Content ---------- */}
      <SidebarContent>
        <NavMain items={navItems.main} currentPath={currentPath} />

        {navItems.documents.length > 0 && (
          <div className="mt-4">
            <NavMain items={navItems.documents} currentPath={currentPath} />
          </div>
        )}

        <NavSecondary
          items={navItems.secondary}
          currentPath={currentPath}
          className="mt-auto"
        />
      </SidebarContent>

      {/* ---------- Footer ---------- */}
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
