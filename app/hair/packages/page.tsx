import { Check } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

const packages = [
  {
    name: "Essential",
    tagline: "L'essentiel, sans fioritures",
    includes: ["Coiffure au choix"],
    featured: false,
  },
  {
    name: "Care",
    tagline: "Ta coiffure, préparée avec soin",
    includes: ["Lavage", "Traitement", "Coiffure au choix"],
    featured: false,
  },
  {
    name: "Signature",
    tagline: "L'expérience complète DKY Hair",
    includes: [
      "Dépose",
      "Lavage",
      "Traitement",
      "Démêlage",
      "Séchage",
      "Coiffure au choix",
    ],
    featured: true,
  },
  {
    name: "Prestige",
    tagline: "Le luxe absolu, tout inclus",
    includes: [
      "Tout le forfait Signature",
      "Mèches premium incluses",
      "Kit d'entretien offert",
    ],
    featured: false,
  },
];

export default function PackagesPage() {
  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Nos forfaits"
        description="Des expériences pensées pour tous les besoins, du soin ponctuel à l'expérience complète."
      />

      <section className="bg-brand-black py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`flex flex-col rounded-2xl p-8 border transition-all ${
                pkg.featured
                  ? "bg-gradient-to-br from-brand-champagne/20 to-brand-black border-brand-champagne scale-105"
                  : "border-brand-champagne/20 hover:border-brand-champagne/50"
              }`}
            >
              {pkg.featured && (
                <span className="self-start bg-brand-champagne text-brand-black text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  Populaire
                </span>
              )}

              <h3 className="font-heading text-brand-ivory text-2xl mb-2">
                {pkg.name}
              </h3>
              <p className="font-sans text-brand-ivory/60 text-sm mb-6">
                {pkg.tagline}
              </p>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {pkg.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 font-sans text-brand-ivory/80 text-sm"
                  >
                    <Check
                      className="text-brand-champagne shrink-0 mt-0.5"
                      size={16}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                className={
                  pkg.featured
                    ? "bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full"
                    : "bg-transparent border border-brand-champagne/40 text-brand-ivory hover:bg-brand-champagne/10 rounded-full"
                }
              >
                Choisir {pkg.name}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}