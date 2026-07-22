"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { prisma } from "../../../lib/prisma";
import { BookingCreatedEmail } from "@/emails/booking-created";

const resend = new Resend(process.env.RESEND_API_KEY);

function formatBookingNumber(seq: number, date: Date) {
  return `DKY-${date.getFullYear()}-${String(seq).padStart(5, "0")}`;
}

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

  const bookingNumber = formatBookingNumber(booking.bookingSeq, booking.createdAt);

  const dateLabel = booking.date.toLocaleDateString("fr-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const locationLabel =
    booking.locationType === "HOME" ? "À domicile" : "Studio DKY Hair";

  try {
    await resend.emails.send({
      from: "DKY Hair <onboarding@resend.dev>",
      to: "dkylifestyle@gmail.com",
      subject: `Nouvelle réservation ${bookingNumber} — ${service.name}`,
      html: `
        <p><strong>Cliente :</strong> ${name} (${email}, ${phone})</p>
        <p><strong>Coiffure :</strong> ${service.name}</p>
        <p><strong>Date :</strong> ${dateLabel} à ${time}</p>
        <p><strong>Dépôt :</strong> ${depositAmount}$</p>
      `,
    });

    await resend.emails.send({
      from: "DKY Hair <onboarding@resend.dev>",
      to: email,
      subject: `Ta réservation ${bookingNumber} est enregistrée !`,
      react: BookingCreatedEmail({
        clientName: name,
        bookingNumber,
        serviceName: service.name,
        dateLabel,
        time,
        locationLabel,
        totalPrice,
        depositAmount,
        remainingBalance,
      }),
    });
  } catch (error) {
    console.error("Erreur d'envoi d'email :", error);
  }

  redirect(`/hair/reservation/confirmation?bookingId=${booking.id}`);
}