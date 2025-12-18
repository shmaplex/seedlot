import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SeedLotReference } from "@/schemas/seedlot.schema";

interface SeedLotTableProps {
  seedLots: SeedLotReference[];
  loading: boolean;
  dict: any;
  onEdit: (lot: SeedLotReference) => void;
}

/**
 * SeedLotTable
 *
 * Displays all seed lots in a table with status, risk, and actions.
 */
export function SeedLotTable({
  seedLots,
  loading,
  dict,
  onEdit,
}: SeedLotTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>{dict.lotCode}</TableCell>
          <TableCell>{dict.origin}</TableCell>
          <TableCell>{dict.quantity}</TableCell>
          <TableCell>{dict.status}</TableCell>
          <TableCell>{dict.risk}</TableCell>
          <TableCell>{dict.updated}</TableCell>
          <TableCell>{dict.actions}</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={7}>Loading...</TableCell>
          </TableRow>
        ) : seedLots.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7}>No seed lots found</TableCell>
          </TableRow>
        ) : (
          seedLots.map((lot) => (
            <TableRow key={lot.id}>
              <TableCell>{lot.lotCode}</TableCell>
              <TableCell>{lot.originCountry}</TableCell>
              <TableCell>{lot.quantityAvailable || "-"}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    lot.submissionStatus === "PENDING" ? "warning" : "success"
                  }
                >
                  {lot.submissionStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    lot.riskClass === "HIGH" ? "destructive" : "secondary"
                  }
                >
                  {lot.riskClass || "-"}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(lot.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button size="sm" onClick={() => onEdit(lot)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
