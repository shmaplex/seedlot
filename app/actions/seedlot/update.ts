"use server";
import { prisma } from "@/lib/server/prisma";
import type { SeedLotUpdate } from "@/schemas/seedlot.schema";

export async function updateSeedLot(id: string, data: SeedLotUpdate) {
  if (data.biology) {
    await prisma.seedBiology.update({
      where: { id: data.biology.id },
      data: { ...data.biology },
    });
  }

  const seedLot = await prisma.seedLot.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });

  return seedLot;
}
