// components/nav/breadcrumbs.tsx
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: string[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground">
      {items.map((item, i) => (
        <span key={i as any} className="flex items-center gap-1">
          {item}
          {i < items.length - 1 && <ChevronRight className="h-3 w-3" />}
        </span>
      ))}
    </nav>
  );
}
