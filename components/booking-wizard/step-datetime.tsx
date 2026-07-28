"use client";

import { useEffect, useState } from "react";
import { BookingWizardData } from "@/types/booking-wizard";
import { Button } from "@/components/ui/button";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface StepProps {
  data: BookingWizardData;
  updateData: (fields: Partial<BookingWizardData>) => void;
  onNext: () => void;
  onBack: () => void;
  durationMinutes: number;
}

export function StepDateTime({ data, updateData, onNext, onBack, durationMinutes }: StepProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [dateAvailable, setDateAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!data.date) return;

    async function loadSlots() {
      setIsLoading(true);
      const res = await fetch(
        `/api/availability?date=${data.date}&duration=${durationMinutes}`
      );
      const json = await res.json();
      setDateAvailable(json.dateAvailable);
      setSlots(json.slots);
      setIsLoading(false);
    }

    loadSlots();
  }, [data.date, durationMinutes]);

  return (
    <div>
      <h2 className="font-heading text-brand-ivory text-2xl mb-2">
        Quand veux-tu ton rendez-vous ?
      </h2>
      <p className="font-sans text-brand-ivory/60 text-sm mb-8">
        Choisis une date et une heure qui te conviennent.
      </p>

      <div className="mb-6">
        <label className="font-sans text-brand-ivory/70 text-sm mb-2 block">Date</label>
        <input
          type="date"
          min={today}
          value={data.date}
          onChange={(e) => updateData({ date: e.target.value, time: "" })}
          className="w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors"
        />
      </div>

      {data.date && !isLoading && !dateAvailable && (
        <p className="font-sans text-red-400 text-sm mb-6">
          Nous sommes fermés ou complets à cette date. Choisis une autre journée.
        </p>
      )}

      {data.date && isLoading && (
        <p className="font-sans text-brand-ivory/50 text-sm mb-6">
          Vérification des disponibilités...
        </p>
      )}

      {data.date && !isLoading && dateAvailable && slots.length > 0 && (
        <div className="mb-8">
          <label className="font-sans text-brand-ivory/70 text-sm mb-2 block">Heure</label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {slots.map((slot) => (
              <button
                key={slot.time}
                disabled={!slot.available}
                onClick={() => updateData({ time: slot.time })}
                className={`py-3 rounded-lg text-sm font-sans border transition-colors ${
                  data.time === slot.time
                    ? "bg-brand-champagne text-brand-black border-brand-champagne"
                    : slot.available
                    ? "border-brand-ivory/20 text-brand-ivory/80 hover:border-brand-champagne/50"
                    : "border-brand-ivory/5 text-brand-ivory/20 cursor-not-allowed line-through"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

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