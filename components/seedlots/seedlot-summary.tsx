import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SeedLotReference } from "@/schemas/seedlot.schema";

interface SeedLotSummaryProps {
  /** Array of seed lots to summarize */
  seedLots: SeedLotReference[];
  /** Dictionary for labels */
  dict: { total: string; pending: string; highRisk: string; ready: string };
}

/**
 * SeedLotSummary
 *
 * Displays quick summary cards for seed lot counts:
 * - Total Seed Lots
 * - Pending Validation
 * - High Risk
 * - Ready for Export
 */
export function SeedLotSummary({ seedLots, dict }: SeedLotSummaryProps) {
  const total = seedLots.length;
  const pending = seedLots.filter(
    (l) => l.submissionStatus === "PENDING",
  ).length;
  const highRisk = seedLots.filter((l) => l.riskClass === "HIGH").length;
  const ready = seedLots.filter(
    (l) => l.submissionStatus === "APPROVED",
  ).length;

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{dict.total}</CardTitle>
        </CardHeader>
        <CardContent>{total}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{dict.pending}</CardTitle>
        </CardHeader>
        <CardContent>{pending}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{dict.highRisk}</CardTitle>
        </CardHeader>
        <CardContent>{highRisk}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{dict.ready}</CardTitle>
        </CardHeader>
        <CardContent>{ready}</CardContent>
      </Card>
    </div>
  );
}
