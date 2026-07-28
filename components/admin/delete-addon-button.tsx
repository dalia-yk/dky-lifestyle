"use client";

import { useState } from "react";
import { deleteAddOn } from "@/app/admin/hair/addons/actions";

export function DeleteAddOnButton({
  addOnId,
  addOnName,
}: {
  addOnId: string;
  addOnName: string;
}) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteAddOn(addOnId);
    } catch {
      alert(
        `Impossible de supprimer "${addOnName}" — il est utilisé dans des réservations ou forfaits existants.`
      );
      setIsDeleting(false);
      setIsConfirming(false);
    }
  }

  if (isConfirming) {
    return (
      <div className="flex gap-2 items-center">
        <span className="font-sans text-brand-ivory/60 text-xs">Confirmer ?</span>
        <button onClick={handleDelete} disabled={isDeleting} className="font-sans text-red-400 text-xs hover:underline">
          Oui
        </button>
        <button onClick={() => setIsConfirming(false)} className="font-sans text-brand-ivory/50 text-xs hover:underline">
          Non
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => setIsConfirming(true)} className="font-sans text-red-400/80 text-xs hover:underline">
      Supprimer
    </button>
  );
}