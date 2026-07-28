"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../../../lib/prisma";

interface PackageFormData {
  name: string;
  tagline: string;
  featured: boolean;
  price: number;
  includesPremiumHair: boolean;
  includedAddOnIds: string[];
  compatibleServiceIds: string[];
}

export async function createPackage(data: PackageFormData) {
  await prisma.package.create({
    data: {
      name: data.name,
      tagline: data.tagline,
      featured: data.featured,
      price: data.price,
      includesPremiumHair: data.includesPremiumHair,
      includedAddOns: { connect: data.includedAddOnIds.map((id) => ({ id })) },
      compatibleServices: { connect: data.compatibleServiceIds.map((id) => ({ id })) },
    },
  });
  revalidatePath("/admin/hair/packages");
  redirect("/admin/hair/packages");
}

export async function updatePackage(id: string, data: PackageFormData) {
  await prisma.package.update({
    where: { id },
    data: {
      name: data.name,
      tagline: data.tagline,
      featured: data.featured,
      price: data.price,
      includesPremiumHair: data.includesPremiumHair,
      includedAddOns: { set: data.includedAddOnIds.map((id) => ({ id })) },
      compatibleServices: { set: data.compatibleServiceIds.map((id) => ({ id })) },
    },
  });
  revalidatePath("/admin/hair/packages");
  redirect("/admin/hair/packages");
}

export async function deletePackage(id: string) {
  await prisma.package.delete({ where: { id } });
  revalidatePath("/admin/hair/packages");
}