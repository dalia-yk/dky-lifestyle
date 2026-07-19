"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";

const faqs = [
  {
    question: "Comment puis-je réserver un rendez-vous ?",
    answer:
      "Tu peux réserver directement via notre page Réservation, en choisissant ta coiffure, la date et l'heure qui te conviennent. Un dépôt de 20% est requis pour confirmer ta réservation.",
  },
  {
    question: "Dois-je apporter mes propres mèches ?",
    answer:
      "Non, ce n'est pas obligatoire. La plupart de nos services sont proposés avec ou sans mèches — tu peux utiliser les mèches DKY premium disponibles en boutique, ou apporter les tiennes si tu préfères.",
  },
  {
    question: "Combien de temps dure une coiffure protectrice ?",
    answer:
      "Ça dépend du style choisi, en général entre 4 et 8 semaines. Chaque fiche de coiffure indique nos recommandations d'entretien pour prolonger la durée de vie de ton style.",
  },
  {
    question: "Quelle est la politique d'annulation ?",
    answer:
      "Toute annulation doit être faite au moins 48 heures avant le rendez-vous pour un remboursement du dépôt. Passé ce délai, le dépôt de 20% n'est malheureusement pas remboursable.",
  },
  {
    question: "Proposez-vous des services pour enfants ?",
    answer:
      "Oui, plusieurs coiffures de notre collection sont adaptées aux enfants, réalisées avec douceur et patience. Consulte notre page Collections, section Kids.",
  },
  {
    question: "Comment entretenir ma coiffure entre les rendez-vous ?",
    answer:
      "Chaque service inclut des conseils d'entretien personnalisés. En général, on recommande d'hydrater le cuir chevelu régulièrement et de protéger tes cheveux la nuit avec un bonnet en satin.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggleFaq(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Questions fréquentes"
        description="Tout ce que tu dois savoir avant ta visite."
      />

      <section className="bg-brand-ivory py-20 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="border border-brand-champagne/30 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="font-heading text-brand-black text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-brand-champagne shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <p className="font-sans text-brand-mocha/80 text-sm leading-relaxed px-6 pb-6">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}