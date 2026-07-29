import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "../../../../lib/prisma";
import { Resend } from "resend";
import { BookingCreatedEmail } from "@/emails/booking-created";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Erreur de vérification webhook :", error);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: { paymentStatus: "PAID" },
        include: { client: true, service: true },
      });

      const dateLabel = booking.date.toLocaleDateString("fr-CA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const locationLabel = booking.locationType === "HOME" ? "À domicile" : "Studio DKY Hair";

      try {
        await resend.emails.send({
          from: "DKY Hair <onboarding@resend.dev>",
          to: booking.client.email,
          subject: "Paiement confirmé — ta réservation DKY Hair est validée !",
          react: BookingCreatedEmail({
            clientName: booking.client.name,
            bookingNumber: `DKY-${booking.createdAt.getFullYear()}-${String(booking.bookingSeq).padStart(5, "0")}`,
            serviceName: booking.service.name,
            dateLabel,
            time: booking.time,
            locationLabel,
            totalPrice: booking.totalPrice,
            depositAmount: booking.depositAmount,
            remainingBalance: booking.remainingBalance,
          }),
        });
      } catch (error) {
        console.error("Erreur d'envoi d'email :", error);
      }
    }
  }

  return NextResponse.json({ received: true });
}