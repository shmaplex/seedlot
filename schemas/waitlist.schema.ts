// schemas/waitlist.schema.ts
import { z } from "zod";

/**
 * Base schema — core WaitlistSignup fields
 */
export const WaitlistBaseSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  interest: z.string().optional(),
  importance: z.number().min(1).max(5).default(1), // how relevant / valuable this lead is
  source: z.string().optional(), // where they heard about us (social, site, referral)
  notes: z.string().optional(), // optional freeform notes
  createdAt: z.date(), // populated by DB
});

/**
 * Reference schema — minimal info for embedding elsewhere
 */
export const WaitlistReferenceSchema = WaitlistBaseSchema.pick({
  id: true,
  email: true,
  name: true,
  importance: true,
});

/**
 * Create schema — for public submissions
 */
export const WaitlistCreateSchema = z.object({
  email: z.email(),
  name: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  interest: z.string().optional(),
  source: z.string().optional(),
  importance: z.number().min(1).max(5).optional(),
  notes: z.string().optional(),
});

/**
 * Detailed schema — internal use only (admin views)
 */
export const WaitlistDetailedSchema = WaitlistBaseSchema.extend({
  updatedAt: z.date().optional(),
});

// Types
export type WaitlistBase = z.infer<typeof WaitlistBaseSchema>;
export type WaitlistReference = z.infer<typeof WaitlistReferenceSchema>;
export type WaitlistCreate = z.infer<typeof WaitlistCreateSchema>;
export type WaitlistDetailed = z.infer<typeof WaitlistDetailedSchema>;
