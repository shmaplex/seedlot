// app/actions/seedlot/read.ts
"use server";
import { prisma } from "@/lib/server/prisma";

export async function getSeedLotById(id: string) {
  return prisma.seedLot.findUnique({
    where: { id },
    include: { seedBiology: true },
  });
}

export async function getAllSeedLots(orgId: string) {
  return prisma.seedLot.findMany({
    where: { orgId },
    select: {
      id: true,
      lotCode: true,
      originCountry: true,
      seedUse: true,
      submissionStatus: true,
      riskClass: true, // add this
    },
    orderBy: { createdAt: "desc" },
  });
}
