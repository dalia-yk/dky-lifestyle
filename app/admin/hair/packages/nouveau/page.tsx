import { PackageForm } from "@/components/admin/package-form";
import { prisma } from "../../../../../lib/prisma";

export default async function NewPackagePage() {
  const allAddOns = await prisma.addOn.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } });
  const allServices = await prisma.service.findMany({
    where: { category: "COLLECTION" },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1 className="font-heading text-brand-ivory text-3xl mb-8">Nouveau forfait</h1>
      <PackageForm allAddOns={allAddOns} allServices={allServices} />
    </div>
  );
}