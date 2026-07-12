"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const divisions = [
  {
    name: "DKY Hair",
    tagline: "Premium Braiding & Hair Care",
    status: "active" as const,
    href: "/hair",
  },
  {
    name: "DKY Pastry",
    tagline: "Luxury Cakes & Desserts",
    status: "soon" as const,
    href: "/pastry",
  },
];

export function Divisions() {
  return (
    <section id="divisions" className="bg-brand-ivory py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-sans uppercase tracking-[0.3em] text-brand-champagne text-sm mb-4 block">
            Our ecosystem
          </span>
          <h2 className="font-heading text-brand-black text-4xl md:text-5xl mb-6">
            Our divisions
          </h2>
          <p className="font-sans text-brand-mocha/70 text-base md:text-lg max-w-2xl mx-auto">
            Every DKY division shares the same commitment to excellence, delivering thoughtfully crafted experiences.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {divisions.map((division, index) => (
            <motion.div
              key={division.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative w-full sm:w-72 rounded-2xl overflow-hidden bg-gradient-to-br from-brand-mocha to-brand-black border border-brand-champagne/20 hover:border-brand-champagne/50 transition-all p-8 h-72 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <Sparkles className="text-brand-champagne" size={22} />
                <span
                  className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full ${
                    division.status === "active"
                      ? "bg-brand-champagne/20 text-brand-champagne"
                      : "bg-brand-ivory/10 text-brand-ivory/50"
                  }`}
                >
                  {division.status === "active" ? "Active" : "Coming Soon"}
                </span>
              </div>

              <div>
                <h3 className="font-heading text-brand-ivory text-2xl mb-2">
                  {division.name}
                </h3>
                <p className="font-sans text-brand-ivory/60 text-sm mb-4">
                  {division.tagline}
                </p>

                {division.status === "active" ? (
                  <Link
                    href={division.href}
                    className="inline-flex items-center gap-2 font-sans text-brand-champagne text-sm group-hover:gap-3 transition-all"
                  >
                    Explore
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <span className="font-sans text-brand-ivory/30 text-sm">
                    Coming Soon
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}