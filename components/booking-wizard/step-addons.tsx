"use client";

import { BookingWizardData } from "@/types/booking-wizard";
import { Button } from "@/components/ui/button";
import { addOnsList } from "@/data/addons";

interface StepProps {
  data: BookingWizardData;
  updateData: (fields: Partial<BookingWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}


export function StepAddOns({ data, updateData, onNext, onBack }: StepProps) {
  function toggleAddOn(addOn: string) {
    const isSelected = data.addOns.includes(addOn);
    const newAddOns = isSelected
      ? data.addOns.filter((a) => a !== addOn)
      : [...data.addOns, addOn];
    updateData({ addOns: newAddOns });
  }

  return (
    <div>
      <h2 className="font-heading text-brand-ivory text-2xl mb-2">
        Souhaites-tu ajouter des services ?
      </h2>
      <p className="font-sans text-brand-ivory/60 text-sm mb-8">
        Sélectionne autant d&apos;options que tu veux (optionnel).
      </p>

      <div className="flex flex-col gap-3 mb-8">
        {addOnsList.map((addOn) => {
          const isSelected = data.addOns.includes(addOn.value);
          return (
            <button
              key={addOn.value}
              onClick={() => toggleAddOn(addOn.value)}
              className={`flex justify-between items-center text-left p-5 rounded-2xl border transition-all ${
                isSelected
                  ? "border-brand-champagne bg-brand-champagne/10"
                  : "border-brand-ivory/20 hover:border-brand-champagne/50"
              }`}
            >
              <span className="font-heading text-brand-ivory text-lg">
                {addOn.value}
              </span>
              <span className="font-sans text-brand-champagne text-sm">
                +{addOn.price}$
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 border-brand-ivory/30 text-brand-ivory rounded-full py-6">
          Retour
        </Button>
        <Button onClick={onNext} className="flex-1 bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full py-6">
          Continuer
        </Button>
      </div>
    </div>
  );
}