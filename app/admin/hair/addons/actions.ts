"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../../../lib/prisma";

export async function createAddOn(name: string, price: number) {
  await prisma.addOn.create({ data: { name, price } });
  revalidatePath("/admin/hair/addons");
  redirect("/admin/hair/addons");
}

export async function updateAddOn(id: string, name: string, price: number) {
  await prisma.addOn.update({ where: { id }, data: { name, price } });
  revalidatePath("/admin/hair/addons");
  redirect("/admin/hair/addons");
}

export async function deleteAddOn(id: string) {
  await prisma.addOn.delete({ where: { id } });
  revalidatePath("/admin/hair/addons");
}