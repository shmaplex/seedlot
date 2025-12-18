// schemas/seed-biology.schema.ts
import { z } from "zod";
import { RiskClass } from "./enums";
import {
  BooleanFlag,
  LongText,
  SafeCode,
  SafeIdentifier,
  ScientificName,
} from "./primitives";

/**
 * Base schema — core SeedBiology fields
 */
export const SeedBiologyBaseSchema = z.object({
  id: SafeIdentifier,
  scientificName: ScientificName,
  commonName: SafeCode.optional(),
  family: SafeCode.optional(),
  genus: SafeCode.optional(),
  seedBorneRiskKnown: BooleanFlag.optional(),
  knownPathogens: z.array(z.string()).optional(),
  commonlyRegulated: BooleanFlag.optional(),
  biologicalRiskClass: RiskClass.optional(),
  breedingType: z.string().optional(),
  biologyNotes: LongText.optional(),
});

/**
 * Reference schema — minimal info for embedding elsewhere
 */
export const SeedBiologyReferenceSchema = SeedBiologyBaseSchema.pick({
  id: true,
  scientificName: true,
  commonName: true,
  biologyNotes: true,
});

/**
 * Create schema — for new SeedBiology submissions
 */
export const SeedBiologyCreateSchema = SeedBiologyBaseSchema.omit({ id: true });

/**
 * Update schema — partial updates allowed
 */
export const SeedBiologyUpdateSchema = SeedBiologyCreateSchema.partial();

/**
 * Detailed schema — internal/admin view with all fields
 */
export const SeedBiologyDetailedSchema = SeedBiologyBaseSchema.extend({});

/** TypeScript types derived from Zod schemas */
export type SeedBiologyBase = z.infer<typeof SeedBiologyBaseSchema>;
export type SeedBiologyReference = z.infer<typeof SeedBiologyReferenceSchema>;
export type SeedBiologyCreate = z.infer<typeof SeedBiologyCreateSchema>;
export type SeedBiologyUpdate = z.infer<typeof SeedBiologyUpdateSchema>;
export type SeedBiologyDetailed = z.infer<typeof SeedBiologyDetailedSchema>;
