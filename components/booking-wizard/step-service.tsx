"use client";

import { useEffect, useState } from "react";
import { BookingWizardData } from "@/types/booking-wizard";
import { Button } from "@/components/ui/button";

interface ServiceOption {
  id: string;
  name: string;
  priceFrom: number;
  duration: string;
}

interface StepProps {
  data: BookingWizardData;
  updateData: (fields: Partial<BookingWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepService({ data, updateData, onNext, onBack }: StepProps) {
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      setLoading(true);
      const res = await fetch(`/api/services?collection=${data.collection}`);
      const json = await res.json();
      setServices(json);
      setLoading(false);
    }
    loadServices();
  }, [data.collection]);

  return (
    <div>
      <h2 className="font-heading text-brand-ivory text-2xl mb-2">
        Choisis ta coiffure
      </h2>
      <p className="font-sans text-brand-ivory/60 text-sm mb-8">
        Voici les styles disponibles dans la collection {data.collection}.
      </p>

      {loading ? (
        <p className="font-sans text-brand-ivory/50 text-sm mb-8">
          Chargement...
        </p>
      ) : (
        <div className="flex flex-col gap-3 mb-8">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => updateData({ serviceId: service.id })}
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
      )}

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-brand-ivory/30 text-brand-ivory rounded-full py-6"
        >
          Retour
        </Button>
        <Button
          onClick={onNext}
          disabled={!data.serviceId}
          className="flex-1 bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full py-6 disabled:opacity-40"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
}