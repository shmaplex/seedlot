"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { createSeedLot, updateSeedLot } from "@/app/actions/seedlot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { SeedLotCreate, SeedLotReference } from "@/schemas/seedlot.schema";
import {
  createDefaultSeedLotEntry,
  SeedLotCreateSchema,
} from "@/schemas/seedlot.schema";

type SeedLotFormProps = {
  orgId: string;
  supplierId: string;
  seedLot?: SeedLotReference; // optional for editing
  dict: any;
  onSuccess?: (lot: SeedLotReference) => void;
};

type SeedLotFormValues = z.input<typeof SeedLotCreateSchema>;

export default function SeedLotForm({
  orgId,
  supplierId,
  seedLot,
  dict,
  onSuccess,
}: SeedLotFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SeedLotFormValues>({
    resolver: zodResolver(SeedLotCreateSchema),
    defaultValues: seedLot
      ? { ...seedLot } // edit mode
      : createDefaultSeedLotEntry({ orgId, supplierId }), // create mode
  });

  const onSubmit = async (data: SeedLotFormValues) => {
    setError(null);
    setSubmitting(true);

    try {
      const parsed: SeedLotCreate = SeedLotCreateSchema.parse(data);
      let result: SeedLotReference;

      if (seedLot?.id) {
        // Edit mode — pass id as first argument, rest as data
        result = await updateSeedLot(seedLot.id, parsed);
      } else {
        // Create mode
        result = await createSeedLot(parsed);
      }

      setSubmitted(true);
      reset();

      if (onSuccess) onSuccess(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || dict.error);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 bg-card rounded-xl shadow-md text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          {dict.success.title}
        </h2>
        <p className="text-muted-foreground">{dict.success.message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xl p-8 bg-card rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-foreground">{dict.title}</h2>
      <p className="text-muted-foreground text-sm">{dict.description}</p>
      {error && <div className="text-destructive text-sm">{error}</div>}

      {/* Lot Code */}
      <div className="space-y-1">
        <Label htmlFor="lotCode">{dict.form.labels.lotCode}</Label>
        <Input
          id="lotCode"
          {...register("lotCode")}
          placeholder={dict.form.placeholders.lotCode}
        />
        {errors.lotCode && (
          <p className="text-destructive text-sm">{errors.lotCode.message}</p>
        )}
      </div>

      {/* Origin Country */}
      <div className="space-y-1">
        <Label htmlFor="originCountry">{dict.form.labels.originCountry}</Label>
        <Input
          id="originCountry"
          {...register("originCountry")}
          placeholder={dict.form.placeholders.originCountry}
        />
        {errors.originCountry && (
          <p className="text-destructive text-sm">
            {errors.originCountry.message}
          </p>
        )}
      </div>

      {/* Seed Use */}
      <div className="space-y-1">
        <Label htmlFor="seedUse">{dict.form.labels.seedUse}</Label>
        <Select {...register("seedUse")}>
          <SelectTrigger id="seedUse" className="w-full">
            <SelectValue placeholder={dict.form.placeholders.seedUse} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(dict.form.options.seedUse).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label as string}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pedigree Status */}
      <div className="space-y-1">
        <Label htmlFor="pedigreeStatus">
          {dict.form.labels.pedigreeStatus}
        </Label>
        <Select {...register("pedigreeStatus")}>
          <SelectTrigger id="pedigreeStatus" className="w-full">
            <SelectValue placeholder={dict.form.placeholders.pedigreeStatus} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(dict.form.options.pedigreeStatus).map(
              ([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label as string}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Quantity Available */}
      <div className="space-y-1">
        <Label htmlFor="quantityAvailable">
          {dict.form.labels.quantityAvailable}
        </Label>
        <Input
          id="quantityAvailable"
          type="number"
          {...register("quantityAvailable", { valueAsNumber: true })}
          placeholder={dict.form.placeholders.quantityAvailable}
        />
      </div>

      {/* Harvest Year */}
      <div className="space-y-1">
        <Label htmlFor="harvestYear">{dict.form.labels.harvestYear}</Label>
        <Input
          id="harvestYear"
          type="number"
          {...register("harvestYear", { valueAsNumber: true })}
          placeholder={dict.form.placeholders.harvestYear}
        />
      </div>

      {/* Storage Conditions */}
      <div className="space-y-1">
        <Label htmlFor="storageConditions">
          {dict.form.labels.storageConditions}
        </Label>
        <Input
          id="storageConditions"
          {...register("storageConditions")}
          placeholder={dict.form.placeholders.storageConditions}
        />
      </div>

      {/* Biology Section */}
      <h3 className="text-lg font-semibold mt-4">{dict.form.labels.biology}</h3>

      <div className="space-y-1">
        <Label htmlFor="biology.scientificName">
          {dict.form.labels["biology.scientificName"]}
        </Label>
        <Input
          id="biology.scientificName"
          {...register("biology.scientificName")}
          placeholder={dict.form.placeholders["biology.scientificName"]}
        />
        {errors.biology?.scientificName && (
          <p className="text-destructive text-sm">
            {errors.biology.scientificName.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="biology.commonName">
          {dict.form.labels["biology.commonName"]}
        </Label>
        <Input
          id="biology.commonName"
          {...register("biology.commonName")}
          placeholder={dict.form.placeholders["biology.commonName"]}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="biology.biologyNotes">
          {dict.form.labels["biology.biologyNotes"]}
        </Label>
        <Textarea
          id="biology.biologyNotes"
          {...register("biology.biologyNotes")}
          placeholder={dict.form.placeholders["biology.biologyNotes"]}
        />
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "Submitting..." : dict.form.submit}
      </Button>
    </form>
  );
}
