"use server";
import { prisma } from "@/lib/server/prisma";

export async function deleteSeedLot(id: string) {
  return prisma.seedLot.delete({
    where: { id },
  });
}
