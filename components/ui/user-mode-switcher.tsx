"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SegmentedControl } from "@/components/ui/custom/segmented-control";

const modes = ["exporter", "supplier", "internal", "inspector", "importer"];

export function UserModeSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentMode = pathname.split("/")[3] || "exporter"; // crude fallback
  const [mode, setMode] = useState(currentMode);

  const handleChange = (value: string) => {
    setMode(value);
    router.push(`/${currentLang}/dashboard/${value}`);
  };

  return (
    <SegmentedControl
      value={mode}
      onValueChange={handleChange}
      options={modes.map((m) => ({
        label: m.charAt(0).toUpperCase() + m.slice(1),
        value: m,
      }))}
    />
  );
}
