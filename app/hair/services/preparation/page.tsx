import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Scissors, Wind, Sparkles } from "lucide-react";

const preparationSteps = [
  {
    icon: Scissors,
    name: "Défaire les anciennes tresses",
    description:
      "Un retrait soigneux et sans tension de ta coiffure précédente, pour préserver la santé de tes cheveux naturels.",
    duration: "1 à 2 heures",
    priceFrom: 40,
  },
  {
    icon: Wind,
    name: "Démêlage",
    description:
      "Un démêlage en douceur, mèche par mèche, pour éliminer les nœuds sans casser ni fragiliser la fibre capillaire.",
    duration: "30 à 60 minutes",
    priceFrom: 25,
  },
  {
    icon: Sparkles,
    name: "Préparation avant coiffure",
    description:
      "Nettoyage, hydratation légère et sectionnement des cheveux, pour un résultat impeccable dès le début de la coiffure.",
    duration: "30 minutes",
    priceFrom: 20,
  },
];

export default function PreparationPage() {
  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Préparation"
        description="Les étapes essentielles avant chaque coiffure, pour un résultat impeccable et des cheveux en santé."
      />

      <section className="bg-brand-black py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {preparationSteps.map((step) => (
            <div
              key={step.name}
              className="flex flex-col items-center text-center p-8 rounded-2xl border border-brand-champagne/20 hover:border-brand-champagne/50 transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-brand-champagne/10 flex items-center justify-center mb-5">
                <step.icon className="text-brand-champagne" size={26} />
              </div>
              <h3 className="font-heading text-brand-ivory text-xl mb-3">
                {step.name}
              </h3>
              <p className="font-sans text-brand-ivory/60 text-sm leading-relaxed mb-4">
                {step.description}
              </p>
              <p className="font-sans text-brand-champagne text-sm">
                À partir de {step.priceFrom}$ · {step.duration}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}