// schemas/enums.ts
import { z } from "zod";

/* -----------------------------
 * USER / AUTH
 * ----------------------------- */
export const UserRole = z.enum([
  "EXPORTER",
  "SUPPLIER",
  "INSPECTOR",
  "INTERNAL",
  "IMPORTER",
]);

/* -----------------------------
 * REGULATORY
 * ----------------------------- */
export const RegulatoryPath = z.enum([
  "PPQ_587_SMALL_LOT",
  "PHYTOSANITARY_REQUIRED",
  "BULK_IMPORT_DOMESTIC_FULFILLMENT",
  "EXPORT_PROHIBITED",
]);

export const RiskClass = z.enum(["LOW", "MEDIUM", "HIGH", "UNKNOWN"]);

export const SeedUse = z.enum(["HOBBY", "RESEARCH", "COMMERCIAL"]);

export const PedigreeStatus = z.enum(["NON_PEDIGREED", "CERTIFIED", "UNKNOWN"]);

export const InspectionStatus = z.enum([
  "PENDING",
  "PASSED",
  "FAILED",
  "CONDITIONAL",
]);

/* -----------------------------
 * STATUS ENUMS
 * ----------------------------- */
export const SeedLotSubmissionStatus = z.enum([
  "PENDING",
  "VALIDATED",
  "REJECTED",
]);

export const RegulatoryAssessmentStatus = z.enum(["PENDING", "COMPLETED"]);

/* -----------------------------
 * TYPES
 * ----------------------------- */
export type UserRole = z.infer<typeof UserRole>;
export type RegulatoryPath = z.infer<typeof RegulatoryPath>;
export type RiskClass = z.infer<typeof RiskClass>;
export type SeedUse = z.infer<typeof SeedUse>;
export type PedigreeStatus = z.infer<typeof PedigreeStatus>;
export type InspectionStatus = z.infer<typeof InspectionStatus>;
