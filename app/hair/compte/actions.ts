"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { prisma } from "../../../lib/prisma";
import { stripe } from "@/lib/stripe";
import { calculateRefund } from "@/lib/refund-policy";
import { BookingCancelledEmail } from "@/emails/booking-cancelled";

const resend = new Resend(process.env.RESEND_API_KEY);

function formatBookingNumber(seq: number, date: Date) {
  return `DKY-${date.getFullYear()}-${String(seq).padStart(5, "0")}`;
}

export async function cancelBookingByClient(bookingId: string) {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { client: true, service: true },
  });

  if (!booking || booking.client.email !== userEmail) {
    throw new Error("Non autorisé à annuler cette réservation");
  }

  let refundAmount = 0;
  let refundReason = "Aucun dépôt payé";

  if (booking.paymentStatus === "PAID" && booking.stripePaymentIntentId) {
    const decision = calculateRefund(booking.date, booking.time, false);
    refundReason = decision.reason;

    if (decision.refundPercent > 0) {
      refundAmount = Math.round((booking.depositAmount * decision.refundPercent) / 100);
      await stripe.refunds.create({
        payment_intent: booking.stripePaymentIntentId,
        amount: refundAmount * 100,
      });
    }
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: "CANCELLED",
      cancellationReason: "Annulée par la cliente",
      refundAmount,
      refundReason,
    },
  });

  const bookingNumber = formatBookingNumber(booking.bookingSeq, booking.createdAt);
  const dateLabel = booking.date.toLocaleDateString("fr-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  try {
    await resend.emails.send({
      from: "DKY Hair <onboarding@resend.dev>",
      to: "dkylifestyle@gmail.com",
      subject: `Réservation ${bookingNumber} annulée par la cliente`,
      html: `
        <p><strong>Cliente :</strong> ${booking.client.name} (${booking.client.email})</p>
        <p><strong>Coiffure :</strong> ${booking.service.name}</p>
        <p><strong>Remboursement :</strong> ${refundAmount}$ (${refundReason})</p>
      `,
    });

    await resend.emails.send({
      from: "DKY Hair <onboarding@resend.dev>",
      to: booking.client.email,
      subject: `Réservation ${bookingNumber} annulée`,
      react: BookingCancelledEmail({
        clientName: booking.client.name,
        bookingNumber,
        serviceName: booking.service.name,
        dateLabel,
        time: booking.time,
        refundAmount,
        refundReason,
        cancellationReason: "Annulée par la cliente",
      }),
    });
  } catch (error) {
    console.error("Erreur d'envoi d'email :", error);
  }

  redirect("/hair/compte");
}