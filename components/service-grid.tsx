import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  priceFrom: number;
  tone?: string | null;
}

interface ServiceGridProps {
  title: string;
  services: ServiceItem[];
}

export function ServiceGrid({ title, services }: ServiceGridProps) {
  if (services.length === 0) return null;

  return (
    <div className="mb-20">
      <h2 className="font-heading text-brand-ivory text-3xl mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/hair/services/${service.slug}`}
            className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-mocha to-brand-black border border-brand-champagne/20 hover:border-brand-champagne/50 transition-all p-6 h-56 flex flex-col justify-end"
          >
            <h3 className="font-heading text-brand-ivory text-xl mb-1">
              {service.name}
            </h3>
            <p className="font-sans text-brand-champagne text-sm mb-2">
              À partir de {service.priceFrom}$
            </p>
            <span className="inline-flex items-center gap-2 font-sans text-brand-ivory/70 text-xs group-hover:gap-3 transition-all">
              Voir les détails
              <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}