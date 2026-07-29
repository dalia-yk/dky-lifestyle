"use client";

import { useState } from "react";
import { updateBookingStatus } from "@/app/admin/hair/bookings/actions";

type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export function BookingActions({
  bookingId,
  currentStatus,
}: {
  bookingId: string;
  currentStatus: BookingStatus;
}) {
  const [isPending, setIsPending] = useState(false);
  const [showCancelPrompt, setShowCancelPrompt] = useState(false);
  const [isNoShow, setIsNoShow] = useState(false);
  const [reason, setReason] = useState("");

  async function applyStatus(status: BookingStatus) {
    setIsPending(true);
    await updateBookingStatus(bookingId, status);
    setIsPending(false);
  }

  async function confirmCancel() {
    setIsPending(true);
    await updateBookingStatus(bookingId, "CANCELLED", isNoShow, reason);
    setIsPending(false);
    setShowCancelPrompt(false);
  }

  function handleChange(newStatus: BookingStatus) {
    if (newStatus === "CANCELLED") {
      setShowCancelPrompt(true);
      return;
    }
    applyStatus(newStatus);
  }

  if (showCancelPrompt) {
    return (
      <div className="flex flex-col gap-2 w-56">
        <label className="flex items-center gap-2 font-sans text-brand-ivory/70 text-xs">
          <input
            type="checkbox"
            checked={isNoShow}
            onChange={(e) => setIsNoShow(e.target.checked)}
          />
          Retard/absence (sans remboursement)
        </label>
        <input
          type="text"
          placeholder="Raison de l'annulation"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="bg-white/5 border border-brand-champagne/20 rounded px-2 py-1 text-brand-ivory text-xs outline-none"
        />
        <div className="flex gap-2">
          <button
            onClick={confirmCancel}
            disabled={isPending}
            className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded"
          >
            Confirmer
          </button>
          <button
            onClick={() => setShowCancelPrompt(false)}
            className="text-xs text-brand-ivory/50"
          >
            Annuler
          </button>
        </div>
      </div>
    );
  }

  return (
    <select
      value={currentStatus}
      disabled={isPending}
      onChange={(e) => handleChange(e.target.value as BookingStatus)}
      className="bg-brand-black border border-brand-champagne/30 text-brand-ivory text-xs rounded-lg px-2 py-1 outline-none disabled:opacity-50"
    >
      <option value="PENDING">PENDING</option>
      <option value="CONFIRMED">CONFIRMED</option>
      <option value="CANCELLED">CANCELLED</option>
      <option value="COMPLETED">COMPLETED</option>
    </select>
  );
}