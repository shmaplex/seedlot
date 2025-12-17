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
 * PPQ587ComplianceSchema
 *
 * Represents USDA APHIS PPQ-587 (Small Lots of Seed) compliance
 * evaluation for a specific seed lot or SKU.
 *
 * LEGAL CONTEXT:
 * - Applies only to non-pedigreed seed for planting
 * - Only eligible taxa may use PPQ-587
 * - Explicitly excluded species MUST use a phytosanitary certificate
 *   or bulk import path
 *
 * This schema is used to:
 * - Determine eligibility
 * - Generate compliant labels
 * - Explain exclusions
 * - Support audit & enforcement
 */
export const PPQ587ComplianceSchema = z.object({
  /** Seed lot evaluated */
  seedLotId: SafeIdentifier,

  /**
   * Final eligibility determination
   */
  eligible: BooleanFlag,

  /**
   * Reason for ineligibility (required if eligible = false)
   * Example:
   * - "Tomato seeds (Solanum lycopersicum) excluded under PPQ-587"
   * - "Pedigreed seed not eligible"
   */
  exclusionReason: LongText.optional(),

  /**
   * APHIS-issued PPQ-587 permit number
   * Must be present on package labeling
   */
  permitNumber: SafeCode.optional(),

  /**
   * Declared seed use under permit
   * Must match permit scope
   */
  seedUse: SeedUse.default("HOBBY"),

  /**
   * Confirmation that seed is NON-pedigreed
   * Required by PPQ-587
   */
  nonPedigreedDeclared: BooleanFlag,

  /**
   * Quantity per packet (APHIS limit enforcement)
   * Most common: ≤50 seeds or ≤10g depending on species
   */
  packetSeedCount: PositiveInt.optional(),

  /**
   * Maximum allowed quantity under PPQ-587 for this taxon
   * Derived from APHIS tables
   */
  maxAllowedSeedCount: PositiveInt.optional(),

  /**
   * Whether quantity is within permitted limit
   */
  quantityWithinLimit: BooleanFlag.optional(),

  /**
   * Taxonomic risk classification
   * Used internally to flag higher-risk shipments
   */
  riskClass: RiskClass.default("UNKNOWN"),

  /**
   * Whether required labeling elements have been verified:
   * - Botanical name
   * - Country of origin
   * - "Small lots of seed"
   * - Permit number
   */
  labelVerified: BooleanFlag.default(false),

  /**
   * Date of most recent compliance evaluation
   */
  evaluatedAt: DateTimeDefault.optional(),

  /**
   * Evaluator (system, user, or regulatory logic version)
   */
  evaluatedBy: SafeIdentifier.optional(),

  /**
   * Audit notes (internal only)
   */
  auditNotes: LongText.optional(),
});

export const PPQ587ComplianceCreateSchema = PPQ587ComplianceSchema;

export const PPQ587ComplianceUpdateSchema = PPQ587ComplianceSchema.partial();
