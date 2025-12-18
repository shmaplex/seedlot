import { z } from "zod";
import {
  BooleanFlag,
  DateTimeDefault,
  LongText,
  SafeCode,
  SafeIdentifier,
} from "./primitives";

/**
 * Base schema — core Evidence fields
 */
export const EvidenceBaseSchema = z.object({
  /** System-assigned evidence ID */
  id: SafeIdentifier.optional(),

  /** Evidence category, used for weighting and UI presentation */
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

  /** Human-readable title (e.g., "Supplier pathogen declaration (KR)") */
  title: LongText,

  /** Primary content or summary (raw documents are referenced, not embedded) */
  summary: LongText.optional(),

  /** Source reference (lotCode, certificate number, permit, or internal reference) */
  sourceReference: SafeCode.optional(),

  /** Hash of original content (tamper detection) */
  contentHash: SafeIdentifier.optional(),

  /** Confidence score (esp. for AI-derived evidence) */
  confidence: z.number().min(0).max(1).optional(),

  /** Whether this evidence is authoritative (e.g., NPPO-issued vs supplier-claimed) */
  authoritative: BooleanFlag.default(false),

  /** Whether this evidence is currently valid (false if superseded or invalidated) */
  active: BooleanFlag.default(true),

  /** If superseded, points to newer evidence */
  supersededByEvidenceId: SafeIdentifier.optional(),

  /** Audit metadata */
  createdById: SafeIdentifier.optional(),
  updatedById: SafeIdentifier.optional(),
  createdAt: DateTimeDefault,
  updatedAt: DateTimeDefault,
  archivedAt: DateTimeDefault.optional(),

  /** Created by system vs human */
  createdBySystem: z.string().default("system"),
});

/**
 * Reference schema — minimal info for embedding elsewhere
 */
export const EvidenceReferenceSchema = EvidenceBaseSchema.pick({
  id: true,
  type: true,
  title: true,
  authoritative: true,
  active: true,
});

/**
 * Schema for creating new Evidence
 */
export const EvidenceCreateSchema = EvidenceBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  archivedAt: true,
});

/**
 * Schema for updating Evidence — partial allowed
 */
export const EvidenceUpdateSchema = EvidenceCreateSchema.partial();

/**
 * Detailed schema — internal/admin view
 */
export const EvidenceDetailedSchema = EvidenceBaseSchema.extend({});

/** TypeScript types */
export type EvidenceBase = z.infer<typeof EvidenceBaseSchema>;
export type EvidenceReference = z.infer<typeof EvidenceReferenceSchema>;
export type EvidenceCreate = z.infer<typeof EvidenceCreateSchema>;
export type EvidenceUpdate = z.infer<typeof EvidenceUpdateSchema>;
export type EvidenceDetailed = z.infer<typeof EvidenceDetailedSchema>;

/**
 * EvidenceLinkSchema — links evidence to any entity
 */
export const EvidenceLinkSchema = z.object({
  /** System-assigned link ID */
  id: SafeIdentifier.optional(),

  /** Evidence being referenced */
  evidenceId: SafeIdentifier,

  /** What kind of entity this evidence supports */
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

  /** Role of this evidence */
  role: z.enum([
    "PRIMARY_JUSTIFICATION",
    "SUPPORTING",
    "REFERENCE",
    "CONTRADICTORY",
  ]),

  /** Optional weight (0–1) used for automated scoring */
  weight: z.number().min(0).max(1).default(1),

  /** Whether this link was created automatically or manually */
  linkedBy: z.enum(["SYSTEM", "HUMAN"]).default("SYSTEM"),

  /** Free-form notes explaining relevance */
  notes: LongText.optional(),

  /** Audit metadata */
  createdAt: DateTimeDefault,
});

/**
 * DecisionBasisSchema — records which evidence items justified a regulatory decision
 */
export const DecisionBasisSchema = z.object({
  /** System-assigned ID */
  id: SafeIdentifier.optional(),

  /** Regulatory assessment being justified */
  regulatoryAssessmentId: SafeIdentifier,

  /** Evidence used */
  evidenceId: SafeIdentifier,

  /** What aspect this evidence justified */
  justificationAspect: z.enum([
    "BIOLOGICAL_IDENTITY",
    "PATHOGEN_STATUS",
    "ORIGIN_COUNTRY",
    "INTENDED_USE",
    "LEGAL_EXCLUSION",
    "PERMIT_ELIGIBILITY",
    "RISK_CLASSIFICATION",
  ]),

  /** Whether this evidence was decisive */
  decisive: BooleanFlag.default(false),

  /** Human explanation (optional but powerful in audits) */
  explanation: LongText.optional(),

  /** Audit metadata */
  createdAt: DateTimeDefault,
});

/**
 * SupplierRawInputEvidenceSchema — converts raw supplier text into first-class evidence
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

  /** Audit metadata */
  createdAt: DateTimeDefault,
});
