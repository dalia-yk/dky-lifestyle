import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { prisma } from "../../../lib/prisma";

const PAGE_SIZE = 5;

interface MonComptePageProps {
  searchParams: Promise<{ upcomingPage?: string; pastPage?: string }>;
}

export default async function MonComptePage({ searchParams }: MonComptePageProps) {
  const { upcomingPage, pastPage } = await searchParams;
  const currentUpcomingPage = Math.max(1, Number(upcomingPage) || 1);
  const currentPastPage = Math.max(1, Number(pastPage) || 1);

  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

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

  const client = await prisma.client.findUnique({ where: { email: userEmail } });

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const upcomingCount = client
    ? await prisma.booking.count({ where: { clientId: client.id, date: { gte: startOfToday } } })
    : 0;
  const pastCount = client
    ? await prisma.booking.count({ where: { clientId: client.id, date: { lt: startOfToday } } })
    : 0;

  const upcomingTotalPages = Math.max(1, Math.ceil(upcomingCount / PAGE_SIZE));
  const pastTotalPages = Math.max(1, Math.ceil(pastCount / PAGE_SIZE));

  const upcomingBookings = client
    ? await prisma.booking.findMany({
        where: { clientId: client.id, date: { gte: startOfToday } },
        include: { service: true },
        orderBy: { date: "asc" },
        skip: (currentUpcomingPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      })
    : [];

  const pastBookings = client
    ? await prisma.booking.findMany({
        where: { clientId: client.id, date: { lt: startOfToday } },
        include: { service: true },
        orderBy: { date: "desc" },
        skip: (currentPastPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      })
    : [];

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
          <div>
            <h2 className="font-heading text-brand-black text-2xl mb-6">À venir</h2>
            {upcomingBookings.length === 0 ? (
              <p className="font-sans text-brand-mocha/60 text-sm">Aucune réservation à venir.</p>
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  {upcomingBookings.map((booking) => (
                    <Link
                      key={booking.id}
                      href={`/hair/compte/${booking.id}`}
                      className="bg-white rounded-2xl border border-brand-champagne/20 p-6 flex justify-between items-center hover:border-brand-champagne/50 transition-all"
                    >
                      <div>
                        <p className="font-heading text-brand-black text-lg">{booking.service.name}</p>
                        <p className="font-sans text-brand-mocha/60 text-sm">
                          {booking.date.toLocaleDateString("fr-CA")} — {booking.time}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full ${
                            booking.status === "PENDING"
                              ? "bg-brand-champagne/20 text-brand-champagne"
                              : booking.status === "CONFIRMED"
                              ? "bg-green-500/10 text-green-700"
                              : booking.status === "CANCELLED"
                              ? "bg-red-500/10 text-red-600"
                              : "bg-brand-mocha/10 text-brand-mocha/50"
                          }`}
                        >
                          {booking.status}
                        </span>
                        <span
                          className={`text-xs ${
                            booking.paymentStatus === "PAID" ? "text-green-600" : "text-brand-mocha/40"
                          }`}
                        >
                          {booking.paymentStatus === "PAID" ? "✓ Dépôt payé" : "Paiement en attente"}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                {upcomingTotalPages > 1 && (
                  <div className="flex justify-center gap-4 mt-4">
                    <Link
                      href={`/hair/compte?upcomingPage=${Math.max(1, currentUpcomingPage - 1)}&pastPage=${currentPastPage}`}
                      className={`text-xs font-sans ${
                        currentUpcomingPage === 1 ? "text-brand-mocha/20 pointer-events-none" : "text-brand-champagne hover:underline"
                      }`}
                    >
                      ← Précédent
                    </Link>
                    <span className="text-xs font-sans text-brand-mocha/40">
                      {currentUpcomingPage} / {upcomingTotalPages}
                    </span>
                    <Link
                      href={`/hair/compte?upcomingPage=${Math.min(upcomingTotalPages, currentUpcomingPage + 1)}&pastPage=${currentPastPage}`}
                      className={`text-xs font-sans ${
                        currentUpcomingPage === upcomingTotalPages ? "text-brand-mocha/20 pointer-events-none" : "text-brand-champagne hover:underline"
                      }`}
                    >
                      Suivant →
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          <div>
            <h2 className="font-heading text-brand-black text-2xl mb-6">Historique</h2>
            {pastBookings.length === 0 ? (
              <p className="font-sans text-brand-mocha/60 text-sm">Aucune réservation passée pour le moment.</p>
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  {pastBookings.map((booking) => (
                    <Link
                      key={booking.id}
                      href={`/hair/compte/${booking.id}`}
                      className="bg-white/50 rounded-2xl border border-brand-champagne/10 p-6 flex justify-between items-center hover:border-brand-champagne/30 transition-all"
                    >
                      <div>
                        <p className="font-heading text-brand-mocha text-lg">{booking.service.name}</p>
                        <p className="font-sans text-brand-mocha/50 text-sm">
                          {booking.date.toLocaleDateString("fr-CA")}
                        </p>
                      </div>
                      <span className="font-sans text-brand-mocha/40 text-xs uppercase tracking-widest">
                        {booking.status === "CANCELLED" ? "Annulée" : "Terminé"}
                      </span>
                    </Link>
                  ))}
                </div>
                {pastTotalPages > 1 && (
                  <div className="flex justify-center gap-4 mt-4">
                    <Link
                      href={`/hair/compte?upcomingPage=${currentUpcomingPage}&pastPage=${Math.max(1, currentPastPage - 1)}`}
                      className={`text-xs font-sans ${
                        currentPastPage === 1 ? "text-brand-mocha/20 pointer-events-none" : "text-brand-champagne hover:underline"
                      }`}
                    >
                      ← Précédent
                    </Link>
                    <span className="text-xs font-sans text-brand-mocha/40">
                      {currentPastPage} / {pastTotalPages}
                    </span>
                    <Link
                      href={`/hair/compte?upcomingPage=${currentUpcomingPage}&pastPage=${Math.min(pastTotalPages, currentPastPage + 1)}`}
                      className={`text-xs font-sans ${
                        currentPastPage === pastTotalPages ? "text-brand-mocha/20 pointer-events-none" : "text-brand-champagne hover:underline"
                      }`}
                    >
                      Suivant →
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}