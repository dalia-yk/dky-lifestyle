"use client";

import { BookingWizardData } from "@/types/booking-wizard";
import { Button } from "@/components/ui/button";

interface AddOnOption {
  id: string;
  name: string;
  price: number;
}

interface StepProps {
  data: BookingWizardData;
  updateData: (fields: Partial<BookingWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
  addOns: AddOnOption[];
  lockedAddOnIds: string[];
}

export function StepAddOns({ data, updateData, onNext, onBack, addOns, lockedAddOnIds }: StepProps) {
  function toggleAddOn(id: string) {
    if (lockedAddOnIds.includes(id)) return;
    const isSelected = data.addOnIds.includes(id);
    const newIds = isSelected
      ? data.addOnIds.filter((a) => a !== id)
      : [...data.addOnIds, id];
    updateData({ addOnIds: newIds });
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
        {addOns.map((addOn) => {
          const isLocked = lockedAddOnIds.includes(addOn.id);
          const isSelected = data.addOnIds.includes(addOn.id) || isLocked;
          return (
            <button
              key={addOn.id}
              onClick={() => toggleAddOn(addOn.id)}
              disabled={isLocked}
              className={`flex justify-between items-center text-left p-5 rounded-2xl border transition-all ${
                isSelected
                  ? "border-brand-champagne bg-brand-champagne/10"
                  : "border-brand-ivory/20 hover:border-brand-champagne/50"
              } ${isLocked ? "opacity-70 cursor-default" : ""}`}
            >
              <span className="font-heading text-brand-ivory text-lg">
                {addOn.name}
                {isLocked && (
                  <span className="font-sans text-brand-champagne text-xs ml-2">
                    (inclus dans ton forfait)
                  </span>
                )}
              </span>
              <span className="font-sans text-brand-champagne text-sm">
                {isLocked ? "Inclus" : `+${addOn.price}$`}
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