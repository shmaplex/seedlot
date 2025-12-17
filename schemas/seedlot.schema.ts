import { z } from "zod";
import { PedigreeStatus, RegulatoryPath, RiskClass, SeedUse } from "./enums";
import {
  BooleanFlag,
  CountryCode,
  DateTimeDefault,
  LongText,
  LotCode,
  PositiveInt,
  SafeCode,
  SafeIdentifier,
} from "./primitives";
import { SeedBiologySchema } from "./seed-biology.schema";

/**
 * SeedLotSchema
 * ------------------------------------------------------------------
 * Canonical representation of a single traceable seed lot.
 *
 * A "seed lot" is defined as a homogeneous quantity of seeds
 * sharing the same biological identity, origin, and handling history.
 *
 * This schema is designed to satisfy and future-proof requirements from:
 * - USDA / APHIS (USA)
 * - CFIA (Canada)
 * - EU Plant Health Regulation (EU 2016/2031)
 * - IPPC / ISPM standards (incl. ISPM 12 ePhyto)
 *
 * IMPORTANT:
 * - This schema represents declared facts + assertions.
 * - Regulatory determinations are stored separately (see RegulatoryAssessment).
 * - Optionality is intentional to allow incomplete upstream supplier data.
 */
export const SeedLotSchema = z.object({
  /**
   * System-assigned unique identifier.
   * Never supplied by external partners.
   */
  id: SafeIdentifier.optional(),

  /**
   * Owning organization (e.g. "shmaplex").
   * Used for RLS enforcement and audit scope.
   */
  orgId: SafeIdentifier,

  /**
   * Supplier or producer responsible for the lot.
   * Required for traceability under all major NPPOs.
   */
  supplierId: SafeIdentifier,

  /**
   * Supplier-provided or internal lot code.
   * Required by APHIS, CFIA, and EU inspections for trace-back.
   * Human- and regulator-facing, so uses SafeCode.
   */
  lotCode: LotCode,

  /**
   * Biological identity of the seed.
   * This is the single most important input for regulatory risk.
   */
  biology: SeedBiologySchema,

  /**
   * Country where the seed was produced (not shipped from).
   * Required by:
   * - APHIS (7 CFR §319)
   * - CFIA D-08-04
   * - EU Plant Health Regulation
   */
  originCountry: CountryCode.default("KR"),

  /**
   * Declared intended use of the seed.
   * Affects eligibility under:
   * - PPQ-587 (US)
   * - Research exemptions (EU/US)
   */
  seedUse: SeedUse.default("HOBBY"),

  /**
   * Certification / pedigree status.
   *
   * NON_PEDIGREED does NOT mean illegal — it simply means
   * the seed is not part of a national certification scheme.
   *
   * This distinction is critical for:
   * - PPQ-587 eligibility
   * - EU marketing directives
   */
  pedigreeStatus: PedigreeStatus.default("NON_PEDIGREED"),

  /**
   * Total available quantity (packets or seeds, depending on unit policy).
   *
   * Quantity is used to:
   * - Validate PPQ-587 small-lot thresholds
   * - Determine bulk vs direct shipping strategy
   */
  quantityAvailable: PositiveInt,

  /**
   * Year the seed was harvested or produced.
   * Optional but strongly recommended for:
   * - EU inspections
   * - Viability / quality disputes
   */
  harvestYear: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear())
    .optional(),

  /**
   * Storage and handling conditions.
   * Often requested during inspections if contamination is suspected.
   * Human- and regulator-facing, so uses SafeCode.
   */
  storageConditions: SafeCode.optional(),

  /**
   * Internal notes not exposed to regulators or customers.
   * May include risk flags, supplier reliability notes, etc.
   */
  internalNotes: LongText.optional(),

  /**
   * --- REGULATORY METADATA (NON-AUTHORITATIVE) ---
   * These fields do NOT replace formal assessments,
   * but allow fast routing and UI decisions.
   */

  /**
   * Last known regulatory path for this seed lot.
   * This is a cached value derived from rule evaluation.
   */
  regulatoryPath: RegulatoryPath.optional(),

  /**
   * Last computed biological/regulatory risk class.
   */
  riskClass: RiskClass.optional(),

  /**
   * Indicates whether this seed lot has known
   * seed-borne quarantine pests or pathogens.
   *
   * Presence does NOT automatically prohibit export,
   * but may require additional declarations or testing.
   */
  knownQuarantineRisk: BooleanFlag.optional(),

  /**
   * --- AUDIT & LIFECYCLE ---
   */

  /**
   * Timestamp when the record was created.
   * System-managed.
   */
  createdAt: DateTimeDefault,

  /**
   * Timestamp when the record was last modified.
   * System-managed.
   */
  updatedAt: DateTimeDefault,
});

/**
 * Schema for creating a new SeedLot.
 * System-managed and derived fields are excluded.
 */
export const SeedLotCreateSchema = SeedLotSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/**
 * Schema for updating an existing SeedLot.
 * Partial updates are allowed to support incremental data intake
 * from suppliers and post-inspection corrections.
 */
export const SeedLotUpdateSchema = SeedLotCreateSchema.partial();
