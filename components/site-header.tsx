"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserModeSwitcher } from "@/components/ui/user-mode-switcher";

interface SiteHeaderProps {
  title?: string | React.ReactNode;
  showGitHub?: boolean;
  showModeSwitcher?: boolean;
  gitHubUrl?: string;
  currentLang?: string;
}

export function SiteHeader({
  title = "Dashboard",
  showGitHub = true,
  showModeSwitcher = true,
  gitHubUrl = "https://github.com/shmaplex/seedlot",
  currentLang = "en",
}: SiteHeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center border-b bg-background text-foreground px-4 lg:px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      {/* Left: Sidebar trigger + title */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-base font-medium">{title}</h1>
      </div>

      {/* Center: Mode switcher */}
      {showModeSwitcher && (
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <UserModeSwitcher currentLang={currentLang} />
        </div>
      )}

      {/* Right: GitHub link */}
      {showGitHub && (
        <div className="ml-auto">
          <a
            href={gitHubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block rounded px-2 py-1 text-sm font-medium text-primary hover:bg-muted transition-colors text-left"
          >
            GitHub
          </a>
        </div>
      )}
    </header>
  );
}
