"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createAddOn, updateAddOn } from "@/app/admin/hair/addons/actions";

export function AddOnForm({
  addOnId,
  initialName = "",
  initialPrice = 0,
  initialDuration = 15,
}: {
  addOnId?: string;
  initialName?: string;
  initialPrice?: number;
  initialDuration?: number;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice);
  const [duration, setDuration] = useState(initialDuration);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    if (addOnId) {
      await updateAddOn(addOnId, name, price, duration);
    } else {
      await createAddOn(name, price, duration);
    }
  }

  const inputClass =
    "w-full bg-white/5 border border-brand-ivory/20 focus:border-brand-champagne rounded-lg px-4 py-3 text-brand-ivory text-sm outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-md">
      <div>
        <label className="font-sans text-brand-ivory/70 text-sm mb-2 block">Nom</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label className="font-sans text-brand-ivory/70 text-sm mb-2 block">Prix ($)</label>
        <input
          type="number"
          required
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className={inputClass}
        />
      </div>
      <div>
        <label className="font-sans text-brand-ivory/70 text-sm mb-2 block">Durée (minutes)</label>
        <input
          type="number"
          required
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className={inputClass}
        />
      </div>
      <div className="flex gap-3 mt-4">
        <Button
          type="button"
          onClick={() => router.push("/admin/hair/addons")}
          variant="outline"
          className="flex-1 border-brand-ivory/30 text-brand-ivory rounded-full py-6"
        >
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full py-6 disabled:opacity-60"
        >
          {isSubmitting ? "Enregistrement..." : addOnId ? "Enregistrer" : "Créer l'add-on"}
        </Button>
      </div>
    </form>
  );
}