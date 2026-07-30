"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { galleryItems } from "@/data/gallery-items";

const PAGE_SIZE = 6;

const filters = [
  { value: "all", label: "Tout" },
  { value: "braids", label: "Braids" },
  { value: "twist", label: "Twist" },
  { value: "locs", label: "Locs" },
  { value: "kids", label: "Kids" },
  { value: "men", label: "Men" },
  { value: "before-after", label: "Avant / Après" },
] as const;

export default function GaleriePage() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]["value"]>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function handleFilterChange(value: (typeof filters)[number]["value"]) {
    setActiveFilter(value);
    setCurrentPage(1);
  }

  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Galerie"
        description="Des créations Crafted by Purpose, capturées dans le détail."
      />

      <section className="bg-brand-black py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterChange(filter.value)}
                className={`px-5 py-2 rounded-full text-sm font-sans uppercase tracking-wide transition-colors ${
                  activeFilter === filter.value
                    ? "bg-brand-champagne text-brand-black"
                    : "border border-brand-ivory/20 text-brand-ivory/70 hover:border-brand-champagne/50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {paginatedItems.map((item) => (
              <div
                key={item.id}
                className={`relative rounded-2xl overflow-hidden h-56 md:h-64 bg-gradient-to-br ${item.tone} flex items-end p-4`}
              >
                <span className="font-sans text-brand-ivory/80 text-sm">{item.label}</span>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <p className="text-center font-sans text-brand-ivory/50 text-sm py-12">
              Aucune photo dans cette catégorie pour le moment.
            </p>
          )}

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
        </div>
      </section>

      <Footer />
    </main>
  );
}