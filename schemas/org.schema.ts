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
 * Base schema — core Organization fields
 */
export const OrganizationBaseSchema = z.object({
  /** System-assigned unique identifier for the organization */
  id: SafeIdentifier,

  /** Legal registered name of the organization */
  name: LongText,

  /** Country code where the organization is legally registered */
  country: CountryCode,

  /** Optional business registration or incorporation number */
  registrationNumber: SafeCode.optional(),

  /** Whether this organization is authorized to export plant material under NPPO */
  nppoExporterAuthorized: BooleanFlag.default(false),

  /** NPPO exporter/operator ID, if assigned */
  nppoExporterId: SafeCode.optional(),

  /** Whether this organization acts as importer of record */
  importerOfRecord: BooleanFlag.default(false),

  /** Regulatory contact email */
  complianceEmail: Email.optional(),

  /** Freeform notes (audit, historical, or internal) */
  notes: LongText.optional(),

  /** Soft compliance flags for risk analysis */
  complianceFlags: z
    .object({
      /** Past violations of regulatory or compliance requirements */
      pastViolations: BooleanFlag.optional(),

      /** Flag indicating under active review */
      underReview: BooleanFlag.optional(),

      /** List of restricted markets by country code */
      restrictedMarkets: z.array(CountryCode).optional(),
    })
    .optional(),

  /** Record creation timestamp */
  createdAt: DateTimeDefault,

  /** Record last update timestamp */
  updatedAt: DateTimeDefault,
});

/**
 * Reference schema — minimal info for embedding elsewhere
 */
export const OrganizationReferenceSchema = OrganizationBaseSchema.pick({
  id: true,
  name: true,
  country: true,
});

/**
 * Schema for creating a new organization record.
 * Excludes system-managed timestamps.
 */
export const OrganizationCreateSchema = OrganizationBaseSchema.omit({
  createdAt: true,
  updatedAt: true,
});

/**
 * Schema for updating an existing organization record.
 * All fields optional for partial updates.
 */
export const OrganizationUpdateSchema = OrganizationCreateSchema.partial();

/**
 * Detailed schema — internal/admin view with all fields
 */
export const OrganizationDetailedSchema = OrganizationBaseSchema.extend({});

/** TypeScript types derived from Zod schemas */
export type OrganizationBase = z.infer<typeof OrganizationBaseSchema>;
export type OrganizationReference = z.infer<typeof OrganizationReferenceSchema>;
export type OrganizationCreate = z.infer<typeof OrganizationCreateSchema>;
export type OrganizationUpdate = z.infer<typeof OrganizationUpdateSchema>;
export type OrganizationDetailed = z.infer<typeof OrganizationDetailedSchema>;
