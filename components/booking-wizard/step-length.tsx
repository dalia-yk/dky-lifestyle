"use client";

import { BookingWizardData } from "@/types/booking-wizard";
import { Button } from "@/components/ui/button";

interface StepProps {
  data: BookingWizardData;
  updateData: (fields: Partial<BookingWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const lengths = [
  { value: "shoulder", label: "Shoulder Length" },
  { value: "mid-back", label: "Mid-Back Length" },
  { value: "waist", label: "Waist Length" },
] as const;

export function StepLength({ data, updateData, onNext, onBack }: StepProps) {
  return (
    <div>
      <h2 className="font-heading text-brand-ivory text-2xl mb-2">
        Quelle longueur souhaites-tu ?
      </h2>
      <p className="font-sans text-brand-ivory/60 text-sm mb-8">
        Choisis la longueur finale de ta coiffure.
      </p>

      <div className="flex flex-col gap-3 mb-8">
        {lengths.map((length) => (
          <button
            key={length.value}
            onClick={() => updateData({ length: length.value })}
            className={`text-left p-5 rounded-2xl border transition-all ${
              data.length === length.value
                ? "border-brand-champagne bg-brand-champagne/10"
                : "border-brand-ivory/20 hover:border-brand-champagne/50"
            }`}
          >
            <p className="font-heading text-brand-ivory text-lg">
              {length.label}
            </p>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 border-brand-ivory/30 text-brand-ivory rounded-full py-6">
          Retour
        </Button>
        <Button onClick={onNext} disabled={!data.length} className="flex-1 bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full py-6 disabled:opacity-40">
          Continuer
        </Button>
      </div>
    </div>
  );
}