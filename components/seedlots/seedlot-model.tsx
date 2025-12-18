import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SeedLotReference } from "@/schemas/seedlot.schema";
import SeedLotForm from "../forms/seedlot-form";

interface SeedLotModalProps {
  /** Optional seed lot to edit; if not provided, modal will create new */
  seedLot?: SeedLotReference;
  /** Organization ID for new seed lot creation */
  orgId: string;
  /** Supplier ID for new seed lot creation */
  supplierId: string;
  dict: any;
  onClose: () => void;
  onSave: (lot: SeedLotReference) => void;
}

export function SeedLotModal({
  seedLot,
  orgId,
  supplierId,
  dict,
  onClose,
  onSave,
}: SeedLotModalProps) {
  // const [formData, setFormData] = useState<Partial<SeedLot>>(() => ({
  //   orgId, // from props
  //   supplierId, // from props
  //   lotCode: "",
  //   originCountry: "",
  //   quantityAvailable: 0,
  //   harvestYear: new Date().getFullYear(),
  // }));

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl w-full p-6">
        <DialogHeader>
          <DialogTitle>
            {seedLot?.id ? dict.editTitle : dict.createTitle}
          </DialogTitle>
        </DialogHeader>

        <SeedLotForm
          orgId={orgId}
          supplierId={supplierId}
          seedLot={seedLot} // Pass seedLot for editing
          dict={dict}
          onSuccess={onSave} // call onSave after creation/edit
        />

        <Button className="mt-4 w-full" onClick={onClose}>
          {dict.close}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
