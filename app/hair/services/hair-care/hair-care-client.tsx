"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";

const PAGE_SIZE = 6;

interface HairCareItem {
  id: string;
  slug: string;
  name: string;
  priceFrom: number;
  imageUrl: string | null;
}

export default function HairCarePage({ items }: { items: HairCareItem[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const paginatedItems = items.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Soins & Préparation"
        description="Des soins et une préparation pensés pour la santé et la beauté de tes cheveux, à chaque étape."
      />

      <section className="bg-brand-black py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedItems.map((item) => (
            <Link
              key={item.id}
              href={`/hair/services/hair-care/${item.slug}`}
              style={
                item.imageUrl
                  ? { backgroundImage: `url(${item.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
                  : undefined
              }
              className={`group relative rounded-2xl overflow-hidden border border-brand-champagne/20 hover:border-brand-champagne/50 transition-all p-6 h-56 flex flex-col justify-end ${
                !item.imageUrl ? "bg-gradient-to-br from-brand-mocha to-brand-black" : ""
              }`}
            >
              {item.imageUrl && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              )}
              <div className="relative z-10">
                <h3 className="font-heading text-brand-ivory text-xl mb-1">{item.name}</h3>
                <p className="font-sans text-brand-champagne text-sm mb-2">
                  À partir de {item.priceFrom}$
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
          <div className="flex justify-center items-center gap-4 mt-10">
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
      </section>

      <Footer />
    </main>
  );
}