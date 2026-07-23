"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { prisma } from "../../../lib/prisma";
import { BookingCreatedEmail } from "@/emails/booking-created";
import { addOnsList } from "@/data/addons";
import { BookingWizardData } from "@/types/booking-wizard";
import { currentUser } from "@clerk/nextjs/server";

export async function updateBookingFromWizard(
  bookingId: string,
  data: BookingWizardData
) {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  const existingBooking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { client: true },
  });

  if (!existingBooking || existingBooking.client.email !== userEmail) {
    throw new Error("Non autorisé à modifier cette réservation");
  }

  if (!data.serviceId) {
    throw new Error("Aucune coiffure sélectionnée");
  }

  const service = await prisma.service.findUnique({
    where: { id: data.serviceId },
  });

  if (!service) {
    throw new Error("Service introuvable");
  }

  const addOnsTotal = data.addOns.reduce((sum, addOnName) => {
    const addOn = addOnsList.find((a) => a.value === addOnName);
    return sum + (addOn?.price ?? 0);
  }, 0);

  let basePrice = service.priceFrom;
  let extensionFee = 0;

  if (data.hairOption === "none") {
    basePrice = service.priceWithoutExtensions ?? service.priceFrom;
  } else if (data.hairOption === "dky-provides") {
    extensionFee = service.extensionFee;
  }

  const totalPrice = basePrice + extensionFee + addOnsTotal;
  const depositAmount = Math.round(totalPrice * 0.2);
  const remainingBalance = totalPrice - depositAmount;

  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      serviceId: service.id,
      date: new Date(data.date),
      time: data.time,
      category: data.collection,
      size: data.size,
      length: data.length,
      hairOption: data.hairOption,
      hairColor: data.hairColor,
      addOns: data.addOns,
      locationType: data.locationType,
      address: data.locationType === "HOME" ? data.address : null,
      estimatedDuration: service.duration,
      totalPrice,
      depositAmount,
      remainingBalance,
    },
    include: { client: true, service: true },
  });

  const bookingNumber = formatBookingNumber(
    updatedBooking.bookingSeq,
    updatedBooking.createdAt
  );
  const dateLabel = updatedBooking.date.toLocaleDateString("fr-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  try {
    await resend.emails.send({
      from: "DKY Hair <onboarding@resend.dev>",
      to: "dkylifestyle@gmail.com",
      subject: `Réservation ${bookingNumber} modifiée par la cliente`,
      html: `
        <p><strong>Cliente :</strong> ${updatedBooking.client.name} (${updatedBooking.client.email})</p>
        <p><strong>Nouvelle coiffure :</strong> ${updatedBooking.service.name}</p>
        <p><strong>Nouvelle date :</strong> ${dateLabel} à ${updatedBooking.time}</p>
        <p><strong>Nouveau prix total :</strong> ${totalPrice}$</p>
      `,
    });
  } catch (error) {
    console.error("Erreur d'envoi d'email :", error);
  }

  redirect(`/hair/compte/${bookingId}`);
}

const resend = new Resend(process.env.RESEND_API_KEY);

function formatBookingNumber(seq: number, date: Date) {
  return `DKY-${date.getFullYear()}-${String(seq).padStart(5, "0")}`;
}

export async function createBookingFromWizard(data: BookingWizardData) {
  if (!data.serviceId) {
    throw new Error("Aucune coiffure sélectionnée");
  }

  const service = await prisma.service.findUnique({
    where: { id: data.serviceId },
  });

  if (!service) {
    throw new Error("Service introuvable");
  }

  const addOnsTotal = data.addOns.reduce((sum, addOnName) => {
    const addOn = addOnsList.find((a) => a.value === addOnName);
    return sum + (addOn?.price ?? 0);
  }, 0);

  let basePrice = service.priceFrom;
  let extensionFee = 0;

  if (data.hairOption === "none") {
    basePrice = service.priceWithoutExtensions ?? service.priceFrom;
  } else if (data.hairOption === "dky-provides") {
    extensionFee = service.extensionFee;
  }

  const totalPrice = basePrice + extensionFee + addOnsTotal;
  const depositAmount = Math.round(totalPrice * 0.2);
  const remainingBalance = totalPrice - depositAmount;

  const client = await prisma.client.upsert({
    where: { email: data.email },
    update: { name: data.name, phone: data.phone },
    create: { name: data.name, email: data.email, phone: data.phone },
  });

  const booking = await prisma.booking.create({
    data: {
      clientId: client.id,
      serviceId: service.id,
      date: new Date(data.date),
      time: data.time,
      category: data.collection,
      size: data.size,
      length: data.length,
      hairOption: data.hairOption,
      hairColor: data.hairColor,
      addOns: data.addOns,
      locationType: data.locationType,
      address: data.locationType === "HOME" ? data.address : null,
      estimatedDuration: service.duration,
      totalPrice,
      depositAmount,
      remainingBalance,
      paymentStatus: "DEPOSIT_REQUESTED",
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
        <p><strong>Cliente :</strong> ${data.name} (${data.email}, ${data.phone})</p>
        <p><strong>Coiffure :</strong> ${service.name}</p>
        <p><strong>Taille :</strong> ${data.size} — <strong>Longueur :</strong> ${data.length}</p>
        <p><strong>Add-ons :</strong> ${data.addOns.join(", ") || "Aucun"}</p>
        <p><strong>Date :</strong> ${dateLabel} à ${data.time}</p>
        <p><strong>Lieu :</strong> ${locationLabel}</p>
        <p><strong>Dépôt :</strong> ${depositAmount}$</p>
      `,
    });

    await resend.emails.send({
      from: "DKY Hair <onboarding@resend.dev>",
      to: data.email,
      subject: `Ta réservation ${bookingNumber} est enregistrée !`,
      react: BookingCreatedEmail({
        clientName: data.name,
        bookingNumber,
        serviceName: service.name,
        dateLabel,
        time: data.time,
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