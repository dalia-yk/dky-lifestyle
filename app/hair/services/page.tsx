import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { serviceCategories } from "@/data/service-categories";

export default function ServicesOverviewPage() {
  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Nos services"
        description="Coiffures, soins et expériences signature, pensés avec précision et savoir-faire."
      />

      <section className="bg-brand-black py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6">
          {serviceCategories.map((category) => (
            <Link
              key={category.slug}
              href={category.href}
              className={`group relative w-full sm:w-80 rounded-2xl overflow-hidden bg-gradient-to-br ${category.tone} border border-brand-champagne/20 hover:border-brand-champagne/50 transition-all p-8 h-56 flex flex-col justify-end`}
            >
              <h3 className="font-heading text-brand-ivory text-2xl mb-2">
                {category.title}
              </h3>
              <p className="font-sans text-brand-ivory/60 text-sm mb-3">
                {category.tagline}
              </p>
              <span className="inline-flex items-center gap-2 font-sans text-brand-champagne text-sm group-hover:gap-3 transition-all">
                Découvrir
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