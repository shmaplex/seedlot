import { z } from "zod";
import { RegulatoryAssessmentStatus, RegulatoryPath, RiskClass } from "./enums";
import {
  CountryCode,
  DateTimeDefault,
  LongText,
  SafeCode,
  SafeIdentifier,
} from "./primitives";

/**
 * Base schema — core RegulatoryAssessment fields
 */
export const RegulatoryAssessmentBaseSchema = z.object({
  id: SafeIdentifier,
  seedLotId: SafeIdentifier,
  destinationCountry: CountryCode,
  regulatoryPath: RegulatoryPath,
  riskClass: RiskClass,
  justification: LongText,
  ruleSource: SafeCode,
  confidence: z.number().min(0).max(1).default(0.5),
  humanReviewed: z.boolean().default(false),
  overrideReason: LongText.optional(),
  rulesetVersion: SafeCode.optional(),
  assessedBy: SafeIdentifier.default("system"),
  assessedAt: DateTimeDefault,
  validUntil: DateTimeDefault,
  status: RegulatoryAssessmentStatus.default("PENDING"),
  archivedAt: DateTimeDefault.optional(),
  archivedById: SafeIdentifier.optional(),
  createdAt: DateTimeDefault,
  createdById: SafeIdentifier.optional(),
  updatedAt: DateTimeDefault,
  updatedById: SafeIdentifier.optional(),
});

/**
 * Reference schema — minimal info for embedding elsewhere
 */
export const RegulatoryAssessmentReferenceSchema =
  RegulatoryAssessmentBaseSchema.pick({
    id: true,
    seedLotId: true,
    regulatoryPath: true,
    riskClass: true,
    status: true,
  });

/**
 * Create schema — for new RegulatoryAssessment submissions
 */
export const RegulatoryAssessmentCreateSchema =
  RegulatoryAssessmentBaseSchema.omit({
    id: true,
    archivedAt: true,
    archivedById: true,
    createdAt: true,
    createdById: true,
    updatedAt: true,
    updatedById: true,
  });

/**
 * Update schema — partial updates allowed
 */
export const RegulatoryAssessmentUpdateSchema =
  RegulatoryAssessmentCreateSchema.partial();

/**
 * Detailed schema — internal/admin view with all fields
 */
export const RegulatoryAssessmentDetailedSchema =
  RegulatoryAssessmentBaseSchema.extend({});

/** TypeScript types derived from Zod schemas */
export type RegulatoryAssessmentBase = z.infer<
  typeof RegulatoryAssessmentBaseSchema
>;
export type RegulatoryAssessmentReference = z.infer<
  typeof RegulatoryAssessmentReferenceSchema
>;
export type RegulatoryAssessmentCreate = z.infer<
  typeof RegulatoryAssessmentCreateSchema
>;
export type RegulatoryAssessmentUpdate = z.infer<
  typeof RegulatoryAssessmentUpdateSchema
>;
export type RegulatoryAssessmentDetailed = z.infer<
  typeof RegulatoryAssessmentDetailedSchema
>;
