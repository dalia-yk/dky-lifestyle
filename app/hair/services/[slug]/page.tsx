import { notFound } from "next/navigation";
import { Clock, DollarSign, Sparkles } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { services, Service } from "@/data/service";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s: Service) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <Navbar />

      {/* Bannière visuelle */}
      <section
        className={`bg-gradient-to-br ${service.tone} pt-40 pb-20 px-6`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-sans uppercase tracking-[0.3em] text-brand-champagne text-sm mb-4 block">
            DKY Hair
          </span>
          <h1 className="font-heading text-brand-ivory text-5xl md:text-6xl mb-4">
            {service.name}
          </h1>
          <p className="font-sans text-brand-ivory/70 text-base md:text-lg">
            {service.tagline}
          </p>
        </div>
      </section>

      {/* Détails */}
      <section className="bg-brand-ivory py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-brand-mocha/80 text-base leading-relaxed mb-12">
            {service.description}
          </p>

          {/* Infos clés */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/60 border border-brand-champagne/20">
              <Clock className="text-brand-champagne mb-3" size={24} />
              <p className="font-sans text-brand-black text-sm font-medium mb-1">
                Durée estimée
              </p>
              <p className="font-sans text-brand-mocha/70 text-sm">
                {service.duration}
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/60 border border-brand-champagne/20">
              <DollarSign className="text-brand-champagne mb-3" size={24} />
              <p className="font-sans text-brand-black text-sm font-medium mb-1">
                À partir de
              </p>
              <p className="font-sans text-brand-mocha/70 text-sm">
                {service.priceFrom}$
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/60 border border-brand-champagne/20">
              <Sparkles className="text-brand-champagne mb-3" size={24} />
              <p className="font-sans text-brand-black text-sm font-medium mb-1">
                Mèches
              </p>
              <p className="font-sans text-brand-mocha/70 text-sm">
                {service.withExtensions
                  ? "Avec ou sans mèches"
                  : "Sans mèches"}
              </p>
            </div>
          </div>

          {/* Services complémentaires */}
          <div className="mb-12">
            <h3 className="font-heading text-brand-black text-2xl mb-4">
              Services complémentaires
            </h3>
            <div className="flex flex-wrap gap-3">
              {service.addons.map((addon) => (
                <span
                  key={addon}
                  className="font-sans text-sm text-brand-mocha bg-brand-champagne/10 border border-brand-champagne/30 rounded-full px-4 py-2"
                >
                  {addon}
                </span>
              ))}
            </div>
          </div>

          <Link href={`/hair/reservation?serviceId=${service.id}`}>
            <Button className="bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full px-8 py-6 text-base">
              Réserver ce service
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export function generateStaticParams() {
  return services.map((service: Service) => ({ slug: service.slug }));
}