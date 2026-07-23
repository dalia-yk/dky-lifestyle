"use client";

import { BookingWizardData } from "@/types/booking-wizard";
import { Button } from "@/components/ui/button";

interface StepProps {
  data: BookingWizardData;
  updateData: (fields: Partial<BookingWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
  extensionFee: number;
}

const options = [
  { value: "client-provides", label: "J'apporte mes mèches", description: "Aucun frais supplémentaire" },
  { value: "dky-provides", label: "DKY fournit les mèches", description: "Mèches premium incluses (+ frais selon type)" },
] as const;

export function StepHairOption({ data, updateData, onNext, onBack, extensionFee }: StepProps) {
  return (
    <div>
      <h2 className="font-heading text-brand-ivory text-2xl mb-2">
        Qui fournit les mèches ?
      </h2>
      <p className="font-sans text-brand-ivory/60 text-sm mb-8">
        Tu peux apporter les tiennes ou utiliser nos mèches premium.
      </p>

      <div className="flex flex-col gap-3 mb-8">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => updateData({ hairOption: option.value })}
            className={`text-left p-5 rounded-2xl border transition-all ${
              data.hairOption === option.value
                ? "border-brand-champagne bg-brand-champagne/10"
                : "border-brand-ivory/20 hover:border-brand-champagne/50"
            }`}
          >
            <p className="font-heading text-brand-ivory text-lg mb-1">
              {option.label}
            </p>
            <p className="font-sans text-brand-ivory/50 text-sm">
              {option.value === "dky-provides"
                ? `+${extensionFee}$ pour les mèches premium`
                : "Aucun frais supplémentaire"}
            </p>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 border-brand-ivory/30 text-brand-ivory rounded-full py-6">
          Retour
        </Button>
        <Button onClick={onNext} disabled={!data.hairOption} className="flex-1 bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full py-6 disabled:opacity-40">
          Continuer
        </Button>
      </div>
    </div>
  );
}