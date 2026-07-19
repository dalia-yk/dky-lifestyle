"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { galleryItems } from "@/data/gallery-items";

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

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

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
          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
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

          {/* Grille filtrée */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`relative rounded-2xl overflow-hidden h-56 md:h-64 bg-gradient-to-br ${item.tone} flex items-end p-4`}
              >
                <span className="font-sans text-brand-ivory/80 text-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <p className="text-center font-sans text-brand-ivory/50 text-sm py-12">
              Aucune photo dans cette catégorie pour le moment.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
