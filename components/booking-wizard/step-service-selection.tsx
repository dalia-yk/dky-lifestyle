"use client";

import { useState } from "react";
import { BookingWizardData } from "@/types/booking-wizard";
import { Button } from "@/components/ui/button";

interface ServiceOption {
  id: string;
  name: string;
  priceFrom: number;
  duration: string;
  collection: string;
  extensionFee: number;
}

interface StepProps {
  services: ServiceOption[];
  data: BookingWizardData;
  updateData: (fields: Partial<BookingWizardData>) => void;
  onNext: () => void;
}

const tabs = [
  { value: "braids", label: "Braids" },
  { value: "twist", label: "Twist" },
  { value: "locs", label: "Locs" },
] as const;

export function StepServiceSelection({
  services,
  data,
  updateData,
  onNext,
}: StepProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["value"]>(
    (data.collection as (typeof tabs)[number]["value"]) ?? "braids"
  );

  const filteredServices = services.filter(
    (s) => s.collection === activeTab
  );

  function selectService(service: ServiceOption) {
    updateData({
      serviceId: service.id,
      collection: service.collection as BookingWizardData["collection"],
    });
  }

  return (
    <div>
      <h2 className="font-heading text-brand-ivory text-2xl mb-2">
        Choisis ta coiffure
      </h2>
      <p className="font-sans text-brand-ivory/60 text-sm mb-6">
        Parcours nos collections et sélectionne ton style.
      </p>

      {/* Onglets */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-full text-sm font-sans transition-colors ${
              activeTab === tab.value
                ? "bg-brand-champagne text-brand-black"
                : "border border-brand-ivory/20 text-brand-ivory/70 hover:border-brand-champagne/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grille filtrée, instantanée */}
      <div className="flex flex-col gap-3 mb-8 max-h-96 overflow-y-auto">
        {filteredServices.map((service) => (
          <button
            key={service.id}
            onClick={() => selectService(service)}
            className={`flex justify-between items-center text-left p-5 rounded-2xl border transition-all ${
              data.serviceId === service.id
                ? "border-brand-champagne bg-brand-champagne/10"
                : "border-brand-ivory/20 hover:border-brand-champagne/50"
            }`}
          >
            <div>
              <p className="font-heading text-brand-ivory text-lg">
                {service.name}
              </p>
              <p className="font-sans text-brand-ivory/50 text-xs">
                {service.duration}
              </p>
            </div>
            <p className="font-sans text-brand-champagne text-sm">
              {service.priceFrom}$
            </p>
          </button>
        ))}
      </div>

      <Button
        onClick={onNext}
        disabled={!data.serviceId}
        className="w-full bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full py-6 disabled:opacity-40"
      >
        Continuer
      </Button>
    </div>
  );
}