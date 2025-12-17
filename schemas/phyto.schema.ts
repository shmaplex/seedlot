import { z } from "zod";
import { InspectionStatus } from "./enums";
import {
  BooleanFlag,
  CountryCode,
  DateTimeDefault,
  LongText,
  SafeCode,
  SafeIdentifier,
} from "./primitives";

/**
 * PhytosanitaryCertificateSchema
 *
 * Represents an official phytosanitary certificate issued by a
 * National Plant Protection Organization (NPPO) under IPPC / ISPM-12.
 *
 * IMPORTANT LEGAL NOTES:
 * - A phytosanitary certificate applies to ONE shipment (consignment).
 * - It may list multiple seed lots ONLY if inspected and shipped together.
 * - Certificates CANNOT be copied or reused for separate shipments.
 * - Reuse flags here indicate internal reference linkage ONLY.
 *
 * This schema is designed to:
 * - Support USDA APHIS PPQ imports
 * - Support EU import inspections
 * - Support KR NPPO exports
 * - Maintain audit-safe traceability
 */
export const PhytosanitaryCertificateSchema = z.object({
  /** System-assigned identifier */
  id: SafeIdentifier.optional(),

  /**
   * Issuing country (ISO-3166)
   * Example: "KR"
   */
  issuingCountry: CountryCode.default("KR"),

  /**
   * NPPO authority name
   * Example: "Animal and Plant Quarantine Agency (APQA)"
   */
  issuingAuthority: SafeCode,

  /**
   * Official certificate number as issued by NPPO
   * Must be globally unique per authority
   */
  certificateNumber: SafeCode,

  /**
   * Exporter organization ID
   * Must match registered NPPO exporter
   */
  exporterOrgId: SafeIdentifier,

  /**
   * Importing country (destination NPPO)
   * Example: "US", "CA", "FR", "DE"
   */
  destinationCountry: CountryCode,

  /**
   * Import permit or authorization reference (if required)
   * - USDA APHIS permit number
   * - EU import authorization
   */
  importPermitReference: SafeCode.optional(),

  /**
   * Seed lots included on this certificate.
   *
   * RULE:
   * - All seed lots MUST be inspected together
   * - All seed lots MUST ship together in one consignment
   */
  seedLotIds: z.array(SafeIdentifier).min(1),

  /**
   * Inspection date performed by NPPO
   */
  inspectionDate: z.date().describe("DateTime"),

  /**
   * Inspection result
   */
  inspectionStatus: InspectionStatus,

  /**
   * Name or identifier of inspecting officer (if provided)
   */
  inspectorId: SafeIdentifier.optional(),

  /**
   * Official inspection remarks
   * (may include pest freedom statements or treatments)
   */
  inspectorNotes: LongText.optional(),

  /**
   * Additional declarations required by importing country
   * (ISPM-12 Section: Additional Declaration)
   *
   * Example:
   * "The seeds were found free from Tomato brown rugose fruit virus."
   */
  additionalDeclarations: z.array(LongText).optional(),

  /**
   * Treatments applied (if any)
   * Example: fumigation, heat treatment
   */
  treatmentsApplied: z
    .array(
      z.object({
        treatmentType: SafeCode,
        chemical: SafeCode.optional(),
        duration: SafeCode.optional(),
        temperature: SafeCode.optional(),
        concentration: SafeCode.optional(),
      }),
    )
    .optional(),

  /**
   * Certificate issue date
   * Often same as inspection date, but not always
   */
  issueDate: z.date().describe("DateTime"),

  /**
   * Certificate validity end date (if explicitly defined)
   * Note: many countries rely on shipment date instead
   */
  validUntil: z.date().optional().describe("DateTime"),

  /**
   * Shipment / consignment identifier this certificate is bound to
   */
  consignmentId: SafeIdentifier.optional(),

  /**
   * INTERNAL USE ONLY
   *
   * Indicates this certificate is referenced by multiple internal
   * records (e.g. audit, analytics), NOT reused legally.
   */
  reusedForReferenceOnly: BooleanFlag.default(false),

  /**
   * Whether this certificate was superseded, voided, or cancelled
   */
  statusFlags: z
    .object({
      voided: BooleanFlag.optional(),
      supersededByCertificateId: SafeIdentifier.optional(),
      amended: BooleanFlag.optional(),
    })
    .optional(),

  createdAt: DateTimeDefault,
  updatedAt: DateTimeDefault,
});

export const PhytosanitaryCertificateCreateSchema =
  PhytosanitaryCertificateSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const PhytosanitaryCertificateUpdateSchema =
  PhytosanitaryCertificateCreateSchema.partial();
