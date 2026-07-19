"use client";

import { motion } from "framer-motion";
import { Gem, Palette, Rocket } from "lucide-react";

const pillars = [
  {
    icon: Gem,
    title: "Excellence",
    description:
      "Nous visons l'excellence dans chaque détail, afin d'offrir des services et des expériences qui dépassent les attentes.",
  },
  {
    icon: Palette,
    title: "Creativity",
    description:
      "Nous croyons que la créativité est au cœur de chaque projet et qu'elle donne vie à des expériences uniques.",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description:
      "Nous adoptons l'innovation pour faire évoluer nos services, améliorer l'expérience de nos clients et préparer l'avenir de DKY Lifestyle.",
  },
];

export function Pillars() {
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
            Nos piliers
          </span>
          <h2 className="font-heading text-brand-ivory text-4xl md:text-5xl">
            Les trois piliers de DKY Lifestyle
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-8 rounded-2xl border border-brand-champagne/20 hover:border-brand-champagne/50 transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-brand-champagne/10 flex items-center justify-center mb-5">
                <pillar.icon className="text-brand-champagne" size={26} />
              </div>
              <h3 className="font-heading text-brand-ivory text-xl mb-3">
                {pillar.title}
              </h3>
              <p className="font-sans text-brand-ivory/60 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}