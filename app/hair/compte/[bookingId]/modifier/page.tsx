import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { BookingWizard } from "@/components/booking-wizard/booking-wizard";
import { prisma } from "../../../../../lib/prisma";
import { BookingWizardData } from "@/types/booking-wizard";

interface EditPageProps {
  params: Promise<{ bookingId: string }>;
}

export default async function ModifyBookingPage({ params }: EditPageProps) {
  const { bookingId } = await params;
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  if (!userEmail) {
    redirect("/hair/compte");
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { client: true },
  });

  if (!booking || booking.client.email !== userEmail) {
    notFound();
  }

  const services = await prisma.service.findMany({
    select: {
      id: true,
      name: true,
      priceFrom: true,
      duration: true,
      collection: true,
      extensionFee: true,
      extensionsMode: true,
      requiresLength: true,
      requiresSize: true,
      priceWithoutExtensions: true,
    },
    orderBy: { name: "asc" },
  });

  const initialData: BookingWizardData = {
    collection: booking.category as BookingWizardData["collection"],
    serviceId: booking.serviceId,
    size: booking.size as BookingWizardData["size"],
    length: booking.length as BookingWizardData["length"],
    hairOption: booking.hairOption as BookingWizardData["hairOption"],
    hairColor: booking.hairColor,
    addOns: booking.addOns,
    locationType: booking.locationType,
    address: booking.address ?? "",
    date: booking.date.toISOString().split("T")[0],
    time: booking.time,
    name: booking.client.name,
    email: booking.client.email,
    phone: booking.client.phone ?? "",
  };

  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Modifier ta réservation"
        description="Ajuste les détails de ton rendez-vous."
      />

      <section className="bg-brand-black py-20 px-6">
        <BookingWizard
          services={services}
          mode="edit"
          bookingId={booking.id}
          initialData={initialData}
        />
      </section>

      <Footer />
    </main>
  );
}