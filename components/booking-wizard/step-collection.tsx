"use client";

import { BookingWizardData } from "@/types/booking-wizard";
import { Button } from "@/components/ui/button";

interface StepProps {
  data: BookingWizardData;
  updateData: (fields: Partial<BookingWizardData>) => void;
  onNext: () => void;
}

const collections = [
  { value: "braids", label: "Braids", description: "Knotless, Boho, Fulani, Cornrows, Stitch" },
  { value: "twist", label: "Twist", description: "Spring, Passion, Havana, Senegalese, Barrel" },
  { value: "locs", label: "Locs", description: "Soft Locs, Butterfly, Faux Locs" },
] as const;

export function StepCollection({ data, updateData, onNext }: StepProps) {
  return (
    <div>
      <h2 className="font-heading text-brand-ivory text-2xl mb-2">
        Quelle collection t&apos;intéresse ?
      </h2>
      <p className="font-sans text-brand-ivory/60 text-sm mb-8">
        Choisis une famille de coiffures pour commencer.
      </p>

      <div className="flex flex-col gap-3 mb-8">
        {collections.map((collection) => (
          <button
            key={collection.value}
            onClick={() => updateData({ collection: collection.value })}
            className={`text-left p-5 rounded-2xl border transition-all ${
              data.collection === collection.value
                ? "border-brand-champagne bg-brand-champagne/10"
                : "border-brand-ivory/20 hover:border-brand-champagne/50"
            }`}
          >
            <p className="font-heading text-brand-ivory text-lg mb-1">
              {collection.label}
            </p>
            <p className="font-sans text-brand-ivory/50 text-sm">
              {collection.description}
            </p>
          </button>
        ))}
      </div>

      <Button
        onClick={onNext}
        disabled={!data.collection}
        className="w-full bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full py-6 disabled:opacity-40"
      >
        Continuer
      </Button>
    </div>
  );
}