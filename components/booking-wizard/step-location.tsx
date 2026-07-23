"use client";

import { BookingWizardData } from "@/types/booking-wizard";
import { Button } from "@/components/ui/button";

interface StepProps {
  data: BookingWizardData;
  updateData: (fields: Partial<BookingWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepLocation({ data, updateData, onNext, onBack }: StepProps) {
  const canContinue =
    data.locationType === "SALON" ||
    (data.locationType === "HOME" && data.address.trim().length > 0);

  return (
    <div>
      <h2 className="font-heading text-brand-ivory text-2xl mb-2">
        Où souhaites-tu ton rendez-vous ?
      </h2>
      <p className="font-sans text-brand-ivory/60 text-sm mb-8">
        DKY Hair se déplace aussi à domicile.
      </p>

      <div className="flex flex-col gap-3 mb-6">
        <button
          onClick={() => updateData({ locationType: "SALON" })}
          className={`text-left p-5 rounded-2xl border transition-all ${
            data.locationType === "SALON"
              ? "border-brand-champagne bg-brand-champagne/10"
              : "border-brand-ivory/20 hover:border-brand-champagne/50"
          }`}
        >
          <p className="font-heading text-brand-ivory text-lg">
            Studio DKY Hair
          </p>
        </button>
        <button
          onClick={() => updateData({ locationType: "HOME" })}
          className={`text-left p-5 rounded-2xl border transition-all ${
            data.locationType === "HOME"
              ? "border-brand-champagne bg-brand-champagne/10"
              : "border-brand-ivory/20 hover:border-brand-champagne/50"
          }`}
        >
          <p className="font-heading text-brand-ivory text-lg">
            À domicile
          </p>
        </button>
      </div>

      {data.locationType === "HOME" && (
        <div className="mb-8">
          <label className="font-sans text-brand-ivory/70 text-sm mb-2 block">
            Ton adresse
          </label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            placeholder="123 rue Exemple, Gatineau"
            className="w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors"
          />
        </div>
      )}

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