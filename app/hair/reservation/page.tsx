import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { prisma } from "../../../lib/prisma";
import { BookingWizard } from "@/components/booking-wizard/booking-wizard";

export default async function ReservationPage() {
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

  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Réservation"
        description="Réserve ton moment Crafted by Purpose en quelques étapes."
      />

      <section className="bg-brand-black py-20 px-6">
        <div className="max-w-xl mx-auto">
          <BookingWizard services={services} />
        </div>
      </section>

      <Footer />
    </main>
  );
}