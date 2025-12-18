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
 * Base schema — core Supplier fields
 */
export const SupplierBaseSchema = z.object({
  /** System-assigned unique identifier */
  id: SafeIdentifier,

  /** Owning organization (e.g. Shmaplex Seedlot org) */
  orgId: SafeIdentifier,

  /** Legal supplier name (as appears on export docs) */
  legalName: SafeCode,

  /** Country where seeds are produced */
  country: CountryCode,

  /** Physical production location (serialized as string in DB) */
  productionLocation: z.any().optional(),

  /** Supplier registration or license number */
  supplierRegistrationId: SafeCode.optional(),

  /** Whether supplier is officially registered with their NPPO */
  nppoRegistered: BooleanFlag.optional(),

  /** Contact email for inspection scheduling or compliance questions */
  contactEmail: SafeCode,

  /** Declared production practices (serialized as JSON in DB) */
  productionPractices: z.any().optional(),

  /** Countries this supplier has successfully exported to (JSON array) */
  exportHistoryCountries: z.any().optional(),

  /** Internal risk / compliance notes */
  notes: LongText.optional(),

  /** System-calculated risk hints (serialized as JSON in DB) */
  riskIndicators: z.any().optional(),

  /** Audit & lifecycle fields */
  createdAt: DateTimeDefault,
  updatedAt: DateTimeDefault,
});

/**
 * Reference schema — minimal info for embedding elsewhere
 */
export const SupplierReferenceSchema = SupplierBaseSchema.pick({
  id: true,
  legalName: true,
  country: true,
  contactEmail: true,
});

/**
 * Create schema — for new supplier submissions
 */
export const SupplierCreateSchema = z.object({
  orgId: SafeIdentifier,
  legalName: SafeCode,
  country: CountryCode,
  productionLocation: z.any().optional(),
  supplierRegistrationId: SafeCode.optional(),
  nppoRegistered: BooleanFlag.optional(),
  contactEmail: SafeCode,
  productionPractices: z.any().optional(),
  exportHistoryCountries: z.any().optional(),
  notes: LongText.optional(),
  riskIndicators: z.any().optional(),
});

/**
 * Update schema — partial updates allowed
 */
export const SupplierUpdateSchema = SupplierCreateSchema.partial();

/**
 * Detailed schema — internal/admin view with all fields
 */
export const SupplierDetailedSchema = SupplierBaseSchema.extend({
  archivedAt: z.date().optional(),
  archivedById: SafeIdentifier.optional(),
  createdById: SafeIdentifier.optional(),
  updatedById: SafeIdentifier.optional(),
});

/** TypeScript types derived from Zod schemas */
export type SupplierBase = z.infer<typeof SupplierBaseSchema>;
export type SupplierReference = z.infer<typeof SupplierReferenceSchema>;
export type SupplierCreate = z.infer<typeof SupplierCreateSchema>;
export type SupplierUpdate = z.infer<typeof SupplierUpdateSchema>;
export type SupplierDetailed = z.infer<typeof SupplierDetailedSchema>;
