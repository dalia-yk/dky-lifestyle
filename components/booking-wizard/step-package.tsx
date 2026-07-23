"use client";

import { BookingWizardData } from "@/types/booking-wizard";
import { Button } from "@/components/ui/button";

interface PackageOption {
  id: string;
  name: string;
  tagline: string;
  featured: boolean;
  includedAddOns: { id: string; name: string }[];
}

interface StepProps {
  data: BookingWizardData;
  updateData: (fields: Partial<BookingWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
  packages: PackageOption[];
}

export function StepPackage({ data, updateData, onNext, onBack, packages }: StepProps) {
  function choosePackage(pkg: PackageOption | null) {
    updateData({
      packageId: pkg?.id ?? null,
      addOnIds: pkg ? pkg.includedAddOns.map((a) => a.id) : [],
    });
  }

  return (
    <div>
      <h2 className="font-heading text-brand-ivory text-2xl mb-2">
        Veux-tu enrichir ton expérience ?
      </h2>
      <p className="font-sans text-brand-ivory/60 text-sm mb-8">
        Choisis un forfait pour une expérience complète, ou passe cette étape.
      </p>

      <div className="flex flex-col gap-3 mb-8">
        <button
          onClick={() => choosePackage(null)}
          className={`text-left p-5 rounded-2xl border transition-all ${
            data.packageId === null
              ? "border-brand-champagne bg-brand-champagne/10"
              : "border-brand-ivory/20 hover:border-brand-champagne/50"
          }`}
        >
          <p className="font-heading text-brand-ivory text-lg">Aucun forfait</p>
          <p className="font-sans text-brand-ivory/50 text-sm">Je choisirai mes options moi-même</p>
        </button>

        {packages.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => choosePackage(pkg)}
            className={`text-left p-5 rounded-2xl border transition-all ${
              data.packageId === pkg.id
                ? "border-brand-champagne bg-brand-champagne/10"
                : "border-brand-ivory/20 hover:border-brand-champagne/50"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <p className="font-heading text-brand-ivory text-lg">{pkg.name}</p>
              {pkg.featured && (
                <span className="text-xs uppercase tracking-widest bg-brand-champagne text-brand-black px-2 py-0.5 rounded-full">
                  Populaire
                </span>
              )}
            </div>
            <p className="font-sans text-brand-ivory/50 text-sm mb-2">{pkg.tagline}</p>
            {pkg.includedAddOns.length > 0 && (
              <p className="font-sans text-brand-champagne text-xs">
                Inclus : {pkg.includedAddOns.map((a) => a.name).join(", ")}
              </p>
            )}
          </button>
        ))}
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