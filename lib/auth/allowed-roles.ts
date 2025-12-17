// lib/auth/allowed-roles.ts
import { UserRole } from "@/lib/generated/prisma/enums";

export const PUBLIC_SIGNUP_ROLES: UserRole[] = [
  UserRole.EXPORTER,
  UserRole.IMPORTER,
  UserRole.SUPPLIER,
];
