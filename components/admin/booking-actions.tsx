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

  async function handleChange(status: BookingStatus) {
    setIsPending(true);
    await updateBookingStatus(bookingId, status);
    setIsPending(false);
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