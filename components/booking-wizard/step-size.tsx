"use client";

import { BookingWizardData } from "@/types/booking-wizard";
import { Button } from "@/components/ui/button";

interface StepProps {
  data: BookingWizardData;
  updateData: (fields: Partial<BookingWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const sizes = [
  { value: "petite", label: "Petite", description: "Tresses plus fines, plus nombreuses" },
  { value: "medium", label: "Medium", description: "L'équilibre classique" },
  { value: "large", label: "Large", description: "Tresses plus épaisses, installation plus rapide" },
] as const;

export function StepSize({ data, updateData, onNext, onBack }: StepProps) {
  return (
    <div>
      <h2 className="font-heading text-brand-ivory text-2xl mb-2">
        Quelle taille préfères-tu ?
      </h2>
      <p className="font-sans text-brand-ivory/60 text-sm mb-8">
        La taille influence la durée et le rendu final.
      </p>

      <div className="flex flex-col gap-3 mb-8">
        {sizes.map((size) => (
          <button
            key={size.value}
            onClick={() => updateData({ size: size.value })}
            className={`text-left p-5 rounded-2xl border transition-all ${
              data.size === size.value
                ? "border-brand-champagne bg-brand-champagne/10"
                : "border-brand-ivory/20 hover:border-brand-champagne/50"
            }`}
          >
            <p className="font-heading text-brand-ivory text-lg mb-1">
              {size.label}
            </p>
            <p className="font-sans text-brand-ivory/50 text-sm">
              {size.description}
            </p>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 border-brand-ivory/30 text-brand-ivory rounded-full py-6">
          Retour
        </Button>
        <Button onClick={onNext} disabled={!data.size} className="flex-1 bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full py-6 disabled:opacity-40">
          Continuer
        </Button>
      </div>
    </div>
  );
}