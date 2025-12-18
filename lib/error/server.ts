// apps/web/lib/error/server.ts
import { logger } from "../log/server";

export type UnknownError = unknown;

export interface ErrorPayload {
  message: string;
  cause?: unknown;
  timestamp: string;
}

export const getErrorMessage = (err: UnknownError): string =>
  err instanceof Error
    ? err.message
    : typeof err === "string"
    ? err
    : "An unknown error occurred";

/**
 * Handles and logs an unknown error in Node.js server environments.
 *
 * @param err - The unknown error to handle
 * @param msg - Optional custom message describing the context
 * @returns Standardized error payload
 */
export function handleError(err: UnknownError, msg?: string): ErrorPayload {
  const payload: ErrorPayload = {
    message: getErrorMessage(err),
    cause: err,
    timestamp: new Date().toISOString(),
  };

  // Pino expects first argument to be an object with metadata, second is message
  logger.error({ err, payload }, msg ?? "Server-side error captured");

  return payload;
}

/**
 * Throws an error after logging it.
 *
 * @param err - The unknown error to throw
 * @param msg - Optional context message
 * @throws Error
 */
export function throwError(err: UnknownError, msg?: string): never {
  handleError(err, msg);
  throw err instanceof Error ? err : new Error(getErrorMessage(err));
}
