"use client";

import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/custom/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/providers/UserProvider";

/**
 * Compact and modern user button with dropdown
 * Uses just the Avatar component without extra borders
 */
export function UserButton() {
  const { user, logout } = useUser();
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
  const [fallbackName, setFallbackName] = useState<string>("User");

  useEffect(() => {
    if (!user) return;

    const nameFallback = user.fullName || user.email || "User";
    setFallbackName(nameFallback);

    const dicebearUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.id}`;
    setAvatarSrc(user.avatarUrl || dicebearUrl);
  }, [user]);

  const handleSignOut = () => {
    logout();
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar
          size="sm"
          src={avatarSrc}
          fallback={fallbackName.slice(0, 2).toUpperCase()}
          className="cursor-pointer transition-shadow hover:shadow-md"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <a href="/dashboard">Dashboard</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/profile">Profile</a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
