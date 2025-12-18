import { z } from "zod";
import { RiskClass, SeedUse } from "./enums";
import {
  BooleanFlag,
  DateTimeDefault,
  LongText,
  PositiveInt,
  SafeCode,
  SafeIdentifier,
} from "./primitives";

/**
 * Base schema — core PPQ-587 compliance fields
 */
export const PPQ587ComplianceBaseSchema = z.object({
  seedLotId: SafeIdentifier,
  eligible: BooleanFlag,
  exclusionReason: LongText.optional(),
  permitNumber: SafeCode.optional(),
  seedUse: SeedUse.default("HOBBY"),
  nonPedigreedDeclared: BooleanFlag,
  packetSeedCount: PositiveInt.optional(),
  maxAllowedSeedCount: PositiveInt.optional(),
  quantityWithinLimit: BooleanFlag.optional(),
  riskClass: RiskClass.default("UNKNOWN"),
  labelVerified: BooleanFlag.default(false),
  evaluatedAt: DateTimeDefault.optional(),
  evaluatedBy: SafeIdentifier.optional(),
  auditNotes: LongText.optional(),
});

/**
 * Reference schema — minimal info for embedding elsewhere
 */
export const PPQ587ComplianceReferenceSchema = PPQ587ComplianceBaseSchema.pick({
  seedLotId: true,
  eligible: true,
  riskClass: true,
  labelVerified: true,
});

/**
 * Create schema — for recording a new compliance evaluation
 */
export const PPQ587ComplianceCreateSchema = PPQ587ComplianceBaseSchema;

/**
 * Update schema — partial updates allowed
 */
export const PPQ587ComplianceUpdateSchema =
  PPQ587ComplianceBaseSchema.partial();

/**
 * Detailed schema — internal/admin view with all fields
 */
export const PPQ587ComplianceDetailedSchema = PPQ587ComplianceBaseSchema.extend(
  {},
);

/** TypeScript types derived from Zod schemas */
export type PPQ587ComplianceBase = z.infer<typeof PPQ587ComplianceBaseSchema>;
export type PPQ587ComplianceReference = z.infer<
  typeof PPQ587ComplianceReferenceSchema
>;
export type PPQ587ComplianceCreate = z.infer<
  typeof PPQ587ComplianceCreateSchema
>;
export type PPQ587ComplianceUpdate = z.infer<
  typeof PPQ587ComplianceUpdateSchema
>;
export type PPQ587ComplianceDetailed = z.infer<
  typeof PPQ587ComplianceDetailedSchema
>;
