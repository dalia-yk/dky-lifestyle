import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { BookingWizard } from "@/components/booking-wizard/booking-wizard";
import { prisma } from "../../../../lib/prisma";

interface ReservationPageProps {
  searchParams: Promise<{ serviceId?: string }>;
}

export default async function ReservationPage({
  searchParams,
}: ReservationPageProps) {
  const { serviceId } = await searchParams;

  const services = await prisma.service.findMany({
    select: {
      id: true,
      name: true,
      priceFrom: true,
      priceWithoutExtensions: true,
      duration: true,
      collection: true,
      extensionFee: true,
      extensionsMode: true,
      requiresLength: true,
      requiresSize: true,
      category: true,
    },
    orderBy: { name: "asc" },
  });

  const addOns = await prisma.addOn.findMany({
    select: { id: true, name: true, price: true },
    orderBy: { name: "asc" },
  });

  const packages = await prisma.package.findMany({
    select: {
      id: true,
      name: true,
      tagline: true,
      featured: true,
      price: true,
      includesPremiumHair: true,
      includedAddOns: { select: { id: true, name: true } },
      compatibleServices: { select: { id: true } },
    },
  });

  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Réservation"
        description="Réserve ton moment Crafted by Purpose en quelques étapes."
      />

      <section className="bg-brand-black py-20 px-6">
        <BookingWizard
          services={services}
          addOns={addOns}
          packages={packages}
          preselectedServiceId={serviceId}
        />
      </section>

      <Footer />
    </main>
  );
}