import { z } from "zod";
import { RegulatoryPath, RiskClass } from "./enums";
import {
  CountryCode,
  DateTimeDefault,
  LongText,
  SafeCode,
  SafeIdentifier,
} from "./primitives";

/**
 * RegulatoryAssessmentSchema
 *
 * Represents a formal regulatory routing and risk decision
 * for a given seed lot or SKU.
 *
 * This record answers the question:
 * "Why are we shipping this seed using this regulatory pathway?"
 *
 * It is designed to be:
 * - Machine-generated
 * - Human-reviewable
 * - Audit-defensible
 *
 * REQUIRED FOR:
 * - APHIS / CFIA audits
 * - Internal compliance review
 * - Customer-facing explanations
 */
export const RegulatoryAssessmentSchema = z.object({
  /** Seed lot evaluated */
  seedLotId: SafeIdentifier,

  /**
   * Destination country this assessment applies to
   * (decisions vary by importing NPPO)
   */
  destinationCountry: CountryCode,

  /**
   * Selected regulatory pathway
   * (PPQ-587, Phyto, Bulk import, etc.)
   */
  regulatoryPath: RegulatoryPath,

  /**
   * Risk classification for this pathway
   * (used for inspection frequency and routing)
   */
  riskClass: RiskClass,

  /**
   * Human-readable justification for decision
   *
   * Example:
   * "Solanum lycopersicum seeds are excluded from PPQ-587;
   * full phytosanitary certificate required for US import."
   */
  justification: LongText,

  /**
   * Source of regulatory rule or authority
   *
   * Examples:
   * - "USDA APHIS Plants for Planting Manual, Solanaceae"
   * - "CFIA D-08-04"
   * - "EU Reg. 2016/2031"
   */
  ruleSource: SafeCode,

  /**
   * Machine confidence score (0–1)
   *
   * Indicates how confident the system is that
   * the automated decision is correct.
   *
   * Low confidence → human review required.
   */
  confidence: z.number().min(0).max(1).default(0.5),

  /**
   * Whether this assessment was manually reviewed
   * or overridden by a human operator.
   */
  humanReviewed: z.boolean().default(false),

  /**
   * If overridden, explanation for audit trail
   */
  overrideReason: LongText.optional(),

  /**
   * Version of regulatory ruleset used
   * (critical for reproducibility as rules change)
   */
  rulesetVersion: SafeCode.optional(),

  /**
   * Identifier of assessor
   * - "system"
   * - user ID
   * - compliance officer ID
   */
  assessedBy: SafeIdentifier.default("system"),

  /**
   * Date/time of assessment
   */
  assessedAt: DateTimeDefault,

  /**
   * Expiration date for this assessment
   * (regulatory guidance may change)
   */
  validUntil: DateTimeDefault,
});

export const RegulatoryAssessmentCreateSchema = RegulatoryAssessmentSchema;

export const RegulatoryAssessmentUpdateSchema =
  RegulatoryAssessmentSchema.partial();
