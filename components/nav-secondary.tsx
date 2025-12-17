"use client";

import type { Icon } from "@tabler/icons-react";
import Link from "next/link";
import type * as React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface NavSecondaryItem {
  title: string;
  url: string;
  icon?: Icon;
  comingSoon?: boolean;
}

interface NavSecondaryProps
  extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: NavSecondaryItem[];
  currentPath?: string;
}

export function NavSecondary({
  items,
  currentPath,
  ...props
}: NavSecondaryProps) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={currentPath === item.url}
                tooltip={item.comingSoon ? "Coming Soon" : undefined}
              >
                {item.comingSoon ? (
                  <span className="flex items-center justify-between opacity-50 cursor-not-allowed">
                    <span className="flex items-center gap-2">
                      {item?.icon && <item.icon className="w-4 h-4" />}
                      {item.title}
                    </span>
                    <span className="ml-2 text-xs font-medium text-muted-foreground">
                      Coming Soon
                    </span>
                  </span>
                ) : (
                  <Link href={item.url} className="flex items-center gap-2">
                    {item?.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.title}</span>
                  </Link>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
