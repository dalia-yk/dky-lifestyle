"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { prisma } from "../../../lib/prisma";
import { BookingCreatedEmail } from "@/emails/booking-created";
import { BookingWizardData } from "@/types/booking-wizard";

const resend = new Resend(process.env.RESEND_API_KEY);

function formatBookingNumber(seq: number, date: Date) {
  return `DKY-${date.getFullYear()}-${String(seq).padStart(5, "0")}`;
}

async function calculatePricing(data: BookingWizardData) {
  const service = await prisma.service.findUnique({
    where: { id: data.serviceId ?? undefined },
  });

  if (!service) {
    throw new Error("Service introuvable");
  }

  const selectedPackage = data.packageId
    ? await prisma.package.findUnique({ where: { id: data.packageId } })
    : null;

  let basePrice = service.priceFrom;
  let extensionFee = 0;

  if (data.hairOption === "none") {
    basePrice = service.priceWithoutExtensions ?? service.priceFrom;
  } else if (data.hairOption === "dky-provides" && !selectedPackage?.includesPremiumHair) {
    extensionFee = service.extensionFee;
  }

  const packagePrice = selectedPackage?.price ?? 0;

  const addOns = await prisma.addOn.findMany({
    where: { id: { in: data.addOnIds } },
  });
  const includedAddOnIds = selectedPackage
    ? (await prisma.package.findUnique({
        where: { id: selectedPackage.id },
        include: { includedAddOns: true },
      }))?.includedAddOns.map((a) => a.id) ?? []
    : [];
  const extraAddOns = addOns.filter((a) => !includedAddOnIds.includes(a.id));
  const addOnsTotal = extraAddOns.reduce((sum, a) => sum + a.price, 0);

  const totalPrice = basePrice + extensionFee + packagePrice + addOnsTotal;
  const depositAmount = Math.round(totalPrice * 0.2);
  const remainingBalance = totalPrice - depositAmount;

  return { service, totalPrice, depositAmount, remainingBalance };
}

export async function createBookingFromWizard(data: BookingWizardData) {
  if (!data.serviceId) {
    throw new Error("Aucune coiffure sélectionnée");
  }

  const { service, totalPrice, depositAmount, remainingBalance } =
    await calculatePricing(data);

  const client = await prisma.client.upsert({
    where: { email: data.email },
    update: { name: data.name, phone: data.phone },
    create: { name: data.name, email: data.email, phone: data.phone },
  });

  const booking = await prisma.booking.create({
    data: {
      clientId: client.id,
      serviceId: service.id,
      packageId: data.packageId,
      date: new Date(data.date),
      time: data.time,
      category: data.collection,
      size: data.size,
      length: data.length,
      hairOption: data.hairOption,
      hairColor: data.hairColor,
      addOns: { connect: data.addOnIds.map((id) => ({ id })) },
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
  const locationLabel = booking.locationType === "HOME" ? "À domicile" : "Studio DKY Hair";

  try {
    await resend.emails.send({
      from: "DKY Hair <onboarding@resend.dev>",
      to: "dkylifestyle@gmail.com",
      subject: `Nouvelle réservation ${bookingNumber} — ${service.name}`,
      html: `
        <p><strong>Cliente :</strong> ${data.name} (${data.email}, ${data.phone})</p>
        <p><strong>Service :</strong> ${service.name}</p>
        <p><strong>Date :</strong> ${dateLabel} à ${data.time}</p>
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

  const { service, totalPrice, depositAmount, remainingBalance } =
    await calculatePricing(data);

  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      serviceId: service.id,
      packageId: data.packageId,
      date: new Date(data.date),
      time: data.time,
      category: data.collection,
      size: data.size,
      length: data.length,
      hairOption: data.hairOption,
      hairColor: data.hairColor,
      addOns: { set: data.addOnIds.map((id) => ({ id })) },
      locationType: data.locationType,
      address: data.locationType === "HOME" ? data.address : null,
      estimatedDuration: service.duration,
      totalPrice,
      depositAmount,
      remainingBalance,
    },
    include: { client: true, service: true },
  });

  const bookingNumber = formatBookingNumber(updatedBooking.bookingSeq, updatedBooking.createdAt);
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
        <p><strong>Nouveau service :</strong> ${updatedBooking.service.name}</p>
        <p><strong>Nouvelle date :</strong> ${dateLabel} à ${updatedBooking.time}</p>
        <p><strong>Nouveau prix total :</strong> ${totalPrice}$</p>
      `,
    });
  } catch (error) {
    console.error("Erreur d'envoi d'email :", error);
  }

  redirect(`/hair/compte/${bookingId}`);
}