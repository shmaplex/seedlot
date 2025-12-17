// schemas/profile.schema.ts
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
 * Full Profile row as stored in DB
 */
export const ProfileSchema = z.object({
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

export type UserProfile = z.infer<typeof ProfileSchema>;

export const ProfileUpdateSchema = z.object({
  fullName: z.string().nullable().optional(),
  username: z.string().nullable().optional(),
  avatarUrl: z.string().url().nullable().optional(),
  preferredLang: z.string().optional(),
  timezone: z.string().nullable().optional(),
  settings: z.record(z.string(), z.unknown()).nullable().optional(),
});

export type ProfileUpdateInput = z.infer<typeof ProfileUpdateSchema>;
