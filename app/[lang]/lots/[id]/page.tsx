// app/[lang]/lots/[id]/page.tsx

import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SeedLotDetail() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>LOT-2025-001</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div>Origin: Korea</div>
          <div>Purity: 98%</div>
          <div>Germination: 92%</div>
          <div>Imported: 2025-01-10</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <CardTitle>Validation Issues</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          Germination rate missing test date
        </CardContent>
      </Card>
    </div>
  );
}
