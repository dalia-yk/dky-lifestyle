import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { prisma } from "../../../lib/prisma";

export default async function MonComptePage() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  // Cas 1 : personne n'est connectée
  if (!userEmail) {
    return (
      <main>
        <Navbar />
        <PageHeader
          eyebrow="DKY Hair"
          title="Mon compte"
          description="Connecte-toi pour accéder à ton historique de réservations."
        />
        <section className="bg-brand-black py-20 px-6 text-center">
          <SignInButton mode="modal">
            <Button className="bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full px-8 py-6">
              Se connecter
            </Button>
          </SignInButton>
        </section>
        <Footer />
      </main>
    );
  }

  // Cas 2 : connectée, on cherche ses réservations via son email
  const client = await prisma.client.findUnique({
    where: { email: userEmail },
    include: {
      bookings: {
        include: { service: true },
        orderBy: { date: "desc" },
      },
    },
  });

  const bookings = client?.bookings ?? [];
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const upcomingBookings = bookings.filter((b) => b.date >= startOfToday);
  const pastBookings = bookings.filter((b) => b.date < startOfToday);

  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title={`Bonjour ${user.firstName ?? ""} !`}
        description="Voici l'historique de tes réservations."
      />

      <section className="bg-brand-ivory py-16 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          {/* Réservations à venir */}
          <div>
            <h2 className="font-heading text-brand-black text-2xl mb-6">
              À venir
            </h2>
            {upcomingBookings.length === 0 ? (
              <p className="font-sans text-brand-mocha/60 text-sm">
                Aucune réservation à venir.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl border border-brand-champagne/20 p-6 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-heading text-brand-black text-lg">
                        {booking.service.name}
                      </p>
                      <p className="font-sans text-brand-mocha/60 text-sm">
                        {booking.date.toLocaleDateString("fr-CA")} —{" "}
                        {booking.time}
                      </p>
                    </div>
                    <span
                      className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full ${
                        booking.status === "PENDING"
                          ? "bg-brand-champagne/20 text-brand-champagne"
                          : booking.status === "CONFIRMED"
                          ? "bg-green-500/10 text-green-700"
                          : "bg-brand-mocha/10 text-brand-mocha/50"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Historique */}
          <div>
            <h2 className="font-heading text-brand-black text-2xl mb-6">
              Historique
            </h2>
            {pastBookings.length === 0 ? (
              <p className="font-sans text-brand-mocha/60 text-sm">
                Aucune réservation passée pour le moment.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {pastBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white/50 rounded-2xl border border-brand-champagne/10 p-6 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-heading text-brand-mocha text-lg">
                        {booking.service.name}
                      </p>
                      <p className="font-sans text-brand-mocha/50 text-sm">
                        {booking.date.toLocaleDateString("fr-CA")}
                      </p>
                    </div>
                    <span className="font-sans text-brand-mocha/40 text-xs uppercase tracking-widest">
                      Terminé
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}