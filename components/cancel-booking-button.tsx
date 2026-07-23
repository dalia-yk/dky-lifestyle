"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cancelBookingByClient } from "@/app/hair/compte/actions";

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCancel() {
    setIsSubmitting(true);
    await cancelBookingByClient(bookingId);
  }

  if (isConfirming) {
    return (
      <div className="flex-1 flex flex-col gap-2">
        <p className="font-sans text-brand-mocha text-xs text-center">
          Confirmer l&apos;annulation ?
        </p>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsConfirming(false)}
            variant="outline"
            className="flex-1 border-brand-mocha/30 text-brand-mocha rounded-full py-4 text-sm"
          >
            Non
          </Button>
          <Button
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1 bg-red-500/90 text-white hover:bg-red-500 rounded-full py-4 text-sm"
          >
            Oui, annuler
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={() => setIsConfirming(true)}
      variant="outline"
      className="flex-1 border-red-400/40 text-red-500 hover:bg-red-500/10 rounded-full py-6"
    >
      Annuler
    </Button>
  );
}