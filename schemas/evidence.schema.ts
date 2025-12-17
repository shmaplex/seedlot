import { z } from "zod";
import {
  BooleanFlag,
  DateTimeDefault,
  LongText,
  SafeCode,
  SafeIdentifier,
} from "./primitives";

/**
 * EvidenceSchema
 *
 * A single immutable piece of evidence used to justify
 * regulatory, biological, or compliance decisions.
 *
 * Evidence is NEVER edited — only superseded.
 */
export const EvidenceSchema = z.object({
  /** System-assigned evidence ID */
  id: SafeIdentifier.optional(),

  /**
   * Evidence category
   * Used for weighting and UI presentation
   */
  type: z.enum([
    "SUPPLIER_DECLARATION",
    "OFFICIAL_DOCUMENT",
    "INSPECTION_REPORT",
    "LAB_RESULT",
    "IMAGE",
    "EMAIL",
    "AI_EXTRACTION",
    "HUMAN_NOTE",
    "REGULATORY_RULE",
    "OTHER",
  ]),

  /**
   * Human-readable title
   * Example: "Supplier pathogen declaration (KR)"
   */
  title: LongText,

  /**
   * Primary content or summary
   * (raw documents are referenced, not embedded)
   */
  summary: LongText.optional(),

  /**
   * Source reference (lotCode, certificate number, permit, or internal reference)
   */
  sourceReference: SafeCode.optional(),

  /**
   * Hash of original content (tamper detection)
   */
  contentHash: SafeIdentifier.optional(),

  /**
   * Confidence score (esp. for AI-derived evidence)
   */
  confidence: z.number().min(0).max(1).optional(),

  /**
   * Whether this evidence is authoritative
   * (e.g. NPPO-issued vs supplier-claimed)
   */
  authoritative: BooleanFlag.default(false),

  /**
   * Whether this evidence is currently valid
   * (false if superseded or invalidated)
   */
  active: BooleanFlag.default(true),

  /**
   * If superseded, points to newer evidence
   */
  supersededByEvidenceId: SafeIdentifier.optional(),

  /**
   * Audit metadata
   */
  createdBy: SafeIdentifier.default("system"),
  createdAt: DateTimeDefault,
});

/**
 * EvidenceLinkSchema
 *
 * Links evidence to ANY domain entity.
 * This is where traceability actually happens.
 */
export const EvidenceLinkSchema = z.object({
  /** System-assigned link ID */
  id: SafeIdentifier.optional(),

  /**
   * Evidence being referenced
   */
  evidenceId: SafeIdentifier,

  /**
   * What kind of entity this evidence supports
   */
  entityType: z.enum([
    "SEED_LOT",
    "SUPPLIER",
    "SHIPMENT",
    "PHYTO_CERTIFICATE",
    "REGULATORY_ASSESSMENT",
    "PPQ_COMPLIANCE",
    "BIOLOGY_PROFILE",
  ]),

  /** ID of the entity */
  entityId: SafeIdentifier,

  /**
   * Role of this evidence
   */
  role: z.enum([
    "PRIMARY_JUSTIFICATION",
    "SUPPORTING",
    "REFERENCE",
    "CONTRADICTORY",
  ]),

  /**
   * Optional weight (0–1) used for automated scoring
   */
  weight: z.number().min(0).max(1).default(1),

  /**
   * Whether this link was created automatically or manually
   */
  linkedBy: z.enum(["SYSTEM", "HUMAN"]).default("SYSTEM"),

  /**
   * Free-form notes explaining relevance
   */
  notes: LongText.optional(),

  createdAt: DateTimeDefault,
});

/**
 * DecisionBasisSchema
 *
 * Explicitly records which evidence items
 * justified a regulatory decision.
 */
export const DecisionBasisSchema = z.object({
  /** System-assigned ID */
  id: SafeIdentifier.optional(),

  /** Regulatory assessment being justified */
  regulatoryAssessmentId: SafeIdentifier,

  /** Evidence used */
  evidenceId: SafeIdentifier,

  /**
   * What aspect this evidence justified
   */
  justificationAspect: z.enum([
    "BIOLOGICAL_IDENTITY",
    "PATHOGEN_STATUS",
    "ORIGIN_COUNTRY",
    "INTENDED_USE",
    "LEGAL_EXCLUSION",
    "PERMIT_ELIGIBILITY",
    "RISK_CLASSIFICATION",
  ]),

  /**
   * Whether this evidence was decisive
   */
  decisive: BooleanFlag.default(false),

  /**
   * Human explanation (optional but powerful in audits)
   */
  explanation: LongText.optional(),

  createdAt: DateTimeDefault,
});

/**
 * SupplierRawInputEvidenceSchema
 *
 * Converts raw supplier text into first-class evidence.
 */
export const SupplierRawInputEvidenceSchema = z.object({
  /** Raw input ID from supplier system */
  rawInputId: SafeIdentifier,

  /** Corresponding evidence ID created */
  evidenceId: SafeIdentifier,

  /** Which text version was used */
  textVersionUsed: z.enum(["RAW", "TRANSLATED_EN"]),

  /** Whether human-approved at time of use */
  approvedAtUseTime: BooleanFlag,

  createdAt: DateTimeDefault,
});
