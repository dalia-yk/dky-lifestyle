"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addBlockedDate, removeBlockedDate } from "@/app/admin/settings/actions";

interface BlockedDate {
  id: string;
  date: Date;
  reason: string | null;
}

export function BlockedDatesManager({ blockedDates }: { blockedDates: BlockedDate[] }) {
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!date) return;
    setIsSubmitting(true);
    await addBlockedDate(date, reason);
    setDate("");
    setReason("");
    setIsSubmitting(false);
  }

  return (
    <div>
      <form onSubmit={handleAdd} className="flex gap-3 mb-6">
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-white/5 border border-brand-ivory/20 rounded-lg px-4 py-2 text-brand-ivory text-sm outline-none"
        />
        <input
          type="text"
          placeholder="Raison (optionnel)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="flex-1 bg-white/5 border border-brand-ivory/20 rounded-lg px-4 py-2 text-brand-ivory text-sm outline-none"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-lg px-6"
        >
          Bloquer
        </Button>
      </form>

      <div className="flex flex-col gap-2">
        {blockedDates.map((blocked) => (
          <div
            key={blocked.id}
            className="flex justify-between items-center bg-white/5 border border-brand-champagne/20 rounded-lg px-4 py-3"
          >
            <div>
              <p className="font-sans text-brand-ivory text-sm">
                {blocked.date.toLocaleDateString("fr-CA")}
              </p>
              {blocked.reason && (
                <p className="font-sans text-brand-ivory/50 text-xs">{blocked.reason}</p>
              )}
            </div>
            <button
              onClick={() => removeBlockedDate(blocked.id)}
              className="text-brand-ivory/50 hover:text-red-400 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        {blockedDates.length === 0 && (
          <p className="font-sans text-brand-ivory/40 text-sm text-center py-6">
            Aucune date bloquée pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}