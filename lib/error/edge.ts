// apps/web/lib/error/edge.ts
import { logger } from "../log/edge";

/** Represents any unknown error type */
export type UnknownError = unknown;

/** Standardized error payload for logging and frontend usage */
export interface ErrorPayload {
  /** Human-readable error message */
  message: string;
  /** Original error object or value */
  cause?: unknown;
  /** Timestamp of when the error occurred */
  timestamp: string;
}

/**
 * Extracts a human-readable message from any unknown error
 *
 * @param err - The unknown error to process
 * @returns A string message
 */
export const getErrorMessage = (err: UnknownError): string =>
  err instanceof Error
    ? err.message
    : typeof err === "string"
    ? err
    : "An unknown error occurred";

/**
 * Handles and logs an unknown error in Edge / Worker environments.
 * Uses the safe console-based logger to prevent worker crashes.
 *
 * @param err - The unknown error to handle
 * @param msg - Optional contextual message describing the error
 * @returns A standardized `ErrorPayload` object
 */
export function handleError(err: UnknownError, msg?: string): ErrorPayload {
  const payload: ErrorPayload = {
    message: getErrorMessage(err),
    cause: err,
    timestamp: new Date().toISOString(),
  };

  // Log safely in Edge/Worker context
  logger.error(msg ?? "Edge/Worker error captured", payload);

  return payload;
}

/**
 * Throws an error after logging it.
 * Ensures the original error type is preserved if possible.
 *
 * @param err - The unknown error to throw
 * @param msg - Optional contextual message
 * @throws Error
 */
export function throwError(err: UnknownError, msg?: string): never {
  handleError(err, msg);
  throw err instanceof Error ? err : new Error(getErrorMessage(err));
}
