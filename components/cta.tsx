"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="bg-gradient-to-b from-brand-mocha to-brand-black py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="font-heading text-brand-ivory text-4xl md:text-5xl mb-6">
          Prête à vivre l&apos;expérience DKY ?
        </h2>
        <p className="font-sans text-brand-ivory/70 text-base md:text-lg mb-10">
          Découvre nos divisions et réserve ton moment Crafted by Purpose.
        </p>
        <Link href="/hair">
          <Button className="bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full px-10 py-6 text-base">
            Réserver maintenant
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}