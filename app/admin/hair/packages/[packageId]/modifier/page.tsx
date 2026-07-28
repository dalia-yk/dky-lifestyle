import { notFound } from "next/navigation";
import { PackageForm } from "@/components/admin/package-form";
import { prisma } from "../../../../../../lib/prisma";

interface EditPackagePageProps {
  params: Promise<{ packageId: string }>;
}

export default async function EditPackagePage({ params }: EditPackagePageProps) {
  const { packageId } = await params;
  const pkg = await prisma.package.findUnique({
    where: { id: packageId },
    include: { includedAddOns: true, compatibleServices: true },
  });

  if (!pkg) {
    notFound();
  }

  const allAddOns = await prisma.addOn.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } });
  const allServices = await prisma.service.findMany({
    where: { category: "COLLECTION" },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const initialValues = {
    name: pkg.name,
    tagline: pkg.tagline,
    featured: pkg.featured,
    price: pkg.price,
    includesPremiumHair: pkg.includesPremiumHair,
    includedAddOnIds: pkg.includedAddOns.map((a) => a.id),
    compatibleServiceIds: pkg.compatibleServices.map((s) => s.id),
  };

  return (
    <div>
      <h1 className="font-heading text-brand-ivory text-3xl mb-8">Modifier {pkg.name}</h1>
      <PackageForm
        packageId={pkg.id}
        initialValues={initialValues}
        allAddOns={allAddOns}
        allServices={allServices}
      />
    </div>
  );
}