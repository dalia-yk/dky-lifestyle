"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    text: "Une expérience incroyable du début à la fin. Le résultat dépasse mes attentes à chaque visite.",
    rating: 5,
  },
  {
    name: "Josiane T.",
    text: "Le souci du détail et la qualité du service sont vraiment au rendez-vous. Je recommande sans hésiter.",
    rating: 5,
  },
  {
    name: "Kimberly R.",
    text: "Une ambiance chaleureuse et professionnelle. On sent vraiment le luxe et le savoir-faire.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="bg-brand-ivory py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-sans uppercase tracking-[0.3em] text-brand-champagne text-sm mb-4 block">
            Avis
          </span>
          <h2 className="font-heading text-brand-black text-4xl md:text-5xl mb-6">
            Ce qu&apos;elles en disent
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/60 border border-brand-champagne/20 rounded-2xl p-8"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-brand-champagne text-brand-champagne"
                  />
                ))}
              </div>
              <p className="font-sans text-brand-mocha/80 text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <p className="font-heading text-brand-black text-lg">
                {testimonial.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}