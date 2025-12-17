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
 * SeedBiologySchema
 *
 * Describes the biological identity and known risk characteristics
 * of a seed lot.
 *
 * IMPORTANT:
 * - This schema does NOT assert pest freedom
 * - It captures declared biology and known associations
 * - Regulatory determinations must be made separately
 *
 * Used by:
 * - Regulatory assessments
 * - Risk scoring engines
 * - Inspection workflows
 */
export const SeedBiologySchema = z.object({
  /**
   * System-assigned unique identifier.
   * Never supplied by external partners.
   */
  id: SafeIdentifier.optional(),

  /**
   * Botanical scientific name as declared by supplier or catalog
   * (free-text, regulator-facing)
   */
  scientificName: ScientificName,

  /**
   * Common or trade name (if applicable)
   * Example: "Tomato", "Bell Pepper"
   */
  commonName: SafeCode.optional(),

  /**
   * Botanical family
   * Example: "Solanaceae"
   */
  family: SafeCode.optional(),

  /**
   * Botanical genus
   * Example: "Solanum"
   */
  genus: SafeCode.optional(),

  /**
   * Whether the species is known to have seed-borne transmission
   * risks for regulated pests or pathogens.
   *
   * This is NOT a declaration of presence.
   */
  seedBorneRiskKnown: BooleanFlag.optional(),

  /**
   * Known or historically associated seed-borne pathogens
   * for this taxon.
   *
   * Examples:
   * - Tomato brown rugose fruit virus (ToBRFV)
   * - Pepino mosaic virus (PepMV)
   *
   * Presence is NOT implied.
   */
  knownPathogens: z.array(SafeCode).optional(),

  /**
   * Whether this species is commonly regulated or restricted
   * in international trade (by destination NPPOs).
   */
  commonlyRegulated: BooleanFlag.optional(),

  /**
   * High-level biological risk classification
   * (used as an input to regulatory assessment, not a final verdict)
   */
  biologicalRiskClass: RiskClass.optional(),

  /**
   * Whether this is a hybrid or open-pollinated plant
   * (relevant for pedigree declarations, not eligibility)
   */
  breedingType: z.enum(["OPEN_POLLINATED", "HYBRID", "UNKNOWN"]).optional(),

  /**
   * Additional biological notes supplied by:
   * - Seed producer
   * - Inspector
   * - Compliance officer
   *
   * Stored verbatim for audit purposes.
   */
  biologyNotes: LongText.optional(),
});
