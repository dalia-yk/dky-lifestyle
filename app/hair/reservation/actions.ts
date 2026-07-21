"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";

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

  redirect(`/hair/reservation/confirmation?bookingId=${booking.id}`);
}