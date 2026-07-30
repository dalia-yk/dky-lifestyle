"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PAGE_SIZE = 3;

interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  priceFrom: number;
  imageUrl?: string | null;
}

interface ServiceGridProps {
  title: string;
  services: ServiceItem[];
}

export function ServiceGrid({ title, services }: ServiceGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (services.length === 0) return null;

  const totalPages = Math.max(1, Math.ceil(services.length / PAGE_SIZE));
  const paginatedServices = services.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="mb-20">
      <h2 className="font-heading text-brand-ivory text-3xl mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedServices.map((service) => (
          <Link
            key={service.id}
            href={`/hair/services/${service.slug}`}
            style={
              service.imageUrl
                ? { backgroundImage: `url(${service.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
                : undefined
            }
            className={`group relative rounded-2xl overflow-hidden border border-brand-champagne/20 hover:border-brand-champagne/50 transition-all p-6 h-56 flex flex-col justify-end ${
              !service.imageUrl ? "bg-gradient-to-br from-brand-mocha to-brand-black" : ""
            }`}
          >
            {service.imageUrl && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            )}
            <div className="relative z-10">
              <h3 className="font-heading text-brand-ivory text-xl mb-1">{service.name}</h3>
              <p className="font-sans text-brand-champagne text-sm mb-2">
                À partir de {service.priceFrom}$
              </p>
              <span className="inline-flex items-center gap-2 font-sans text-brand-ivory/70 text-xs group-hover:gap-3 transition-all">
                Voir les détails
                <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-xs font-sans text-brand-champagne hover:underline disabled:text-brand-ivory/20 disabled:no-underline"
          >
            ← Précédent
          </button>
          <span className="text-xs font-sans text-brand-ivory/40">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-xs font-sans text-brand-champagne hover:underline disabled:text-brand-ivory/20 disabled:no-underline"
          >
            Suivant →
          </button>
        </div>
      )}
    </div>
  );
}