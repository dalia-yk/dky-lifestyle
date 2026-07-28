import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "../../../../lib/prisma";
import { DeleteServiceButton } from "@/components/admin/delete-service-button";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  const categoryLabels = {
    COLLECTION: "Collections",
    HAIR_CARE: "Soins Capillaires",
    PREPARATION: "Préparation",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-brand-ivory text-3xl">Services</h1>
        <Link href="/admin/hair/services/nouveau">
          <button className="flex items-center gap-2 bg-brand-champagne text-brand-black text-sm font-sans px-4 py-2 rounded-full hover:bg-brand-champagne/90 transition-colors">
            <Plus size={16} />
            Nouveau service
          </button>
        </Link>
      </div>

      <div className="bg-white/5 border border-brand-champagne/20 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-brand-champagne/20">
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Nom</th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Catégorie</th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Prix</th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Durée</th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b border-brand-champagne/10 last:border-0">
                <td className="font-sans text-brand-ivory text-sm p-4">{service.name}</td>
                <td className="font-sans text-brand-ivory/70 text-sm p-4">
                  {categoryLabels[service.category]}
                </td>
                <td className="font-sans text-brand-champagne text-sm p-4">{service.priceFrom}$</td>
                <td className="font-sans text-brand-ivory/70 text-sm p-4">{service.duration}</td>
                <td className="p-4">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/hair/services/${service.id}/modifier`}
                      className="font-sans text-brand-champagne text-xs hover:underline"
                    >
                      Modifier
                    </Link>
                    <DeleteServiceButton serviceId={service.id} serviceName={service.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {services.length === 0 && (
          <p className="text-center font-sans text-brand-ivory/50 text-sm py-12">
            Aucun service pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}