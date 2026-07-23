"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { prisma } from "../../../lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });

  try {
    await resend.emails.send({
      from: "DKY Hair <onboarding@resend.dev>",
      to: "dkylifestyle@gmail.com",
      subject: `Réservation annulée par la cliente`,
      html: `
        <p><strong>Cliente :</strong> ${booking.client.name} (${booking.client.email})</p>
        <p><strong>Coiffure :</strong> ${booking.service.name}</p>
        <p><strong>Date initiale :</strong> ${booking.date.toLocaleDateString("fr-CA")} à ${booking.time}</p>
        <p>La cliente a annulé cette réservation elle-même depuis son espace client.</p>
      `,
    });
  } catch (error) {
    console.error("Erreur d'envoi d'email :", error);
  }

  redirect("/hair/compte");
}