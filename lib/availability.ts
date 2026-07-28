import { prisma } from "../lib/prisma";

interface TimeSlot {
  time: string;
  available: boolean;
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export async function isDateAvailable(date: Date): Promise<boolean> {
  const dayOfWeek = date.getDay();

  const businessHours = await prisma.businessHours.findUnique({
    where: { dayOfWeek },
  });

  if (!businessHours || !businessHours.isOpen) {
    return false;
  }

  const blockedDate = await prisma.blockedDate.findFirst({
    where: {
      date: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  return !blockedDate;
}

export async function getAvailableTimeSlots(
  date: Date,
  durationMinutes: number
): Promise<TimeSlot[]> {
  const dayOfWeek = date.getDay();

  const businessHours = await prisma.businessHours.findUnique({
    where: { dayOfWeek },
  });

  if (!businessHours || !businessHours.isOpen) {
    return [];
  }

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  const existingBookings = await prisma.booking.findMany({
    where: {
      date: { gte: dayStart, lte: dayEnd },
      status: { not: "CANCELLED" },
    },
    select: {
      time: true,
      service: { select: { durationMinutes: true } },
      addOns: { select: { durationMinutes: true } },
    },
  });

  const bookedRanges = existingBookings.map((booking) => {
    const start = timeToMinutes(booking.time);
    const addOnsDuration = booking.addOns.reduce((sum, a) => sum + a.durationMinutes, 0);
    const duration = booking.service.durationMinutes + addOnsDuration;
    return { start, end: start + duration };
  });


  const openMinutes = timeToMinutes(businessHours.openTime);
  const closeMinutes = timeToMinutes(businessHours.closeTime);

  const slots: TimeSlot[] = [];
  const stepMinutes = 30;

  for (let start = openMinutes; start + durationMinutes <= closeMinutes; start += stepMinutes) {
    const end = start + durationMinutes;

    const overlaps = bookedRanges.some(
      (range) => start < range.end && end > range.start
    );

    slots.push({
      time: minutesToTime(start),
      available: !overlaps,
    });
  }

  return slots;
}