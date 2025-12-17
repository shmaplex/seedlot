import { z } from "zod";

/**
 * RegulatoryPath
 * ------------------------------------------------------------------
 * Describes the high-level regulatory pathway required to legally
 * export and import a given seed lot into a destination country.
 *
 * This enum does NOT assert legality by itself — it represents the
 * outcome of a regulatory assessment based on biological risk,
 * destination country rules, and shipment context.
 *
 * Primary references:
 * - USDA APHIS PPQ (7 CFR §319)
 * - APHIS PPQ-587 Small Lots of Seed Permit
 * - CFIA D-08-04 (Canada)
 * - EU Plant Health Regulation (EU) 2016/2031
 * - IPPC / ISPM standards
 */
export const RegulatoryPath = z.enum([
  /**
   * Eligible for import under the USDA APHIS PPQ-587
   * Small Lots of Seed permit program.
   *
   * Characteristics:
   * - Very small quantities
   * - Limited number of packets per taxon
   * - Explicitly excluded taxa may still require phytosanitary certificates
   *
   * IMPORTANT:
   * - Eligibility is taxon-specific, not volume-based alone.
   * - Misclassification here is a common compliance failure.
   */
  "PPQ_587_SMALL_LOT",

  /**
   * Requires a phytosanitary certificate issued by the exporting
   * country’s National Plant Protection Organization (NPPO).
   *
   * Used when:
   * - Taxon is excluded from small-lot exemptions
   * - Destination country requires formal inspection
   * - Seed is considered higher biological risk
   *
   * Applies broadly across:
   * - United States
   * - Canada
   * - EU Member States (France, Germany, etc.)
   */
  "PHYTOSANITARY_REQUIRED",

  /**
   * Intended for high-volume or high-risk seed lots
   * imported in bulk, cleared once, and then fulfilled
   * domestically within the destination country.
   *
   * Common strategy for:
   * - Tomato, pepper, cereal crops
   * - Commercial-scale distribution
   *
   * Reduces per-order regulatory friction at scale.
   */
  "BULK_IMPORT_DOMESTIC_FULFILLMENT",

  /**
   * Export or import is not permitted under current
   * regulations for the specified destination.
   *
   * Reasons may include:
   * - Absolute quarantine prohibitions
   * - Sanctions or embargoes
   * - Missing or invalid phytosanitary pathways
   */
  "EXPORT_PROHIBITED",
]);

/**
 * RiskClass
 * ------------------------------------------------------------------
 * Represents a normalized biological and regulatory risk level
 * assigned to a seed lot based on taxonomy, known pests/pathogens,
 * and destination-specific rules.
 *
 * This value is typically computed by a rules engine and may change
 * as regulations or scientific knowledge evolve.
 */
export const RiskClass = z.enum([
  /**
   * Low likelihood of introducing quarantine pests or diseases.
   * Typically applies to:
   * - Ornamentals
   * - Non-host species
   * - Historically unrestricted taxa
   */
  "LOW",

  /**
   * Moderate risk requiring careful review.
   * Often applies to:
   * - Common garden crops
   * - Taxa with known regional pathogens
   */
  "MEDIUM",

  /**
   * High biological or economic risk.
   * Commonly applies to:
   * - Major agricultural crops
   * - Taxa with seed-borne quarantine pests
   */
  "HIGH",

  /**
   * Insufficient information to classify risk.
   *
   * IMPORTANT:
   * - UNKNOWN should default to conservative handling
   *   (e.g. phytosanitary required).
   */
  "UNKNOWN",
]);

/**
 * SeedUse
 * ------------------------------------------------------------------
 * Declares the intended end-use of the seed as stated by the importer.
 *
 * This affects eligibility under various exemptions and determines
 * which regulatory pathways may apply.
 */
export const SeedUse = z.enum([
  /**
   * Non-commercial, personal, or hobby use.
   * Commonly used for:
   * - Home gardeners
   * - Educational kits
   *
   * NOTE:
   * - Hobby use does NOT automatically exempt seeds
   *   from phytosanitary requirements.
   */
  "HOBBY",

  /**
   * Scientific or institutional research use.
   *
   * May qualify for special permits or exemptions
   * depending on destination country.
   */
  "RESEARCH",

  /**
   * Commercial propagation or resale.
   *
   * Typically subject to:
   * - Stricter inspections
   * - Certification requirements
   * - Bulk import controls
   */
  "COMMERCIAL",
]);

/**
 * PedigreeStatus
 * ------------------------------------------------------------------
 * Describes whether the seed lot is part of a formal seed
   certification or pedigree system.
 *
 * This affects:
 * - Eligibility under small-lot programs
 * - Marketing and labeling rules (EU, Canada)
 */
export const PedigreeStatus = z.enum([
  /**
   * Seed is not certified under a national or international
   * pedigree or certification scheme.
   *
   * This is common for:
   * - Hobby seeds
   * - Heirloom varieties
   *
   * NON_PEDIGREED does NOT imply non-compliance.
   */
  "NON_PEDIGREED",

  /**
   * Seed is certified under an official scheme
   * (e.g. OECD, national certification programs).
   */
  "CERTIFIED",

  /**
   * Pedigree status is unknown or not yet verified.
   *
   * Should trigger cautious regulatory handling.
   */
  "UNKNOWN",
]);

/**
 * InspectionStatus
 * ------------------------------------------------------------------
 * Represents the outcome or current state of an official
 * phytosanitary or regulatory inspection.
 *
 * Applies to:
 * - NPPO inspections
 * - Pre-export checks
 * - Conditional releases
 */
export const InspectionStatus = z.enum([
  /**
   * Inspection has been requested but not yet completed.
   */
  "PENDING",

  /**
   * Inspection completed successfully with no findings.
   */
  "PASSED",

  /**
   * Inspection completed with findings that prevent
   * export or import.
   */
  "FAILED",

  /**
   * Inspection completed with conditions attached.
   *
   * Conditions may include:
   * - Additional testing
   * - Restricted distribution
   * - Post-entry quarantine
   */
  "CONDITIONAL",
]);
