import { notFound } from "next/navigation";
import { Clock, DollarSign } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { hairCareItems } from "@/data/hair-care";

interface HairCareDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function HairCareDetailPage({
  params,
}: HairCareDetailProps) {
  const { slug } = await params;
  const item = hairCareItems.find((i) => i.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main>
      <Navbar />

      <section className={`bg-gradient-to-br ${item.tone} pt-40 pb-20 px-6`}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-sans uppercase tracking-[0.3em] text-brand-champagne text-sm mb-4 block">
            Soins Capillaires
          </span>
          <h1 className="font-heading text-brand-ivory text-5xl md:text-6xl mb-4">
            {item.name}
          </h1>
          <p className="font-sans text-brand-ivory/70 text-base md:text-lg">
            {item.tagline}
          </p>
        </div>
      </section>

      <section className="bg-brand-ivory py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-brand-mocha/80 text-base leading-relaxed mb-12">
            {item.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/60 border border-brand-champagne/20">
              <Clock className="text-brand-champagne mb-3" size={24} />
              <p className="font-sans text-brand-black text-sm font-medium mb-1">
                Durée estimée
              </p>
              <p className="font-sans text-brand-mocha/70 text-sm">
                {item.duration}
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/60 border border-brand-champagne/20">
              <DollarSign className="text-brand-champagne mb-3" size={24} />
              <p className="font-sans text-brand-black text-sm font-medium mb-1">
                À partir de
              </p>
              <p className="font-sans text-brand-mocha/70 text-sm">
                {item.priceFrom}$
              </p>
            </div>
          </div>

          <Button className="bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full px-8 py-6 text-base">
            Réserver ce soin
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export function generateStaticParams() {
  return hairCareItems.map((item) => ({ slug: item.slug }));
}