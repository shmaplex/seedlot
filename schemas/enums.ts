import { z } from "zod";

/* -----------------------------
 * USER / AUTH
 * ----------------------------- */

/**
 * Roles a user can have in the system.
 */
export const UserRole = z.enum([
  "EXPORTER",
  "SUPPLIER",
  "INSPECTOR",
  "INTERNAL",
  "IMPORTER",
]);

/** TS-friendly constants for code usage */
export const USER_ROLE = {
  EXPORTER: "EXPORTER",
  SUPPLIER: "SUPPLIER",
  INSPECTOR: "INSPECTOR",
  INTERNAL: "INTERNAL",
  IMPORTER: "IMPORTER",
} as const;

export type UserRole = z.infer<typeof UserRole>;

/* -----------------------------
 * REGULATORY
 * ----------------------------- */

/** Possible regulatory paths for a seed lot */
export const RegulatoryPath = z.enum([
  "PPQ_587_SMALL_LOT",
  "PHYTOSANITARY_REQUIRED",
  "BULK_IMPORT_DOMESTIC_FULFILLMENT",
  "EXPORT_PROHIBITED",
]);

export const REGULATORY_PATH = {
  PPQ_587_SMALL_LOT: "PPQ_587_SMALL_LOT",
  PHYTOSANITARY_REQUIRED: "PHYTOSANITARY_REQUIRED",
  BULK_IMPORT_DOMESTIC_FULFILLMENT: "BULK_IMPORT_DOMESTIC_FULFILLMENT",
  EXPORT_PROHIBITED: "EXPORT_PROHIBITED",
} as const;

export type RegulatoryPath = z.infer<typeof RegulatoryPath>;

/** Risk classification for seeds */
export const RiskClass = z.enum(["LOW", "MEDIUM", "HIGH", "UNKNOWN"]);

export const RISK_CLASS = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  UNKNOWN: "UNKNOWN",
} as const;

export type RiskClass = z.infer<typeof RiskClass>;

/** Declared use of seeds */
export const SeedUse = z.enum(["HOBBY", "RESEARCH", "COMMERCIAL"]);

export const SEED_USE = {
  HOBBY: "HOBBY",
  RESEARCH: "RESEARCH",
  COMMERCIAL: "COMMERCIAL",
} as const;

export type SeedUse = z.infer<typeof SeedUse>;

/** Certification / pedigree status */
export const PedigreeStatus = z.enum(["NON_PEDIGREED", "CERTIFIED", "UNKNOWN"]);

export const PEDIGREE_STATUS = {
  NON_PEDIGREED: "NON_PEDIGREED",
  CERTIFIED: "CERTIFIED",
  UNKNOWN: "UNKNOWN",
} as const;

export type PedigreeStatus = z.infer<typeof PedigreeStatus>;

/** Status of an inspection */
export const InspectionStatus = z.enum([
  "PENDING",
  "PASSED",
  "FAILED",
  "CONDITIONAL",
]);

export const INSPECTION_STATUS = {
  PENDING: "PENDING",
  PASSED: "PASSED",
  FAILED: "FAILED",
  CONDITIONAL: "CONDITIONAL",
} as const;

export type InspectionStatus = z.infer<typeof InspectionStatus>;

/* -----------------------------
 * STATUS ENUMS
 * ----------------------------- */

/** Workflow submission status for seed lots */
export const SeedLotSubmissionStatus = z.enum([
  "PENDING",
  "VALIDATED",
  "REJECTED",
  "APPROVED",
]);

export const SEED_LOT_SUBMISSION_STATUS = {
  PENDING: "PENDING",
  VALIDATED: "VALIDATED",
  REJECTED: "REJECTED",
  APPROVED: "APPROVED",
} as const;

export type SeedLotSubmissionStatus = z.infer<typeof SeedLotSubmissionStatus>;

/** Status of regulatory assessment */
export const RegulatoryAssessmentStatus = z.enum(["PENDING", "COMPLETED"]);

export const REGULATORY_ASSESSMENT_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
} as const;

export type RegulatoryAssessmentStatus = z.infer<
  typeof RegulatoryAssessmentStatus
>;
