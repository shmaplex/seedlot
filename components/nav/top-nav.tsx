// components/nav/top-nav.tsx
import { Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopNav() {
  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <div className="text-sm font-semibold">Seedlot</div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Globe className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
