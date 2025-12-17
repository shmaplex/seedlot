"use client";

import {
  IconDotsVertical,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUser } from "@/providers/UserProvider";

export function NavUser() {
  const { user, logout } = useUser();
  const { isMobile } = useSidebar();

  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
  const [fallbackName, setFallbackName] = useState("User");

  // Point to the "userMenu" namespace in your dictionaries
  const t = useTranslations("userMenu");

  useEffect(() => {
    if (!user) return;

    const nameFallback = user?.user_metadata?.fullName || user.email || "User";
    setFallbackName(nameFallback);

    const dicebearUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.id}`;
    setAvatarSrc(user?.user_metadata?.avatarUrl || dicebearUrl);
  }, [user]);

  const handleSignOut = async () => {
    await logout();
  };

  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-muted/20 transition data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage
                  src={avatarSrc}
                  alt={user?.user_metadata?.fullName || user.email}
                />
                <AvatarFallback className="rounded-lg">
                  {fallbackName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{fallbackName}</span>
                <span className="text-xs text-muted-foreground truncate">
                  {user.email}
                </span>
              </div>

              <IconDotsVertical className="ml-auto" size={18} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
            className="w-56 rounded-lg"
          >
            {/* User info */}
            <DropdownMenuLabel className="p-3 font-normal">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={avatarSrc}
                    alt={user?.user_metadata?.fullName || user.email}
                  />
                  <AvatarFallback className="rounded-lg">
                    {fallbackName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{fallbackName}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* Menu items */}
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href="/account"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-md hover:bg-muted/10"
                >
                  <IconUserCircle size={18} /> {t("account")}
                </Link>
              </DropdownMenuItem>
              {/* You can add billing/notifications here if needed */}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex items-center gap-2 px-3 py-2.5 rounded-md hover:bg-red-50 text-red-600"
              onClick={handleSignOut}
            >
              <IconLogout size={18} /> {t("logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
