import { z } from "zod";
import { RegulatoryPath } from "./enums";
import {
  BooleanFlag,
  CountryCode,
  DateTime,
  DateTimeDefault,
  LongText,
  PositiveInt,
  SafeCode,
  SafeIdentifier,
} from "./primitives";

/**
 * Base schema — core Shipment fields
 */
export const ShipmentBaseSchema = z.object({
  /** System-assigned shipment identifier */
  id: SafeIdentifier,

  /** Seed lots included in this shipment. Must contain at least 1. */
  seedLotIds: z.array(SafeIdentifier).min(1),

  /** Exporting organization (usually KR-based) */
  exporterOrgId: SafeIdentifier,

  /** Importing organization or individual (importer of record) */
  importerId: SafeIdentifier.optional(),

  /** Destination country (NPPO jurisdiction) */
  destinationCountry: CountryCode,

  /** Final regulatory pathway used for this shipment */
  regulatoryPath: RegulatoryPath,

  /** Carrier used for transport */
  carrier: z.string().optional(),

  /** Carrier service level (human- and regulator-facing) */
  carrierService: SafeCode.optional(),

  /** Tracking or reference number assigned by carrier */
  trackingNumber: SafeCode.optional(),

  /** Export country of shipment (default KR) */
  exportCountry: CountryCode.default("KR"),

  /** Import permit reference (if required) */
  importPermitReference: SafeCode.optional(),

  /** Phytosanitary certificate used for this shipment */
  phytosanitaryCertificateId: SafeIdentifier.optional(),

  /** Declared customs value in USD */
  declaredValueUSD: z.number().min(0).optional(),

  /** Total number of physical packages/envelopes */
  packageCount: PositiveInt.optional(),

  /** Declared weight (kg) */
  declaredWeightKg: z.number().min(0).optional(),

  /** Customs declaration contents description */
  customsDescription: SafeCode.optional(),

  /** Required labels verified before shipment */
  labelsVerified: BooleanFlag.optional(),

  /** Whether this shipment was inspected prior to export */
  preExportInspection: BooleanFlag.optional(),

  /** Shipment lifecycle status */
  shipmentStatus: z.string().optional(),

  /** Regulatory or carrier hold reason (if applicable) */
  holdReason: LongText.optional(),

  /** Free-form shipment notes (internal or compliance-related) */
  shipmentNotes: LongText.optional(),

  /** Date/time shipment physically left exporter custody */
  shippedAt: DateTime.optional(),

  /** Date/time shipment cleared import controls */
  clearedAt: DateTime.optional(),

  /** Date/time shipment delivered to recipient */
  deliveredAt: DateTime.optional(),

  /** Audit metadata (arbitrary JSON) */
  auditTrail: z.any().optional(),

  /** Audit & lifecycle fields */
  createdAt: DateTimeDefault,
  updatedAt: DateTimeDefault,
});

/**
 * Reference schema — minimal info for embedding elsewhere
 */
export const ShipmentReferenceSchema = ShipmentBaseSchema.pick({
  id: true,
  exporterOrgId: true,
  shipmentStatus: true,
  destinationCountry: true,
  regulatoryPath: true,
});

/**
 * Create schema — for new shipment submissions
 */
export const ShipmentCreateSchema = z.object({
  seedLotIds: z.array(SafeIdentifier).min(1),
  exporterOrgId: SafeIdentifier,
  importerId: SafeIdentifier.optional(),
  destinationCountry: CountryCode,
  regulatoryPath: RegulatoryPath,
  carrier: z.string().optional(),
  carrierService: SafeCode.optional(),
  trackingNumber: SafeCode.optional(),
  exportCountry: CountryCode.default("KR"),
  importPermitReference: SafeCode.optional(),
  phytosanitaryCertificateId: SafeIdentifier.optional(),
  declaredValueUSD: z.number().min(0).optional(),
  packageCount: PositiveInt.optional(),
  declaredWeightKg: z.number().min(0).optional(),
  customsDescription: SafeCode.optional(),
  labelsVerified: BooleanFlag.optional(),
  preExportInspection: BooleanFlag.optional(),
  shipmentStatus: z.string().optional(),
  holdReason: LongText.optional(),
  shipmentNotes: LongText.optional(),
  shippedAt: DateTime.optional(),
  clearedAt: DateTime.optional(),
  deliveredAt: DateTime.optional(),
  auditTrail: z.any().optional(),
});

/**
 * Update schema — partial updates allowed
 */
export const ShipmentUpdateSchema = ShipmentCreateSchema.partial();

/**
 * Detailed schema — internal/admin view with all fields
 */
export const ShipmentDetailedSchema = ShipmentBaseSchema.extend({
  archivedAt: DateTime.optional(),
  archivedById: SafeIdentifier.optional(),
  createdById: SafeIdentifier.optional(),
  updatedById: SafeIdentifier.optional(),
});

/** TypeScript types derived from Zod schemas */
export type ShipmentBase = z.infer<typeof ShipmentBaseSchema>;
export type ShipmentReference = z.infer<typeof ShipmentReferenceSchema>;
export type ShipmentCreate = z.infer<typeof ShipmentCreateSchema>;
export type ShipmentUpdate = z.infer<typeof ShipmentUpdateSchema>;
export type ShipmentDetailed = z.infer<typeof ShipmentDetailedSchema>;
