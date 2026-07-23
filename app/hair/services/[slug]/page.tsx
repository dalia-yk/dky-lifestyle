import { notFound } from "next/navigation";
import { Clock, DollarSign, Sparkles } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { prisma } from "../../../../lib/prisma";

interface ServiceDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { slug } = await params;
  const service = await prisma.service.findFirst({
    where: { slug, category: "COLLECTION" },
  });

  if (!service) {
    notFound();
  }

  return (
    <main>
      <Navbar />

      <section className="bg-gradient-to-br from-brand-mocha to-brand-black pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-sans uppercase tracking-[0.3em] text-brand-champagne text-sm mb-4 block">
            Collections
          </span>
          <h1 className="font-heading text-brand-ivory text-5xl md:text-6xl mb-4">
            {service.name}
          </h1>
          <p className="font-sans text-brand-ivory/70 text-base md:text-lg">
            {service.tagline}
          </p>
        </div>
      </section>

      <section className="bg-brand-ivory py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-brand-mocha/80 text-base leading-relaxed mb-12">
            {service.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
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
          </div>

          {service.extensionsMode !== "NOT_ALLOWED" && (
            <div className="flex items-center gap-2 mb-8 text-brand-champagne">
              <Sparkles size={16} />
              <span className="font-sans text-sm">
                Mèches disponibles sur demande
              </span>
            </div>
          )}

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

export async function generateStaticParams() {
  const services = await prisma.service.findMany({
    where: { category: "COLLECTION" },
    select: { slug: true },
  });
  return services.map((service) => ({ slug: service.slug }));
}