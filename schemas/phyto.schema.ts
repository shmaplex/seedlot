import { z } from "zod";
import { InspectionStatus } from "./enums";
import {
  BooleanFlag,
  DateTimeDefault,
  LongText,
  SafeIdentifier,
} from "./primitives";

/**
 * Base schema — core Phytosanitary Certificate fields
 */
export const PhytosanitaryCertificateBaseSchema = z.object({
  /** System-assigned identifier */
  id: SafeIdentifier.optional(),

  /**
   * Issuing country (ISO-3166)
   * Default: "KR"
   */
  issuingCountry: z.string().default("KR"),

  /**
   * NPPO authority name
   * Example: "Animal and Plant Quarantine Agency (APQA)"
   */
  issuingAuthority: z.string(),

  /**
   * Official certificate number as issued by NPPO
   * Must be globally unique per authority
   */
  certificateNumber: z.string(),

  /** Exporter organization ID */
  exporterOrgId: SafeIdentifier,

  /** Importing country (destination NPPO) */
  destinationCountry: z.string(),

  /** Import permit or authorization reference (if required) */
  importPermitReference: z.string().optional(),

  /** Seed lot IDs included on this certificate */
  seedLotIds: z.array(z.string()).min(1),

  /** Inspection date performed by NPPO */
  inspectionDate: z.date(),

  /** Inspection result */
  inspectionStatus: InspectionStatus,

  /** Name or identifier of inspecting officer (optional) */
  inspectorId: SafeIdentifier.optional(),

  /** Official inspection remarks */
  inspectorNotes: LongText.optional(),

  /** Additional declarations required by importing country */
  additionalDeclarations: z.array(LongText).optional(),

  /** Treatments applied (if any) */
  treatmentsApplied: z
    .array(
      z.object({
        treatmentType: z.string(),
        chemical: z.string().optional(),
        duration: z.string().optional(),
        temperature: z.string().optional(),
        concentration: z.string().optional(),
      }),
    )
    .optional(),

  /** Certificate issue date */
  issueDate: z.date(),

  /** Certificate validity end date (if explicitly defined) */
  validUntil: z.date().optional(),

  /** Shipment / consignment identifier this certificate is bound to */
  consignmentId: SafeIdentifier.optional(),

  /** INTERNAL USE ONLY: Indicates this certificate is referenced internally */
  reusedForReferenceOnly: BooleanFlag.default(false),

  /** Certificate status flags */
  statusFlags: z
    .object({
      voided: BooleanFlag.optional(),
      supersededByCertificateId: SafeIdentifier.optional(),
      amended: BooleanFlag.optional(),
    })
    .optional(),

  /** Timestamps */
  createdAt: DateTimeDefault,
  updatedAt: DateTimeDefault,
  archivedAt: z.date().optional(),
  archivedById: SafeIdentifier.optional(),
  createdById: SafeIdentifier.optional(),
  updatedById: SafeIdentifier.optional(),
});

/**
 * Reference schema — minimal info for embedding elsewhere
 */
export const PhytosanitaryCertificateReferenceSchema =
  PhytosanitaryCertificateBaseSchema.pick({
    id: true,
    certificateNumber: true,
    issuingAuthority: true,
    issuingCountry: true,
    inspectionStatus: true,
  });

/** Schema for creating a new certificate. System-managed fields omitted. */
export const PhytosanitaryCertificateCreateSchema =
  PhytosanitaryCertificateBaseSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    archivedAt: true,
    archivedById: true,
    createdById: true,
    updatedById: true,
  });

/** Schema for updating an existing certificate. Partial updates allowed. */
export const PhytosanitaryCertificateUpdateSchema =
  PhytosanitaryCertificateBaseSchema.partial();

/** Detailed schema — internal/admin view with all fields */
export const PhytosanitaryCertificateDetailedSchema =
  PhytosanitaryCertificateBaseSchema.extend({});

/** TypeScript types derived from Zod schemas */
export type PhytosanitaryCertificateBase = z.infer<
  typeof PhytosanitaryCertificateBaseSchema
>;
export type PhytosanitaryCertificateReference = z.infer<
  typeof PhytosanitaryCertificateReferenceSchema
>;
export type PhytosanitaryCertificateCreate = z.infer<
  typeof PhytosanitaryCertificateCreateSchema
>;
export type PhytosanitaryCertificateUpdate = z.infer<
  typeof PhytosanitaryCertificateUpdateSchema
>;
export type PhytosanitaryCertificateDetailed = z.infer<
  typeof PhytosanitaryCertificateDetailedSchema
>;
