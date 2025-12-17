// lib/auth/errors.ts
export const AUTH_ERROR_MAP: Record<string, string> = {
  otp_expired: "otp_expired",
  otp_invalid: "otp_invalid",
  access_denied: "access_denied",
  user_not_found: "user_not_found",
};
