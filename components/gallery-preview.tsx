"use client";

import { motion } from "framer-motion";

const galleryItems = [
  { label: "Knotless Braids", tone: "from-brand-mocha to-brand-black" },
  { label: "Boho Braids", tone: "from-brand-champagne/40 to-brand-black" },
  { label: "Soft Locs", tone: "from-brand-black to-brand-mocha" },
  { label: "Événements DKY", tone: "from-brand-mocha to-brand-champagne/30" },
  { label: "Créations DKY Pastry", tone: "from-brand-black to-brand-champagne/20" },
  { label: "Moments DKY", tone: "from-brand-champagne/30 to-brand-mocha" },
];

export function GalleryPreview() {
  return (
    <section className="bg-brand-black py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-sans uppercase tracking-[0.3em] text-brand-champagne text-sm mb-4 block">
            Galerie
          </span>
          <h2 className="font-heading text-brand-ivory text-4xl md:text-5xl mb-6">
            Des moments Crafted by Purpose
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`relative rounded-2xl overflow-hidden h-48 md:h-64 bg-gradient-to-br ${item.tone} flex items-end p-4`}
            >
              <span className="font-sans text-brand-ivory/80 text-sm">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}