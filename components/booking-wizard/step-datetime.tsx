"use client";

import { BookingWizardData } from "@/types/booking-wizard";
import { Button } from "@/components/ui/button";

interface StepProps {
  data: BookingWizardData;
  updateData: (fields: Partial<BookingWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepDateTime({ data, updateData, onNext, onBack }: StepProps) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <h2 className="font-heading text-brand-ivory text-2xl mb-2">
        Quand veux-tu ton rendez-vous ?
      </h2>
      <p className="font-sans text-brand-ivory/60 text-sm mb-8">
        Choisis une date et une heure qui te conviennent.
      </p>

      <div className="flex flex-col gap-5 mb-8">
        <div>
          <label className="font-sans text-brand-ivory/70 text-sm mb-2 block">
            Date
          </label>
          <input
            type="date"
            min={today}
            value={data.date}
            onChange={(e) => updateData({ date: e.target.value })}
            className="w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors"
          />
        </div>
        <div>
          <label className="font-sans text-brand-ivory/70 text-sm mb-2 block">
            Heure
          </label>
          <input
            type="time"
            value={data.time}
            onChange={(e) => updateData({ time: e.target.value })}
            className="w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 border-brand-ivory/30 text-brand-ivory rounded-full py-6">
          Retour
        </Button>
        <Button onClick={onNext} disabled={!data.date || !data.time} className="flex-1 bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full py-6 disabled:opacity-40">
          Continuer
        </Button>
      </div>
    </div>
  );
}