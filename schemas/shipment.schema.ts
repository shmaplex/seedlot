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
 * ShipmentSchema
 *
 * Represents a single physical consignment of seed
 * moving across an international border.
 *
 * LEGAL STATUS:
 * - This is the atomic unit for:
 *   - Phytosanitary certificates
 *   - Customs declarations
 *   - Import permits
 *   - Audits and enforcement
 *
 * A shipment may contain multiple seed lots ONLY if:
 * - They are legally allowed to ship together
 * - They share the same regulatory pathway
 */
export const ShipmentSchema = z.object({
  /** System-assigned shipment identifier */
  id: SafeIdentifier.optional(),

  /**
   * Seed lots included in this shipment.
   *
   * RULE:
   * - All seed lots must be compatible under the same regulatory path
   * - All must be declared and labeled individually if required
   */
  seedLotIds: z.array(SafeIdentifier).min(1),

  /**
   * Exporting organization (usually KR-based)
   */
  exporterOrgId: SafeIdentifier,

  /**
   * Importing organization or individual (importer of record)
   *
   * NOTE:
   * - Individuals are allowed for PPQ-587
   * - Bulk imports usually require registered importer
   */
  importerId: SafeIdentifier.optional(),

  /**
   * Destination country (NPPO jurisdiction)
   */
  destinationCountry: CountryCode,

  /**
   * Final regulatory pathway used for this shipment
   * (must match RegulatoryAssessment)
   */
  regulatoryPath: RegulatoryPath,

  /**
   * Carrier used for transport
   */
  carrier: z.enum([
    "KOREA_POST",
    "CJ_LOGISTICS",
    "DHL",
    "FEDEX",
    "UPS",
    "OTHER",
  ]),

  /**
   * Carrier service level (if applicable)
   * Example: EMS, Express, Registered Mail
   * Human- and regulator-facing → SafeCode
   */
  carrierService: SafeCode.optional(),

  /**
   * Tracking or reference number assigned by carrier
   * Human- and regulator-facing → SafeCode
   */
  trackingNumber: SafeCode.optional(),

  /**
   * Export country of shipment (usually KR)
   */
  exportCountry: CountryCode.default("KR"),

  /**
   * Import permit reference (if required)
   * Example: APHIS permit number
   * Human- and regulator-facing → SafeCode
   */
  importPermitReference: SafeCode.optional(),

  /**
   * Phytosanitary certificate used for this shipment
   *
   * REQUIRED when regulatoryPath === PHYTOSANITARY_REQUIRED
   */
  phytosanitaryCertificateId: SafeIdentifier.optional(),

  /**
   * Declared customs value in USD
   *
   * NOTE:
   * - Must reflect actual transaction value
   * - Zero-value declarations are allowed ONLY when lawful
   */
  declaredValueUSD: z.number().min(0).optional(),

  /**
   * Total number of physical packages/envelopes
   */
  packageCount: PositiveInt.optional(),

  /**
   * Declared weight (kg)
   */
  declaredWeightKg: z.number().min(0).optional(),

  /**
   * Customs declaration contents description
   * (human-readable, regulator-facing)
   * → SafeCode
   */
  customsDescription: SafeCode.optional(),

  /**
   * Required labels verified before shipment
   *
   * Examples:
   * - PPQ-587 labeling
   * - Botanical name
   * - Country of origin
   * - Permit number
   */
  labelsVerified: BooleanFlag.default(false),

  /**
   * Whether this shipment was inspected prior to export
   * (distinct from phytosanitary inspection)
   */
  preExportInspection: BooleanFlag.optional(),

  /**
   * Shipment lifecycle status
   */
  shipmentStatus: z
    .enum([
      "DRAFT",
      "AWAITING_INSPECTION",
      "AWAITING_DOCUMENTS",
      "READY_TO_SHIP",
      "SHIPPED",
      "IN_TRANSIT",
      "HELD_AT_BORDER",
      "DELIVERED",
      "REJECTED",
      "RETURNED",
      "DESTROYED",
    ])
    .default("DRAFT"),

  /**
   * Regulatory or carrier hold reason (if applicable)
   */
  holdReason: LongText.optional(),

  /**
   * Free-form shipment notes
   * (internal or compliance-related)
   */
  shipmentNotes: LongText.optional(),

  /**
   * Date/time shipment physically left exporter custody
   */
  shippedAt: DateTime,

  /**
   * Date/time shipment cleared import controls
   */
  clearedAt: DateTime,

  /**
   * Date/time shipment delivered to recipient
   */
  deliveredAt: DateTime,

  /**
   * Audit metadata
   */
  auditTrail: z
    .object({
      createdBy: SafeIdentifier.optional(),
      lastUpdatedBy: SafeIdentifier.optional(),
      regulatoryReviewed: BooleanFlag.optional(),
    })
    .optional(),

  createdAt: DateTimeDefault,
  updatedAt: DateTimeDefault,
});

export const ShipmentCreateSchema = ShipmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const ShipmentUpdateSchema = ShipmentCreateSchema.partial();
