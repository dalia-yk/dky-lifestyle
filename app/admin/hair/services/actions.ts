"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../../../lib/prisma";

interface ServiceFormData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  priceFrom: number;
  priceWithoutExtensions: number | null;
  extensionFee: number;
  extensionsMode: "REQUIRED" | "OPTIONAL" | "NOT_ALLOWED";
  requiresLength: boolean;
  requiresSize: boolean;
  category: "COLLECTION" | "HAIR_CARE" | "PREPARATION";
  collection: string;
}

export async function createService(data: ServiceFormData) {
  await prisma.service.create({ data });
  revalidatePath("/admin/hair/services");
  redirect("/admin/hair/services");
}

export async function updateService(id: string, data: ServiceFormData) {
  await prisma.service.update({ where: { id }, data });
  revalidatePath("/admin/hair/services");
  redirect("/admin/hair/services");
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/hair/services");
}