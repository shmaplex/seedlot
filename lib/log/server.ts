// apps/web/lib/log/server.ts
import pino from "pino";

/**
 * Logger for Node.js server environments
 * - Uses pino for structured logging and performance
 */
export const logger = pino({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: { colorize: true, translateTime: "HH:MM:ss" },
        }
      : undefined,
});
