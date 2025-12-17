// schemas/auth.ts
import { z } from "zod";
import { UserRole } from "./enums";

/* -----------------------------
 * SHARED FIELDS
 * ----------------------------- */
const email = z.string().email("invalid_email").max(255);

const password = z.string().min(8, "password_too_short").max(128);

/* -----------------------------
 * LOGIN
 * ----------------------------- */
export const LoginSchema = z.object({
  email,
  password,
});

export type LoginInput = z.infer<typeof LoginSchema>;

/* -----------------------------
 * SIGNUP
 * ----------------------------- */
export const SignupSchema = z
  .object({
    email,

    password,

    confirmPassword: z.string(),

    fullName: z.string().min(2).max(100).optional(),

    username: z
      .string()
      .min(3)
      .max(32)
      .regex(/^[a-zA-Z0-9_]+$/, "invalid_username")
      .optional(),

    role: UserRole.default("EXPORTER"),

    preferredLang: z.string().min(2).max(10).default("en"),

    timezone: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwords_do_not_match",
  });

export type SignupInput = z.infer<typeof SignupSchema>;
