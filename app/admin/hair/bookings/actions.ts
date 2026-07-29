"use server";

import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { prisma } from "../../../../lib/prisma";
import { BookingConfirmedEmail } from "@/emails/booking-confirmed";
import { BookingCancelledEmail } from "@/emails/booking-cancelled";
import { BookingCompletedEmail } from "@/emails/booking-completed";
import { stripe } from "@/lib/stripe";

const resend = new Resend(process.env.RESEND_API_KEY);

function formatBookingNumber(seq: number, date: Date) {
  return `DKY-${date.getFullYear()}-${String(seq).padStart(5, "0")}`;
}

export async function updateBookingStatus(
  bookingId: string,
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED",
  isNoShowOrLate: boolean = false,
  cancellationReason: string = ""
) {
  const existingBooking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!existingBooking) {
    throw new Error("Réservation introuvable");
  }

  let refundAmount = 0;
  let refundReason = "";

  if (
    status === "CANCELLED" &&
    existingBooking.paymentStatus === "PAID" &&
    existingBooking.stripePaymentIntentId
  ) {
    const refundPercent = isNoShowOrLate ? 0 : 100;
    refundAmount = Math.round((existingBooking.depositAmount * refundPercent) / 100);
    refundReason = isNoShowOrLate
      ? "Retard ou absence — dépôt non remboursable"
      : "Annulation par DKY Hair — remboursement complet";

    if (refundAmount > 0) {
      await stripe.refunds.create({
        payment_intent: existingBooking.stripePaymentIntentId,
        amount: refundAmount * 100,
      });
    }
  }

  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status,
      cancellationReason: status === "CANCELLED" ? cancellationReason : null,
      refundAmount,
      refundReason: status === "CANCELLED" ? refundReason : null,
    },
    include: { client: true, service: true },
  });

  const bookingNumber = formatBookingNumber(booking.bookingSeq, booking.createdAt);
  const dateLabel = booking.date.toLocaleDateString("fr-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const commonProps = {
    clientName: booking.client.name,
    bookingNumber,
    serviceName: booking.service.name,
    dateLabel,
    time: booking.time,
  };

  try {
    if (status === "CONFIRMED") {
      await resend.emails.send({
        from: "DKY Hair <onboarding@resend.dev>",
        to: booking.client.email,
        subject: `Réservation ${bookingNumber} confirmée !`,
        react: BookingConfirmedEmail(commonProps),
      });
    } else if (status === "CANCELLED") {
      await resend.emails.send({
        from: "DKY Hair <onboarding@resend.dev>",
        to: booking.client.email,
        subject: `Réservation ${bookingNumber} annulée`,
        react: BookingCancelledEmail({
          ...commonProps,
          refundAmount,
          refundReason,
          cancellationReason: booking.cancellationReason ?? undefined,
        }),
      });
    } else if (status === "COMPLETED") {
      await resend.emails.send({
        from: "DKY Hair <onboarding@resend.dev>",
        to: booking.client.email,
        subject: "Merci pour ta visite chez DKY Hair !",
        react: BookingCompletedEmail(commonProps),
      });
    }
  } catch (error) {
    console.error("Erreur d'envoi d'email :", error);
  }

  revalidatePath("/admin/hair/bookings");
  revalidatePath("/admin");
}