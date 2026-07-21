import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { BookingForm } from "@/components/booking-form";
import { prisma } from "../../../lib/prisma";

export default async function ReservationPage() {
  const services = await prisma.service.findMany({
    select: {
      id: true,
      name: true,
      priceFrom: true,
      duration: true,
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
          <BookingForm services={services} />
        </div>
      </section>

      <Footer />
    </main>
  );
}