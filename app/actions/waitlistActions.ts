"use server";

import { throwError } from "@/lib/error/edge";
import { logger } from "@/lib/log/edge";
import { prisma } from "@/lib/server/prisma";
import {
  WaitlistCreateSchema,
  type WaitlistReference,
} from "@/schemas/waitlist.schema";

/**
 * Submit a new waitlist signup.
 */
export async function submitWaitlistAction(
  data: unknown,
): Promise<WaitlistReference> {
  try {
    const parsed = WaitlistCreateSchema.parse(data);

    const result = await prisma.waitlist.upsert({
      where: { email: parsed.email },
      update: {
        name: parsed.name ?? null,
        company: parsed.company ?? null,
        role: parsed.role ?? null,
        interest: parsed.interest ?? null,
        importance: parsed.importance ?? 1,
        source: parsed.source ?? null,
        notes: parsed.notes ?? null,
        updatedAt: new Date(),
      },
      create: {
        email: parsed.email,
        name: parsed.name ?? null,
        company: parsed.company ?? null,
        role: parsed.role ?? null,
        interest: parsed.interest ?? null,
        importance: parsed.importance ?? 1,
        source: parsed.source ?? null,
        notes: parsed.notes ?? null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    logger.info("Waitlist signup submitted", { email: parsed.email });

    // Convert nullable fields to undefined to satisfy WaitlistReference
    return {
      id: result.id,
      email: result.email,
      importance: result.importance,
      name: result.name ?? undefined,
    };
  } catch (err: unknown) {
    logger.error("Failed waitlist signup", { err });
    throw throwError(err, "Failed to submit waitlist signup");
  }
}
