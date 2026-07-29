"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { payDepositForBooking } from "@/app/hair/compte/payment-actions";

export function PayDepositButton({ bookingId }: { bookingId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handlePay() {
    setIsLoading(true);
    await payDepositForBooking(bookingId);
  }

  return (
    <Button
      onClick={handlePay}
      disabled={isLoading}
      className="w-full bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full py-6 disabled:opacity-60"
    >
      {isLoading ? "Redirection vers le paiement..." : "Payer le dépôt maintenant"}
    </Button>
  );
}