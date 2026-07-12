"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Award, Users } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Excellence",
    description:
      "Chaque coiffure est réalisée avec précision et passion, sans compromis sur la qualité.",
  },
  {
    icon: Heart,
    title: "Authenticité",
    description:
      "Une expérience pensée pour toi, qui célèbre ta beauté naturelle et ton identité.",
  },
  {
    icon: Award,
    title: "Savoir-faire",
    description:
      "Des techniques maîtrisées et un souci du détail digne des plus grandes maisons.",
  },
  {
    icon: Users,
    title: "Communauté",
    description:
      "Une clientèle fidèle, choyée à chaque visite, dans une ambiance chaleureuse et luxueuse.",
  },
];

export function WhyDky() {
  return (
    <section className="bg-brand-ivory py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-sans uppercase tracking-[0.3em] text-brand-champagne text-sm mb-4 block">
            Pourquoi DKY Hair
          </span>
          <h2 className="font-heading text-brand-black text-4xl md:text-5xl mb-6">
            Une expérience pensée pour toi
          </h2>
          <p className="font-sans text-brand-mocha/70 text-base md:text-lg max-w-2xl mx-auto">
            Plus qu&apos;un salon, DKY Hair est un lieu où le luxe rencontre
            l&apos;authenticité, et où chaque cliente repart transformée.
          </p>
        </motion.div>

        {/* Grille des valeurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/60 border border-brand-champagne/20 hover:shadow-lg hover:border-brand-champagne/50 transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-brand-champagne/10 flex items-center justify-center mb-5">
                <value.icon className="text-brand-champagne" size={26} />
              </div>
              <h3 className="font-heading text-brand-black text-xl mb-3">
                {value.title}
              </h3>
              <p className="font-sans text-brand-mocha/70 text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}