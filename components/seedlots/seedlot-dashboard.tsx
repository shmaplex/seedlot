"use client";

import { useEffect, useState } from "react";
import { getAllSeedLots } from "@/app/actions/seedlot/read";
import { Button } from "@/components/ui/button";
import type { SeedLotReference } from "@/schemas/seedlot.schema";
import { SeedLotModal, SeedLotSummary, SeedLotTable } from ".";

interface SeedLotDashboardProps {
  dict: any;
  orgId: string;
  supplierId: string;
}

/**
 * SeedLotDashboard
 *
 * Main dashboard for managing seed lots:
 * - Displays summary cards for quick metrics.
 * - Shows table of all seed lots with actions.
 * - Allows creating/editing seed lots via modal.
 */
export function SeedLotDashboard({
  dict,
  orgId,
  supplierId,
}: SeedLotDashboardProps) {
  const [seedLots, setSeedLots] = useState<SeedLotReference[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLot, setEditingLot] = useState<SeedLotReference | null>(null);

  /** Load all seed lots for the current org */
  useEffect(() => {
    async function fetchSeedLots() {
      setLoading(true);
      try {
        const lots = await getAllSeedLots(orgId);
        setSeedLots(lots || []);
      } catch (err) {
        console.error("Error fetching seed lots:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSeedLots();
  }, [orgId]);

  return (
    <div className="space-y-6 p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{dict.title}</h1>
        <Button
          variant="default"
          onClick={() => setEditingLot({} as SeedLotReference)}
        >
          {dict.actions.create}
        </Button>
      </div>

      {/* Summary Metrics */}
      <SeedLotSummary seedLots={seedLots} dict={dict.summary} />

      {/* Seed Lots Table */}
      <SeedLotTable
        seedLots={seedLots}
        loading={loading}
        dict={dict.table}
        onEdit={setEditingLot}
      />

      {/* Modal for Create/Edit */}
      {editingLot && (
        <SeedLotModal
          seedLot={editingLot}
          dict={dict.form}
          orgId={orgId}
          supplierId={supplierId}
          onClose={() => setEditingLot(null)}
          onSave={(updated) => {
            const idx = seedLots.findIndex((l) => l.id === updated.id);
            if (idx >= 0) {
              const newLots = [...seedLots];
              newLots[idx] = updated;
              setSeedLots(newLots);
            } else {
              setSeedLots([updated, ...seedLots]);
            }
            setEditingLot(null);
          }}
        />
      )}
    </div>
  );
}
