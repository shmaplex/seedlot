// apps/web/lib/log/edge.ts
/**
 * Safely serialize objects for logging
 * @param obj Any value
 */
function safeSerialize(obj: unknown): string {
  try {
    if (obj === undefined) return "undefined";
    if (obj === null) return "null";
    if (typeof obj === "object") return JSON.stringify(obj);
    return String(obj);
  } catch {
    return "[unserializable]";
  }
}

/**
 * Logger for Edge / Worker / Server Action environments
 * - Fallback to console logging
 */
export const logger = {
  info: (msg: string, obj?: unknown) =>
    console.log("[INFO]", msg, obj !== undefined ? safeSerialize(obj) : ""),
  warn: (msg: string, obj?: unknown) =>
    console.warn("[WARN]", msg, obj !== undefined ? safeSerialize(obj) : ""),
  error: (msg: string, obj?: unknown) =>
    console.error("[ERROR]", msg, obj !== undefined ? safeSerialize(obj) : ""),
  debug: (msg: string, obj?: unknown) =>
    console.debug("[DEBUG]", msg, obj !== undefined ? safeSerialize(obj) : ""),
};
