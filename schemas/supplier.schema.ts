import { z } from "zod";
import {
  BooleanFlag,
  CountryCode,
  DateTimeDefault,
  LongText,
  PositiveInt,
  SafeCode,
  SafeIdentifier,
} from "./primitives";

/**
 * SupplierSchema
 *
 * Represents a seed producer, breeder, or distributor.
 * This entity is directly referenced on:
 * - Phytosanitary certificates
 * - Small-lot permit documentation
 * - EU plant passports (where applicable)
 *
 * Designed for supplier self-entry + system validation.
 */
export const SupplierSchema = z.object({
  /** System-assigned unique identifier */
  id: SafeIdentifier,

  /** Owning organization (e.g. Shmaplex Seedlot org) */
  orgId: SafeIdentifier,

  /** Legal supplier name (as appears on export docs) */
  legalName: SafeCode,

  /** Country where seeds are produced */
  country: CountryCode,

  /**
   * Physical production location (not mailing address)
   * Required for many NPPOs and EU plant passport traceability.
   */
  productionLocation: z
    .object({
      addressLine1: SafeCode,
      addressLine2: SafeCode.optional(),
      city: SafeCode,
      region: SafeCode.optional(),
      postalCode: SafeCode.optional(),
      country: CountryCode,
    })
    .optional(),

  /**
   * Supplier registration or license number
   * (e.g. seed producer ID, nursery registration)
   */
  supplierRegistrationId: SafeCode.optional(),

  /**
   * Whether supplier is officially registered with their NPPO
   * (important for phytosanitary issuance eligibility)
   */
  nppoRegistered: BooleanFlag.default(false),

  /**
   * Contact email for inspection scheduling or compliance questions
   */
  contactEmail: SafeCode.optional(),

  /**
   * Declared production practices
   * (used for risk classification, not marketing claims)
   */
  productionPractices: z
    .object({
      organic: BooleanFlag.optional(),
      nonGmoDeclared: BooleanFlag.optional(),
      openPollinated: BooleanFlag.optional(),
      hybrid: BooleanFlag.optional(),
    })
    .optional(),

  /**
   * Countries this supplier has successfully exported to
   * (used to lower risk scoring)
   */
  exportHistoryCountries: z.array(CountryCode).optional(),

  /**
   * Internal risk / compliance notes
   */
  notes: LongText.optional(),

  /**
   * System-calculated risk hints (not supplier-editable)
   */
  riskIndicators: z
    .object({
      priorRejections: PositiveInt.optional(),
      inspectionFailures: PositiveInt.optional(),
      highRiskSpeciesHistory: BooleanFlag.optional(),
    })
    .optional(),

  createdAt: DateTimeDefault,
  updatedAt: DateTimeDefault,
});

export const SupplierCreateSchema = SupplierSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const SupplierUpdateSchema = SupplierCreateSchema.partial();
