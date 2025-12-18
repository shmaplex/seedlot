"use client";

import { useEffect, useState } from "react";
import { getAllSeedLots } from "@/app/actions/seedlot/read";
import type { SeedLotReference } from "@/schemas/seedlot.schema";
import SeedLotModal from "./components/SeedLotModal";
import SeedLotSummary from "./components/SeedLotSummary";
import SeedLotTable from "./components/SeedLotTable";

interface SeedLotDashboardProps {
  /** Translations dictionary for seedlots page */
  dict: any;
  /** Current organization ID for filtering seed lots */
  orgId: string;
}

/**
 * SeedLotDashboard
 *
 * Main dashboard for managing seed lots:
 * - Displays summary cards for quick metrics.
 * - Shows table of all seed lots with actions.
 * - Allows creating/editing seed lots via modal.
 */
export default function SeedLotDashboard({
  dict,
  orgId,
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
    <div className="space-y-6 p-4">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{dict.title}</h1>
        <button
          className="btn btn-primary"
          onClick={() => setEditingLot({} as SeedLotReference)}
        >
          {dict.actions.create}
        </button>
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
          onClose={() => setEditingLot(null)}
          onSave={(updated) => {
            // Update table after save
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
