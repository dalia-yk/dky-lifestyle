import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "../../../../lib/prisma";
import { DeletePackageButton } from "@/components/admin/delete-package-button";

export default async function AdminPackagesPage() {
  const packages = await prisma.package.findMany({
    include: { includedAddOns: true, compatibleServices: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-brand-ivory text-3xl">Forfaits</h1>
        <Link href="/admin/hair/packages/nouveau">
          <button className="flex items-center gap-2 bg-brand-champagne text-brand-black text-sm font-sans px-4 py-2 rounded-full hover:bg-brand-champagne/90 transition-colors">
            <Plus size={16} />
            Nouveau forfait
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white/5 border border-brand-champagne/20 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-brand-ivory text-lg">{pkg.name}</h3>
                  {pkg.featured && (
                    <span className="text-xs uppercase tracking-widest bg-brand-champagne text-brand-black px-2 py-0.5 rounded-full">
                      Populaire
                    </span>
                  )}
                </div>
                <p className="font-sans text-brand-ivory/50 text-sm">{pkg.tagline}</p>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/admin/hair/packages/${pkg.id}/modifier`}
                  className="font-sans text-brand-champagne text-xs hover:underline"
                >
                  Modifier
                </Link>
                <DeletePackageButton packageId={pkg.id} packageName={pkg.name} />
              </div>
            </div>
            <p className="font-sans text-brand-champagne text-sm mb-2">Prix : {pkg.price}$</p>
            <p className="font-sans text-brand-ivory/60 text-xs">
              Inclus : {pkg.includedAddOns.map((a) => a.name).join(", ") || "Aucun"}
              {pkg.includesPremiumHair && " + Mèches premium"}
            </p>
            <p className="font-sans text-brand-ivory/40 text-xs mt-1">
              Compatible avec {pkg.compatibleServices.length} service(s)
            </p>
          </div>
        ))}
        {packages.length === 0 && (
          <p className="text-center font-sans text-brand-ivory/50 text-sm py-12">
            Aucun forfait pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}