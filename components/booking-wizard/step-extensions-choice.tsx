"use client";

import { BookingWizardData } from "@/types/booking-wizard";
import { Button } from "@/components/ui/button";

interface StepProps {
  data: BookingWizardData;
  updateData: (fields: Partial<BookingWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepExtensionsChoice({ updateData, onNext, onBack }: StepProps) {
  function choose(wantsExtensions: boolean) {
    if (wantsExtensions) {
      updateData({ hairOption: null });
    } else {
      updateData({ hairOption: "none", hairColor: null });
    }
    onNext();
  }

  return (
    <div>
      <h2 className="font-heading text-brand-ivory text-2xl mb-2">
        Souhaites-tu des mèches ?
      </h2>
      <p className="font-sans text-brand-ivory/60 text-sm mb-8">
        Cette coiffure peut se faire avec ou sans mèches.
      </p>

      <div className="flex flex-col gap-3 mb-8">
        <button
          onClick={() => choose(true)}
          className="text-left p-5 rounded-2xl border border-brand-ivory/20 hover:border-brand-champagne/50 transition-all"
        >
          <p className="font-heading text-brand-ivory text-lg">Oui, avec mèches</p>
        </button>
        <button
          onClick={() => choose(false)}
          className="text-left p-5 rounded-2xl border border-brand-ivory/20 hover:border-brand-champagne/50 transition-all"
        >
          <p className="font-heading text-brand-ivory text-lg">Non, sans mèches</p>
        </button>
      </div>

      <Button onClick={onBack} variant="outline" className="w-full border-brand-ivory/30 text-brand-ivory rounded-full py-6">
        Retour
      </Button>
    </div>
  );
}