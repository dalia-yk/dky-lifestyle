import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { prisma } from "../../../../lib/prisma";
import { CancelBookingButton } from "@/components/cancel-booking-button";

interface DetailPageProps {
  params: Promise<{ bookingId: string }>;
}

export default async function BookingDetailPage({ params }: DetailPageProps) {
  const { bookingId } = await params;
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  if (!userEmail) {
    redirect("/hair/compte");
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { client: true, service: true, addOns: true, package: true },
  });

  if (!booking || booking.client.email !== userEmail) {
    notFound();
  }

  const dateLabel = booking.date.toLocaleDateString("fr-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const canModify =
    booking.status !== "CANCELLED" && booking.status !== "COMPLETED";

  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title={booking.service.name}
        description={`Réservation du ${dateLabel} à ${booking.time}`}
      />

      <section className="bg-brand-ivory py-16 px-6">
        <div className="max-w-xl mx-auto flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-brand-champagne/20 p-6 flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="font-sans text-brand-mocha/60 text-sm">Statut</span>
              <span className="font-sans text-brand-black text-sm font-medium">{booking.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans text-brand-mocha/60 text-sm">Taille / Longueur</span>
              <span className="font-sans text-brand-black text-sm">{booking.size} / {booking.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans text-brand-mocha/60 text-sm">Mèches</span>
              <span className="font-sans text-brand-black text-sm">
                {booking.hairOption === "dky-provides"
                   ? `DKY (${booking.hairColor})`
                   : booking.hairOption === "client-provides"
                   ? "Apportées"
                   : "Aucune"
                }
              </span>
            </div>
            {booking.package && (
              <div className="flex justify-between">
                <span className="font-sans text-brand-mocha/60 text-sm">Forfait</span>
                <span className="font-sans text-brand-black text-sm">{booking.package.name}</span>
              </div>
            )}
            {booking.addOns.length > 0 && (
              <div className="flex justify-between">
                <span className="font-sans text-brand-mocha/60 text-sm">Add-ons</span>
                <span className="font-sans text-brand-black text-sm">
                  {booking.addOns.map((a) => a.name).join(", ")}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-sans text-brand-mocha/60 text-sm">Lieu</span>
              <span className="font-sans text-brand-black text-sm">
                {booking.locationType === "HOME" ? booking.address : "Studio DKY Hair"}
              </span>
            </div>
            <div className="flex justify-between border-t border-brand-champagne/10 pt-3 mt-1">
              <span className="font-sans text-brand-mocha/60 text-sm">Prix total</span>
              <span className="font-sans text-brand-black text-sm font-medium">{booking.totalPrice}$</span>
            </div>
          </div>

          {canModify && (
            <div className="flex gap-3">
              <Link href={`/hair/compte/${booking.id}/modifier`} className="flex-1">
                <Button variant="outline" className="w-full border-brand-champagne/40 text-brand-black rounded-full py-6">
                  Modifier
                </Button>
              </Link>
              <CancelBookingButton bookingId={booking.id} />
            </div>
          )}

          <Link href="/hair/compte" className="text-center">
            <span className="font-sans text-brand-mocha/60 text-sm hover:text-brand-champagne transition-colors">
              Retour à mes réservations
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}