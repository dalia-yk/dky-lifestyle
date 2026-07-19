import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { productCategories } from "@/data/product-categories";

export default function BoutiqueOverviewPage() {
  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Boutique DKY Hair"
        description="Des produits sélectionnés avec soin pour préserver la beauté et la santé de vos cheveux."
      />

      <section className="bg-brand-black py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6">
          {productCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/hair/boutique/${category.slug}`}
              className="group w-full sm:w-72 rounded-2xl border border-brand-champagne/20 hover:border-brand-champagne/50 transition-all p-8 flex flex-col items-center text-center"
            >
              <h3 className="font-heading text-brand-ivory text-xl mb-2">
                {category.title}
              </h3>
              <p className="font-sans text-brand-ivory/60 text-sm mb-4">
                {category.tagline}
              </p>
              <span className="inline-flex items-center gap-2 font-sans text-brand-champagne text-sm group-hover:gap-3 transition-all">
                Explorer
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