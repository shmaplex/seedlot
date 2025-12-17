import { z } from "zod";
import {
  BooleanFlag,
  CountryCode,
  DateTimeDefault,
  Email,
  LongText,
  SafeCode,
  SafeIdentifier,
} from "./primitives";

/**
 * OrganizationSchema
 *
 * Represents a legal or operational organization participating in
 * seed production, export, import, or fulfillment.
 *
 * Used for:
 * - Exporters (KR-based)
 * - Importers of record (US/EU)
 * - Platform owner (Shmaplex / Seedlot)
 *
 * Designed to support USDA APHIS, EU plant passport systems,
 * and NPPO-to-NPPO traceability.
 */
export const OrganizationSchema = z.object({
  /** System-assigned unique identifier */
  id: SafeIdentifier,

  /** Legal registered name */
  name: LongText,

  /** Country of legal registration */
  country: CountryCode,

  /** Optional business registration or incorporation number */
  registrationNumber: SafeCode.optional(),

  /** Authorized to export plant material under NPPO */
  nppoExporterAuthorized: BooleanFlag.default(false),

  /** NPPO exporter/operator ID, if assigned */
  nppoExporterId: SafeCode.optional(),

  /** Whether acting as importer of record */
  importerOfRecord: BooleanFlag.default(false),

  /** Regulatory contact email */
  complianceEmail: Email.optional(),

  /** Freeform notes (audit, historical, or internal) */
  notes: LongText.optional(),

  /** Soft compliance flags for risk analysis */
  complianceFlags: z
    .object({
      pastViolations: BooleanFlag.optional(),
      underReview: BooleanFlag.optional(),
      restrictedMarkets: z.array(CountryCode).optional(),
    })
    .optional(),

  /** Record timestamps */
  createdAt: DateTimeDefault,
  updatedAt: DateTimeDefault,
});

/**
 * OrganizationCreateSchema
 *
 * Schema for creating a new organization record.
 * Excludes system-generated timestamps.
 */
export const OrganizationCreateSchema = OrganizationSchema.omit({
  createdAt: true,
  updatedAt: true,
});

/**
 * OrganizationUpdateSchema
 *
 * Schema for updating an existing organization record.
 * All fields are optional to allow partial updates.
 */
export const OrganizationUpdateSchema = OrganizationCreateSchema.partial();
