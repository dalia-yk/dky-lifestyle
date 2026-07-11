"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
    return(
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-brand-black via-brand-mocha to-brand-black">
            {/* Léger effet de grain/texture en fond, optionnel */}
            <div className="absolute inset-0 bg-brand-black/40"></div>

            <motion.div 
               initial ={{ opacity: 0, y: 20 }}
               animate ={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, ease: "easeOut"}}
               className="relative z-10 flex flex-col items-center text-center px-6" 
            >
                <span className="font-sans uppercase tracking-[0.3em] text-brand-champagne texte-sm mb-6"> DKY Hair </span>
                <h1 className="font-heading text-brand-champagne text-5xl md:text-7xl leading-tight mb-6"> DKY Lifestyle</h1>
                <p className="font-sans text-brand-ivory/70 text-base md:text-lg max-w-xl mb-10"> L&apos;art de la coiffure, sublimé par le luxe et le raffinement. </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full px-8 py-6 text-base"> Réserver maintenant </Button>
                    <Button variant="outline" className="border-brand-ivory/40 text-brand-black hover:bg-brand-ivory/10 rounded-full px-8 py-6 text-base"> Voir les services </Button>
                </div>
            </motion.div>
        </section>
    )
    
}