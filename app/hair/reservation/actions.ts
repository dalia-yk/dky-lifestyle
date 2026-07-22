"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { prisma } from "../../../lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createBooking(formData: FormData) {
  const serviceId = formData.get("serviceId") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    throw new Error("Service introuvable");
  }

  const totalPrice = service.priceFrom;
  const depositAmount = Math.round(totalPrice * 0.2);
  const remainingBalance = totalPrice - depositAmount;

  const client = await prisma.client.upsert({
    where: { email },
    update: { name, phone },
    create: { name, email, phone },
  });

  const booking = await prisma.booking.create({
    data: {
      clientId: client.id,
      serviceId: service.id,
      date: new Date(date),
      time,
      totalPrice,
      depositAmount,
      remainingBalance,
      paymentStatus: "DEPOSIT_REQUESTED",
      estimatedDuration: service.duration,
      category: service.collection,
    },
  });

  const dateLabel = new Date(date).toLocaleDateString("fr-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Email à l'admin (toi)
  try {
    await resend.emails.send({
      from: "DKY Hair <onboarding@resend.dev>",
      to: "dkylifestyle@gmail.com",
      subject: `Nouvelle réservation — ${service.name}`,
      html: `
        <h2>Nouvelle réservation reçue</h2>
        <p><strong>Cliente :</strong> ${name} (${email}, ${phone})</p>
        <p><strong>Coiffure :</strong> ${service.name}</p>
        <p><strong>Date :</strong> ${dateLabel} à ${time}</p>
        <p><strong>Prix total :</strong> ${totalPrice}$</p>
        <p><strong>Dépôt demandé :</strong> ${depositAmount}$</p>
      `,
    });

    // Email à la cliente
    await resend.emails.send({
      from: "DKY Hair <onboarding@resend.dev>",
      to: email,
      subject: "Ta réservation DKY Hair est enregistrée !",
      html: `
        <h2>Merci ${name} !</h2>
        <p>Ta réservation pour <strong>${service.name}</strong> est bien enregistrée.</p>
        <p><strong>Date :</strong> ${dateLabel} à ${time}</p>
        <p><strong>Prix total :</strong> ${totalPrice}$</p>
        <p><strong>Dépôt requis :</strong> ${depositAmount}$</p>
        <p>Nous avons hâte de t'accueillir !</p>
        <p><em>DKY Hair — Crafted by Purpose</em></p>
      `,
    });
  } catch (error) {
    console.error("Erreur d'envoi d'email :", error);
    // On ne bloque pas la réservation si l'email échoue
  }

  redirect(`/hair/reservation/confirmation?bookingId=${booking.id}`);
}