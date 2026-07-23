"use client";

import { BookingWizardData } from "@/types/booking-wizard";
import { Button } from "@/components/ui/button";

interface StepProps {
  data: BookingWizardData;
  updateData: (fields: Partial<BookingWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepPersonalInfo({ data, updateData, onNext, onBack }: StepProps) {
  const canContinue =
    data.name.trim().length > 0 &&
    data.email.trim().length > 0 &&
    data.phone.trim().length > 0;

  return (
    <div>
      <h2 className="font-heading text-brand-ivory text-2xl mb-2">
        Tes informations
      </h2>
      <p className="font-sans text-brand-ivory/60 text-sm mb-8">
        Pour te contacter et confirmer ta réservation.
      </p>

      <div className="flex flex-col gap-5 mb-8">
        <div>
          <label className="font-sans text-brand-ivory/70 text-sm mb-2 block">
            Nom complet
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            className="w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors"
          />
        </div>
        <div>
          <label className="font-sans text-brand-ivory/70 text-sm mb-2 block">
            Courriel
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors"
          />
        </div>
        <div>
          <label className="font-sans text-brand-ivory/70 text-sm mb-2 block">
            Téléphone
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            className="w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 border-brand-ivory/30 text-brand-ivory rounded-full py-6">
          Retour
        </Button>
        <Button onClick={onNext} disabled={!canContinue} className="flex-1 bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full py-6 disabled:opacity-40">
          Continuer
        </Button>
      </div>
    </div>
  );
}