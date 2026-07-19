"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  tagline?: string;
}

export function PageHeader({ eyebrow, title, description, tagline }: PageHeaderProps) {
  return (
    <section className="bg-brand-black pt-40 pb-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <span className="font-sans uppercase tracking-[0.3em] text-brand-champagne text-sm mb-4 block">
          {eyebrow}
        </span>
        <h1 className="font-heading text-brand-ivory text-5xl md:text-6xl mb-6">
          {title}
        </h1>
        {description && (
          <p className="font-sans text-brand-ivory/70 text-base md:text-lg">
            {description}
          </p>
        )}
        {tagline && (
            <p className="font-heading itralic text-brand-champagne text=lg md:text-xl"> {tagline} </p>
        )}
      </motion.div>
    </section>
  );
}