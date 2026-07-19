import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { hairCareItems } from "@/data/hair-care";

export default function HairCarePage() {
  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Soins Capillaires"
        description="Des soins pensés pour la santé et la beauté de tes cheveux, à chaque étape."
      />

      <section className="bg-brand-black py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hairCareItems.map((item) => (
            <Link
              key={item.slug}
              href={`/hair/services/hair-care/${item.slug}`}
              className={`group relative rounded-2xl overflow-hidden bg-gradient-to-br ${item.tone} border border-brand-champagne/20 hover:border-brand-champagne/50 transition-all p-6 h-56 flex flex-col justify-end`}
            >
              <h3 className="font-heading text-brand-ivory text-xl mb-1">
                {item.name}
              </h3>
              <p className="font-sans text-brand-champagne text-sm mb-2">
                À partir de {item.priceFrom}$
              </p>
              <span className="inline-flex items-center gap-2 font-sans text-brand-ivory/70 text-xs group-hover:gap-3 transition-all">
                Voir les détails
                <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}