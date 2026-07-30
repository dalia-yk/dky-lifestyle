import Link from "next/link";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { prisma } from "../../../../lib/prisma";
import { DeleteServiceButton } from "@/components/admin/delete-service-button";

const PAGE_SIZE = 10;

interface AdminServicesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminServicesPage({ searchParams }: AdminServicesPageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const totalCount = await prisma.service.count();
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const services = await prisma.service.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
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
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Photo</th>
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
                <td className="p-4">
                  {service.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-brand-champagne/10 flex items-center justify-center">
                      <span className="text-brand-ivory/20 text-xs">—</span>
                    </div>
                  )}
                </td>
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

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="font-sans text-brand-ivory/40 text-xs">
            Page {currentPage} / {totalPages} — {totalCount} services au total
          </p>
          <div className="flex gap-2">
            <Link
              href={`/admin/hair/services?page=${Math.max(1, currentPage - 1)}`}
              className={`flex items-center gap-1 text-xs font-sans px-3 py-1.5 rounded-lg border border-brand-champagne/20 ${
                currentPage === 1
                  ? "text-brand-ivory/20 pointer-events-none"
                  : "text-brand-ivory/70 hover:border-brand-champagne/50"
              }`}
            >
              <ChevronLeft size={14} /> Précédent
            </Link>
            <Link
              href={`/admin/hair/services?page=${Math.min(totalPages, currentPage + 1)}`}
              className={`flex items-center gap-1 text-xs font-sans px-3 py-1.5 rounded-lg border border-brand-champagne/20 ${
                currentPage === totalPages
                  ? "text-brand-ivory/20 pointer-events-none"
                  : "text-brand-ivory/70 hover:border-brand-champagne/50"
              }`}
            >
              Suivant <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}