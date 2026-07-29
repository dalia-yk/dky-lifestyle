"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { prisma } from "../../../lib/prisma";

export async function payDepositForBooking(bookingId: string) {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { client: true, service: true },
  });

  if (!booking || booking.client.email !== userEmail) {
    throw new Error("Non autorisé");
  }

  if (booking.paymentStatus === "PAID") {
    redirect(`/hair/compte/${bookingId}`);
  }

  const dateLabel = booking.date.toLocaleDateString("fr-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "cad",
          product_data: {
            name: `Dépôt — ${booking.service.name}`,
            description: `Dépôt de 20% pour ta réservation du ${dateLabel} à ${booking.time}`,
          },
          unit_amount: booking.depositAmount * 100,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/hair/compte/${booking.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/hair/compte/${booking.id}`,
    metadata: {
      bookingId: booking.id,
    },
  });

  redirect(checkoutSession.url!);
}