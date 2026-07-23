"use client";

import { BookingWizardData } from "@/types/booking-wizard";
import { Button } from "@/components/ui/button";

interface StepProps {
  data: BookingWizardData;
  updateData: (fields: Partial<BookingWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const colors = ["1B", "2", "4", "27", "30", "350", "Burgundy", "Ombré"];

export function StepHairColor({ data, updateData, onNext, onBack }: StepProps) {
  return (
    <div>
      <h2 className="font-heading text-brand-ivory text-2xl mb-2">
        Quelle couleur choisis-tu ?
      </h2>
      <p className="font-sans text-brand-ivory/60 text-sm mb-8">
        Sélectionne la teinte de tes mèches DKY.
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => updateData({ hairColor: color })}
            className={`px-5 py-3 rounded-full text-sm font-sans border transition-all ${
              data.hairColor === color
                ? "bg-brand-champagne text-brand-black border-brand-champagne"
                : "border-brand-ivory/30 text-brand-ivory/70 hover:border-brand-champagne/50"
            }`}
          >
            {color}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 border-brand-ivory/30 text-brand-ivory rounded-full py-6">
          Retour
        </Button>
        <Button onClick={onNext} disabled={!data.hairColor} className="flex-1 bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full py-6 disabled:opacity-40">
          Continuer
        </Button>
      </div>
    </div>
  );
}