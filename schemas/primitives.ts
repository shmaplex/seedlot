import { z } from "zod";

/* ------------------------------------------------------------------ */
/* CORE PRIMITIVES                                                     */
/* ------------------------------------------------------------------ */

/**
 * SafeIdentifier
 *
 * General-purpose system identifier used for:
 * - Internal IDs
 * - Database primary keys
 * - Foreign references
 *
 * DESIGN INTENT:
 * - Always a UUID v4
 * - Safe to appear in logs or APIs
 * - Must be stable and traceable
 *
 * Prisma mapping: `String @db.VarChar(128)`
 */
export const SafeIdentifier = z.uuid().describe("SafeIdentifier");

/**
 * SafeCode
 *
 * Human- or regulator-facing code, like:
 * - lotCode
 * - certificateNumber
 * - permit references
 *
 * DESIGN INTENT:
 * - May include letters, numbers, dashes, or underscores
 * - Meant to appear on labels, certificates, and forms
 * - Not strictly unique globally, only per relevant context
 *
 * Prisma mapping: `String @db.VarChar(128)`
 */
export const SafeCode = z
  .string()
  .min(2)
  .max(128)
  .regex(
    /^[A-Za-z0-9_-]+$/,
    "SafeCode may only contain letters, numbers, _ or -",
  )
  .describe("SafeCode");

/**
 * LongText
 *
 * Free-form text field used for:
 * - Inspection remarks
 * - Regulatory notes
 * - Additional declarations
 * - Audit commentary
 *
 * REGULATORY NOTE:
 * - Phytosanitary certificates and permits often contain
 *   long, human-written remarks
 * - Do NOT sanitize aggressively or truncate silently
 *
 * Prisma mapping: `String @db.Text`
 */
export const LongText = z.string().max(5000).describe("LongText");

/**
 * PositiveInt
 *
 * Represents strictly positive integer values.
 *
 * Used for:
 * - Seed counts
 * - Quantity limits
 * - Risk counters
 *
 * IMPORTANT:
 * - Zero is invalid in regulatory contexts
 * - Use explicit optional fields where absence is allowed
 *
 * Prisma mapping: `Int`
 */
export const PositiveInt = z.number().int().positive().describe("PositiveInt");

/* ------------------------------------------------------------------ */
/* BOTANICAL & GEOGRAPHIC                                               */
/* ------------------------------------------------------------------ */

/**
 * ScientificName
 *
 * Represents a botanical scientific name.
 *
 * REALITY NOTES:
 * - Scientific names change over time
 * - Authorities may accept synonyms
 * - Hybrid notation (×) may appear
 * - Subspecies / variety / cultivar may or may not be included
 *
 * Do NOT over-validate this field.
 * Taxonomic correctness belongs in a separate taxonomy service.
 *
 * Prisma mapping: `String @db.VarChar(255)`
 */
export const ScientificName = z
  .string()
  .min(3)
  .max(255)
  .describe("ScientificName");

/**
 * CountryCode
 *
 * ISO-3166-1 alpha-2 country code where possible (e.g. "US", "KR", "CA"),
 * BUT allows extended strings for edge cases such as:
 * - Territories
 * - NPPO-specific identifiers
 * - Transitional or legacy country designations
 *
 * IMPORTANT:
 * - Regulators may accept non-standard values on supporting documents
 * - Validation of "official ISO only" should happen at the workflow layer,
 *   not the primitive layer
 *
 * Prisma mapping: `String @db.Char(2)`
 */
export const CountryCode = z.string().min(2).max(64).describe("CountryCode");

/* ------------------------------------------------------------------ */
/* CONTACTS & COMMUNICATION                                             */
/* ------------------------------------------------------------------ */

/**
 * Email
 *
 * Validated email address for human/regulatory contacts.
 *
 * Prisma mapping: `String @db.VarChar(255)`
 */
export const Email = z.email().max(255).describe("Email");

/* ------------------------------------------------------------------ */
/* REGULATORY / LOT / CERTIFICATES                                      */
/* ------------------------------------------------------------------ */

/**
 * CertificateNumber
 *
 * Human/regulator-facing certificate or permit number.
 *
 * Prisma mapping: `String @db.VarChar(128)`
 */
export const CertificateNumber = z
  .string()
  .min(2)
  .max(128)
  .regex(
    /^[A-Za-z0-9_-]+$/,
    "CertificateNumber may only contain letters, numbers, _ or -",
  )
  .describe("CertificateNumber");

/**
 * LotCode
 *
 * Identifier for seed lots, used on labels and in regulatory forms.
 *
 * Prisma mapping: `String @db.VarChar(64)`
 */
export const LotCode = z
  .string()
  .min(1)
  .max(64)
  .regex(
    /^[A-Za-z0-9_-]+$/,
    "LotCode may only contain letters, numbers, _ or -",
  )
  .describe("LotCode");

/* ------------------------------------------------------------------ */
/* DATE / TIME / TIMESTAMPS                                             */
/* ------------------------------------------------------------------ */

/**
 * DateTime
 *
 * ISO-8601 string representation of a date or timestamp.
 * Can replace Json-based createdAt/updatedAt fields.
 *
 * Prisma mapping: `DateTime`
 */
export const DateTime = z.iso.datetime().describe("DateTime");

/**
 * DateTime
 *
 * ISO-8601 string representation of a date or timestamp.
 *
 * DESIGN NOTES:
 * - Always stores as a string in ISO format (`YYYY-MM-DDTHH:mm:ss.sssZ`)
 * - Can replace Json-based createdAt / updatedAt fields
 * - Default is the current date/time in UTC
 *
 * Prisma mapping: `DateTime`
 */
export const DateTimeDefault = z.iso
  .datetime()
  .default(() => new Date().toISOString())
  .describe("DateTime");

/* ------------------------------------------------------------------ */
/* BOOLEAN FLAGS                                                        */
/* ------------------------------------------------------------------ */

/**
 * BooleanFlag
 *
 * Generic boolean used for regulatory or system flags.
 *
 * Prisma mapping: `Boolean`
 */
export const BooleanFlag = z.boolean().describe("BooleanFlag");

/* ------------------------------------------------------------------ */
/* NUMERIC & FINANCIAL                                                  */
/* ------------------------------------------------------------------ */

/**
 * Decimal
 *
 * Represents fixed-precision decimal values for regulatory or financial data.
 *
 * Prisma mapping: `Decimal`
 */
export const Decimal = z.number().describe("Decimal");

/* ------------------------------------------------------------------ */
/* WEB / URL / RESOURCE LINKS                                           */
/* ------------------------------------------------------------------ */

/**
 * URLString
 *
 * Valid URL for reference documents, online resources, or media.
 *
 * Prisma mapping: `String @db.VarChar(2048)`
 */
export const URLString = z.string().url().max(2048).describe("URLString");

/* ------------------------------------------------------------------ */
/* JSON / FLEXIBLE DATA                                                  */
/* ------------------------------------------------------------------ */

/**
 * JSONData
 *
 * Arbitrary JSON object for flexible metadata storage.
 *
 * Prisma mapping: `Json`
 */
export const JSONData = z.any().describe("JSONData");
