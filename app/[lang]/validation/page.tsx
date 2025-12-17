// app/[lang]/validation/page.tsx
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ValidationTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Seed Lot</TableHead>
          <TableHead>Field</TableHead>
          <TableHead>Error</TableHead>
          <TableHead>Severity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>LOT-2025-001</TableCell>
          <TableCell>Germination Rate</TableCell>
          <TableCell>Value exceeds allowed range</TableCell>
          <TableCell>
            <Badge variant="destructive">High</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
