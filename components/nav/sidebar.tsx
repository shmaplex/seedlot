// components/nav/sidebar.tsx
import { AlertTriangle, LayoutDashboard, Leaf, Upload } from "lucide-react";

const items = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Leaf, label: "Seed Lots", href: "/lots" },
  { icon: Upload, label: "Imports", href: "/imports" },
  { icon: AlertTriangle, label: "Validation", href: "/validation" },
];

export function Sidebar() {
  return (
    <aside className="w-56 border-r p-2">
      <nav className="space-y-1">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
          >
            <Icon className="h-4 w-4" />
            {label}
          </div>
        ))}
      </nav>
    </aside>
  );
}
