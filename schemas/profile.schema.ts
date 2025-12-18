import { z } from "zod";

/**
 * Must match Prisma enum UserRole exactly
 */
export const UserRoleSchema = z.enum([
  "EXPORTER",
  "SUPPLIER",
  "INSPECTOR",
  "INTERNAL",
  "IMPORTER",
]);

export type UserRole = z.infer<typeof UserRoleSchema>;

/**
 * Base schema — core profile fields
 */
export const ProfileBaseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string().nullable(),
  username: z.string().nullable(),
  avatarUrl: z.string().url().nullable(),
  role: UserRoleSchema,
  permissions: z.record(z.string(), z.unknown()).nullable(),
  preferredLang: z.string().nullable(),
  timezone: z.string().nullable(),
  settings: z.record(z.string(), z.unknown()).nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

/**
 * Reference schema — minimal info for embedding elsewhere
 */
export const ProfileReferenceSchema = ProfileBaseSchema.pick({
  id: true,
  fullName: true,
  username: true,
  role: true,
  avatarUrl: true,
});

/**
 * Create schema — for new profile creation
 */
export const ProfileCreateSchema = z.object({
  email: z.string().email(),
  fullName: z.string().nullable().optional(),
  username: z.string().nullable().optional(),
  avatarUrl: z.string().url().nullable().optional(),
  role: UserRoleSchema,
  preferredLang: z.string().nullable().optional(),
  timezone: z.string().nullable().optional(),
  settings: z.record(z.string(), z.unknown()).nullable().optional(),
});

/**
 * Update schema — partial updates allowed
 */
export const ProfileUpdateSchema = ProfileCreateSchema.partial();

/**
 * Detailed schema — internal/admin view with all fields
 */
export const ProfileDetailedSchema = ProfileBaseSchema.extend({});

/** TypeScript types derived from Zod schemas */
export type ProfileBase = z.infer<typeof ProfileBaseSchema>;
export type ProfileReference = z.infer<typeof ProfileReferenceSchema>;
export type ProfileCreate = z.infer<typeof ProfileCreateSchema>;
export type ProfileUpdate = z.infer<typeof ProfileUpdateSchema>;
export type ProfileDetailed = z.infer<typeof ProfileDetailedSchema>;
