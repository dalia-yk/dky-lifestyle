"use client";

import { motion } from "framer-motion";

export function Founder() {
  return (
    <section className="bg-brand-black py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-champagne/40 to-brand-mocha mb-8" />

          <span className="font-sans uppercase tracking-[0.3em] text-brand-champagne text-sm mb-4 block">
            La fondatrice
          </span>
          <h2 className="font-heading text-brand-ivory text-3xl md:text-4xl mb-6">
            Dalia
          </h2>
          <p className="font-sans text-brand-ivory/70 text-base leading-relaxed max-w-2xl">
            Fondatrice de DKY Lifestyle, Dalia a imaginé une marque où le
            savoir-faire artisanal rencontre l&apos;exigence du luxe moderne.
            Portée par une vision à long terme, elle bâtit aujourd&apos;hui un
            écosystème de marques appelé à grandir bien au-delà de ses
            débuts.
          </p>
        </motion.div>
      </div>
    </section>
  );
}