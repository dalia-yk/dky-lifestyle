"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] ?? null
  );
  const [selectedLength, setSelectedLength] = useState(
    product.lengths?.[0] ?? null
  );
  const [currentImage, setCurrentImage] = useState(0);

  const imageCount = product.imageCount ?? 1;

  function nextImage() {
    setCurrentImage((prev) => (prev + 1) % imageCount);
  }

  function prevImage() {
    setCurrentImage((prev) => (prev - 1 + imageCount) % imageCount);
  }

  return (
    <div className="rounded-2xl overflow-hidden bg-white/5 border border-brand-champagne/20 hover:border-brand-champagne/50 transition-all flex flex-col">
      {/* Carrousel photo */}
      <div className="relative h-48 bg-brand-mocha/30 flex items-center justify-center">
        <span className="font-sans uppercase tracking-widest text-brand-ivory/30 text-xs">
          Photo {currentImage + 1} / {imageCount}
        </span>

        {imageCount > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Photo précédente"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-brand-black/50 hover:bg-brand-black/80 text-brand-ivory rounded-full p-1.5 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextImage}
              aria-label="Photo suivante"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-black/50 hover:bg-brand-black/80 text-brand-ivory rounded-full p-1.5 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {Array.from({ length: imageCount }).map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i === currentImage
                      ? "bg-brand-champagne"
                      : "bg-brand-ivory/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-heading text-brand-ivory text-lg mb-2">
          {product.name}
        </h3>

        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: product.rating }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className="fill-brand-champagne text-brand-champagne"
            />
          ))}
        </div>

        <p className="font-sans text-brand-champagne text-base mb-4">
          À partir de {product.price}$
        </p>

        {/* Sélecteur de couleur */}
        {product.colors && (
          <div className="mb-4">
            <p className="font-sans text-brand-ivory/40 text-xs uppercase tracking-widest mb-2">
              Couleur : {selectedColor}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 rounded-full text-xs font-sans border transition-colors ${
                    selectedColor === color
                      ? "bg-brand-champagne text-brand-black border-brand-champagne"
                      : "border-brand-ivory/30 text-brand-ivory/70 hover:border-brand-champagne/50"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sélecteur de longueur */}
        {product.lengths && (
          <div className="mb-4">
            <p className="font-sans text-brand-ivory/40 text-xs uppercase tracking-widest mb-2">
              Longueur : {selectedLength}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.lengths.map((length) => (
                <button
                  key={length}
                  onClick={() => setSelectedLength(length)}
                  className={`px-3 py-1 rounded-full text-xs font-sans border transition-colors ${
                    selectedLength === length
                      ? "bg-brand-champagne text-brand-black border-brand-champagne"
                      : "border-brand-ivory/30 text-brand-ivory/70 hover:border-brand-champagne/50"
                  }`}
                >
                  {length}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.kitIncludes && (
          <ul className="mb-4 flex flex-col gap-1">
            {product.kitIncludes.map((piece) => (
              <li
                key={piece}
                className="font-sans text-brand-ivory/70 text-sm"
              >
                ✔ {piece}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto">
          <Button
            disabled={!product.available}
            className={
              product.available
                ? "bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full w-full"
                : "bg-brand-ivory/10 text-brand-ivory/40 rounded-full w-full cursor-not-allowed"
            }
          >
            {product.available ? "Ajouter au panier" : "Bientôt disponible"}
          </Button>
        </div>
      </div>
    </div>
  );
}