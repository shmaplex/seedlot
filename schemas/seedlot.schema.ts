import { z } from "zod";
import {
  PEDIGREE_STATUS,
  PedigreeStatus,
  RegulatoryPath,
  RISK_CLASS,
  RiskClass,
  SEED_LOT_SUBMISSION_STATUS,
  SEED_USE,
  SeedLotSubmissionStatus,
  SeedUse,
} from "./enums";
import {
  BooleanFlag,
  CountryCode,
  DateTimeDefault,
  LongText,
  LotCode,
  PositiveInt,
  SafeIdentifier,
} from "./primitives";
import { SeedBiologyReferenceSchema } from "./seed-biology.schema";

/**
 * Base schema — core SeedLot fields
 */
export const SeedLotBaseSchema = z.object({
  id: SafeIdentifier,
  orgId: SafeIdentifier,
  supplierId: SafeIdentifier,
  lotCode: LotCode,
  biology: SeedBiologyReferenceSchema, // includes biologyNotes now
  originCountry: CountryCode.default("KR"),
  seedUse: SeedUse.default(SEED_USE.HOBBY),
  pedigreeStatus: PedigreeStatus.default(PEDIGREE_STATUS.NON_PEDIGREED),
  quantityAvailable: PositiveInt.optional(),
  harvestYear: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear())
    .optional(),
  storageConditions: z.string().optional(),
  internalNotes: LongText.optional(),
  submissionStatus: SeedLotSubmissionStatus.default(
    SEED_LOT_SUBMISSION_STATUS.PENDING,
  ),
  regulatoryPath: RegulatoryPath.optional(),
  riskClass: RiskClass.optional(),
  knownQuarantineRisk: BooleanFlag.optional(),
  createdAt: DateTimeDefault,
  updatedAt: DateTimeDefault,
});

/**
 * Reference schema — minimal info for embedding elsewhere
 */
export const SeedLotReferenceSchema = SeedLotBaseSchema.pick({
  id: true,
  lotCode: true,
  originCountry: true,
  seedUse: true,
  submissionStatus: true,
});

/**
 * Create schema — for new SeedLot submissions
 */
export const SeedLotCreateSchema = z.object({
  orgId: SafeIdentifier,
  supplierId: SafeIdentifier,
  lotCode: LotCode,
  biology: SeedBiologyReferenceSchema,
  originCountry: CountryCode.default("KR").refine((val) => !!val, {
    message: "Origin country is required",
  }),
  seedUse: SeedUse.default(SEED_USE.HOBBY),
  pedigreeStatus: PedigreeStatus.default(PEDIGREE_STATUS.NON_PEDIGREED),
  // optional fields remain optional
  quantityAvailable: PositiveInt.optional(),
  harvestYear: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear())
    .optional(),
  storageConditions: z.string().optional(),
  internalNotes: LongText.optional(),
  submissionStatus: SeedLotSubmissionStatus.default(
    SEED_LOT_SUBMISSION_STATUS.PENDING,
  ),
  regulatoryPath: RegulatoryPath.optional(),
  riskClass: RiskClass.optional(),
  knownQuarantineRisk: BooleanFlag.optional(),
});

/**
 * Update schema — partial updates allowed
 */
export const SeedLotUpdateSchema = SeedLotCreateSchema.partial();

/**
 * Detailed schema — internal/admin view with all fields
 */
export const SeedLotDetailedSchema = SeedLotBaseSchema.extend({
  archivedAt: z.date().optional(),
  archivedById: SafeIdentifier.optional(),
  createdById: SafeIdentifier.optional(),
  updatedById: SafeIdentifier.optional(),
});

/**
 * Helper: create default form entry for SeedLotCreate
 */
export const createDefaultSeedLotEntry = (params: {
  orgId: string;
  supplierId: string;
}): z.input<typeof SeedLotCreateSchema> => ({
  orgId: params.orgId,
  supplierId: params.supplierId,
  lotCode: "",
  biology: { id: "", scientificName: "", commonName: "", biologyNotes: "" },
  originCountry: "KR",
  seedUse: SEED_USE.HOBBY,
  pedigreeStatus: PEDIGREE_STATUS.NON_PEDIGREED,
  submissionStatus: SEED_LOT_SUBMISSION_STATUS.PENDING,
  quantityAvailable: undefined,
  harvestYear: undefined,
  storageConditions: "",
  internalNotes: "",
  regulatoryPath: undefined,
  riskClass: undefined,
  knownQuarantineRisk: undefined,
});

/** TypeScript types derived from Zod schemas */
export type SeedLotBase = z.infer<typeof SeedLotBaseSchema>;
export type SeedLotReference = z.infer<typeof SeedLotReferenceSchema>;
export type SeedLotCreate = z.infer<typeof SeedLotCreateSchema>;
export type SeedLotUpdate = z.infer<typeof SeedLotUpdateSchema>;
export type SeedLotDetailed = z.infer<typeof SeedLotDetailedSchema>;
