// app/actions/seedlot/create.ts
"use server";
import { prisma } from "@/lib/server/prisma";
import type { SeedLotCreate } from "@/schemas/seedlot.schema";

export async function createSeedLot(data: SeedLotCreate) {
  const seedBiology = await prisma.seedBiology.create({
    data: { ...data.biology },
  });

  const seedLot = await prisma.seedLot.create({
    data: {
      ...data,
      seedBiologyId: seedBiology.id,
      submissionStatus: "PENDING",
    },
  });

  return seedLot;
}
