"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../../lib/prisma";

export async function updateBusinessHours(
  dayOfWeek: number,
  isOpen: boolean,
  openTime: string,
  closeTime: string
) {
  await prisma.businessHours.upsert({
    where: { dayOfWeek },
    update: { isOpen, openTime, closeTime },
    create: { dayOfWeek, isOpen, openTime, closeTime },
  });
  revalidatePath("/admin/settings");
}

export async function addBlockedDate(date: string, reason: string) {
  await prisma.blockedDate.create({
    data: { date: new Date(date), reason: reason || null },
  });
  revalidatePath("/admin/settings");
}

export async function removeBlockedDate(id: string) {
  await prisma.blockedDate.delete({ where: { id } });
  revalidatePath("/admin/settings");
}