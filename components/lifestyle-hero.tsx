"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LifestyleHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-brand-black via-brand-mocha to-brand-black">
      <div className="absolute inset-0 bg-brand-black/40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <span className="font-sans uppercase tracking-[0.3em] text-brand-champagne text-sm mb-6">
          DKY Lifestyle
        </span>

        <h1 className="font-heading text-brand-ivory text-5xl md:text-7xl leading-tight mb-6">
          Crafted by Purpose
        </h1>

        <p className="font-sans text-brand-ivory/70 text-base md:text-lg max-w-xl mb-10">
          We create premium experiences through beauty, creativity, innovation and excellence
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="#divisions">
            <Button className="bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full px-8 py-6 text-base">
              Discover our divisions
            </Button>
          </Link>
          <Link href="/hair">
            <Button
              variant="outline"
              className="border-brand-ivory/40 text-brand-ivory hover:bg-brand-ivory/10 rounded-full px-8 py-6 text-base"
            >
              Visit DKY Hair
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}