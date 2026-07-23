"use client";

import { useState } from "react";
import { BookingWizardData } from "@/types/booking-wizard";
import { addOnsList } from "@/data/addons";
import { Button } from "@/components/ui/button";
import { createBookingFromWizard } from "@/app/hair/reservation/wizard-actions";
import { updateBookingFromWizard } from "@/app/hair/reservation/wizard-actions";

interface ServiceOption {
  id: string;
  name: string;
  priceFrom: number;
  extensionFee: number;
  priceWithoutExtensions: number | null;
}

interface StepProps {
  data: BookingWizardData;
  services: ServiceOption[];
  onBack: () => void;
  mode: "create" | "edit";
  bookingId?: string;
}

export function StepSummary({ data, services, onBack, mode, bookingId }: StepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const service = services.find((s) => s.id === data.serviceId);

  const addOnsTotal = data.addOns.reduce((sum, name) => {
    const addOn = addOnsList.find((a) => a.value === name);
    return sum + (addOn?.price ?? 0);
  }, 0);

  let basePrice = service?.priceFrom ?? 0;
  let extensionFee = 0;

  if (data.hairOption === "none") {
    basePrice = service?.priceWithoutExtensions ?? service?.priceFrom ?? 0;
  } else if (data.hairOption === "dky-provides") {
    extensionFee = service?.extensionFee ?? 0;
  }

  const totalPrice = basePrice + extensionFee + addOnsTotal;
  const depositAmount = Math.round(totalPrice * 0.2);

  async function handleSubmit() {
    setIsSubmitting(true);
    if (mode === "edit" && bookingId) {
      await updateBookingFromWizard(bookingId, data);
    } else {
      await createBookingFromWizard(data);
    }
  }

  return (
    <div>
      <h2 className="font-heading text-brand-ivory text-2xl mb-2">
        {mode === "edit" ? "Confirme tes modifications" : "Résumé de ta réservation"}
      </h2>
      <p className="font-sans text-brand-ivory/60 text-sm mb-8">
        Vérifie tous les détails avant de confirmer.
      </p>

      <div className="bg-white/5 border border-brand-champagne/20 rounded-2xl p-6 flex flex-col gap-3 mb-6">
        <div className="flex justify-between">
          <span className="font-sans text-brand-ivory/60 text-sm">Coiffure</span>
          <span className="font-sans text-brand-ivory text-sm">{service?.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-sans text-brand-ivory/60 text-sm">Taille / Longueur</span>
          <span className="font-sans text-brand-ivory text-sm">{data.size} / {data.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-sans text-brand-ivory/60 text-sm">Mèches</span>
          <span className="font-sans text-brand-ivory text-sm">
            {data.hairOption === "dky-provides"
              ? `DKY (${data.hairColor})`
              : data.hairOption === "client-provides"
              ? "Apportées"
              : "Aucune"
            }
          </span>
        </div>
        {data.addOns.length > 0 && (
          <div className="flex justify-between">
            <span className="font-sans text-brand-ivory/60 text-sm">Add-ons</span>
            <span className="font-sans text-brand-ivory text-sm">{data.addOns.join(", ")}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="font-sans text-brand-ivory/60 text-sm">Lieu</span>
          <span className="font-sans text-brand-ivory text-sm">
            {data.locationType === "HOME" ? data.address : "Studio DKY Hair"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-sans text-brand-ivory/60 text-sm">Date</span>
          <span className="font-sans text-brand-ivory text-sm">{data.date} — {data.time}</span>
        </div>
      </div>

      <div className="bg-white/5 border border-brand-champagne/30 rounded-2xl p-6 flex flex-col gap-2 mb-8">
        <div className="flex justify-between font-sans text-sm">
          <span className="text-brand-ivory/70">Prix total</span>
          <span className="text-brand-ivory">{totalPrice}$</span>
        </div>
        {extensionFee > 0 && (
          <div className="flex justify-between font-sans text-sm">
            <span className="text-brand-ivory/70">Mèches premium DKY</span>
            <span className="text-brand-ivory">+{extensionFee}$</span>
          </div>
        )}
        <div className="flex justify-between font-sans text-sm font-medium">
          <span className="text-brand-champagne">Dépôt requis (20%)</span>
          <span className="text-brand-champagne">{depositAmount}$</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} disabled={isSubmitting} variant="outline" className="flex-1 border-brand-ivory/30 text-brand-ivory rounded-full py-6">
          Retour
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full py-6 disabled:opacity-60">
          {isSubmitting
            ? "Envoi en cours..."
            : mode === "edit"
            ? "Enregistrer les modifications"
            : "Confirmer la réservation"}
        </Button>
      </div>
    </div>
  );
}