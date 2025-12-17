import { z } from "zod";
import {
  BooleanFlag,
  DateTime,
  DateTimeDefault,
  SafeCode,
  SafeIdentifier,
} from "./primitives";

/**
 * Captures raw supplier-provided regulatory or biological text
 * with full provenance, translation, and review traceability.
 */
export const SupplierRawInputSchema = z.object({
  /**
   * Primary key if persisted
   */
  id: SafeIdentifier.optional(),

  /**
   * Original unmodified supplier text
   * (Korean by default, but not enforced)
   * Human- and regulator-facing → SafeCode
   */
  rawText: SafeCode,

  /**
   * ISO-like language code of the raw input
   * (Allows flexibility for edge cases)
   */
  rawLanguage: SafeIdentifier.default("ko"),

  /**
   * Normalized English translation used for downstream automation
   * Human- and regulator-facing → SafeCode
   */
  translatedEnglishText: SafeCode.optional(),

  /**
   * How the translation was produced
   */
  translationMethod: z.enum(["AI", "HUMAN", "HYBRID"]).optional(),

  /**
   * Model or service used for translation (if applicable)
   * e.g. "gpt-4o", "deepl", "naver-papago"
   * Human- and regulator-facing → SafeCode
   */
  translationProvider: SafeCode.optional(),

  /**
   * Confidence score from translation step
   * Allows filtering low-confidence automation
   */
  translationConfidence: z.number().min(0).max(1).optional(),

  /**
   * Whether a human has explicitly reviewed the translation
   */
  reviewedByHuman: BooleanFlag.default(false),

  /**
   * Identifier of reviewer (user, inspector, admin)
   */
  reviewedBy: SafeIdentifier.optional(),

  /**
   * Timestamp of human review
   */
  reviewedAt: DateTime,

  /**
   * Human comments about ambiguity, corrections, or concerns
   * Human- and regulator-facing → SafeCode
   */
  reviewerNotes: SafeCode.optional(),

  /**
   * Whether this input is considered authoritative
   * (locks downstream regulatory decisions)
   */
  approvedForUse: BooleanFlag.default(false),

  /**
   * When approval was granted
   */
  approvedAt: DateTime,

  /**
   * Source metadata for legal traceability
   */
  source: z.object({
    /**
     * Where the text came from
     */
    type: z.enum([
      "EMAIL",
      "PDF",
      "IMAGE",
      "CHAT",
      "FORM",
      "MANUAL_ENTRY",
      "OTHER",
    ]),

    /**
     * Optional filename, message ID, or document reference
     * Human- and regulator-facing → SafeCode
     */
    reference: SafeCode.optional(),
  }),

  /**
   * Hash of the raw text for tamper detection
   */
  contentHash: SafeIdentifier.optional(),

  /**
   * Timestamp when the raw input was captured
   */
  createdAt: DateTimeDefault,

  /**
   * Soft-deletion / invalidation flag
   * (never hard-delete regulatory evidence)
   */
  archived: BooleanFlag.default(false),
});
