"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/app/hair/reservation/actions";

interface ServiceOption {
  id: string;
  name: string;
  priceFrom: number;
  duration: string;
}

export function BookingForm({ services }: { services: ServiceOption[] }) {
  const [selectedServiceId, setSelectedServiceId] = useState(
    services[0]?.id ?? ""
  );

  const selectedService = services.find((s) => s.id === selectedServiceId);
  const totalPrice = selectedService?.priceFrom ?? 0;
  const depositAmount = Math.round(totalPrice * 0.2);

  return (
    <form action={createBooking} className="flex flex-col gap-6">
      {/* Choix de la coiffure */}
      <div>
        <label
          htmlFor="serviceId"
          className="font-sans text-brand-ivory/70 text-sm mb-2 block"
        >
          Coiffure
        </label>
        <select
          id="serviceId"
          name="serviceId"
          required
          value={selectedServiceId}
          onChange={(e) => setSelectedServiceId(e.target.value)}
          className="w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors"
        >
          {services.map((service) => (
            <option
              key={service.id}
              value={service.id}
              className="bg-brand-black"
            >
              {service.name} — à partir de {service.priceFrom}$
            </option>
          ))}
        </select>
      </div>

      {/* Date + heure */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="date"
            className="font-sans text-brand-ivory/70 text-sm mb-2 block"
          >
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            className="w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="time"
            className="font-sans text-brand-ivory/70 text-sm mb-2 block"
          >
            Heure
          </label>
          <input
            id="time"
            name="time"
            type="time"
            required
            className="w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors"
          />
        </div>
      </div>

      {/* Infos client */}
      <div>
        <label
          htmlFor="name"
          className="font-sans text-brand-ivory/70 text-sm mb-2 block"
        >
          Nom complet
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="email"
            className="font-sans text-brand-ivory/70 text-sm mb-2 block"
          >
            Courriel
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="font-sans text-brand-ivory/70 text-sm mb-2 block"
          >
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors"
          />
        </div>
      </div>

      {/* Résumé prix en temps réel */}
      <div className="bg-white/5 border border-brand-champagne/30 rounded-2xl p-6 flex flex-col gap-2">
        <div className="flex justify-between font-sans text-brand-ivory/70 text-sm">
          <span>Prix total estimé</span>
          <span className="text-brand-ivory">{totalPrice}$</span>
        </div>
        <div className="flex justify-between font-sans text-brand-champagne text-sm font-medium">
          <span>Dépôt requis (20%)</span>
          <span>{depositAmount}$</span>
        </div>
      </div>

      <Button
        type="submit"
        className="bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full py-6 text-base"
      >
        Confirmer la réservation
      </Button>
    </form>
  );
}