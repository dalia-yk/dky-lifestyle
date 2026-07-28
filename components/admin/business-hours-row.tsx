"use client";

import { useState } from "react";
import { updateBusinessHours } from "@/app/admin/settings/actions";

const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

interface Props {
  dayOfWeek: number;
  initialIsOpen: boolean;
  initialOpenTime: string;
  initialCloseTime: string;
}

export function BusinessHoursRow({
  dayOfWeek,
  initialIsOpen,
  initialOpenTime,
  initialCloseTime,
}: Props) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [openTime, setOpenTime] = useState(initialOpenTime);
  const [closeTime, setCloseTime] = useState(initialCloseTime);
  const [isSaving, setIsSaving] = useState(false);

  async function save(nextIsOpen: boolean, nextOpenTime: string, nextCloseTime: string) {
    setIsSaving(true);
    await updateBusinessHours(dayOfWeek, nextIsOpen, nextOpenTime, nextCloseTime);
    setIsSaving(false);
  }

  return (
    <div className="flex items-center gap-4 py-3 border-b border-brand-champagne/10 last:border-0">
      <label className="flex items-center gap-2 w-32 shrink-0">
        <input
          type="checkbox"
          checked={isOpen}
          onChange={(e) => {
            setIsOpen(e.target.checked);
            save(e.target.checked, openTime, closeTime);
          }}
        />
        <span className="font-sans text-brand-ivory text-sm">{dayNames[dayOfWeek]}</span>
      </label>

      {isOpen ? (
        <div className="flex items-center gap-2">
          <input
            type="time"
            value={openTime}
            onChange={(e) => {
              setOpenTime(e.target.value);
              save(isOpen, e.target.value, closeTime);
            }}
            className="bg-white/5 border border-brand-ivory/20 rounded-lg px-3 py-1.5 text-brand-ivory text-sm outline-none"
          />
          <span className="font-sans text-brand-ivory/40 text-sm">à</span>
          <input
            type="time"
            value={closeTime}
            onChange={(e) => {
              setCloseTime(e.target.value);
              save(isOpen, openTime, e.target.value);
            }}
            className="bg-white/5 border border-brand-ivory/20 rounded-lg px-3 py-1.5 text-brand-ivory text-sm outline-none"
          />
        </div>
      ) : (
        <span className="font-sans text-brand-ivory/40 text-sm italic">Fermé</span>
      )}

      {isSaving && (
        <span className="font-sans text-brand-champagne text-xs">Sauvegarde...</span>
      )}
    </div>
  );
}