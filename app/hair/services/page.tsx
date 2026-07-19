import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { services } from "@/data/service";

export default function ServicesListPage() {
  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Nos services"
        description="Découvre chaque coiffure signature, pensée avec précision et savoir-faire."
      />

      <section className="bg-brand-black py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/hair/services/${service.slug}`}
              className={`group relative rounded-2xl overflow-hidden bg-gradient-to-br ${service.tone} border border-brand-champagne/20 hover:border-brand-champagne/50 transition-all p-6 h-64 flex flex-col justify-end`}
            >
              <h3 className="font-heading text-brand-ivory text-2xl mb-2">
                {service.name}
              </h3>
              <p className="font-sans text-brand-champagne text-sm mb-3">
                À partir de {service.priceFrom}$
              </p>
              <span className="inline-flex items-center gap-2 font-sans text-brand-ivory/70 text-sm group-hover:gap-3 transition-all">
                Voir les détails
                <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}