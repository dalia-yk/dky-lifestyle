import Link from "next/link";
import { Calendar, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { prisma } from "../../../../lib/prisma";
import { notFound } from "next/navigation";

interface ConfirmationPageProps {
  searchParams: Promise<{ bookingId?: string }>;
}

const timelineSteps = [
  "Réservation envoyée",
  "Dépôt demandé",
  "En attente de validation",
  "Rendez-vous confirmé",
];

export default async function ConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const { bookingId } = await searchParams;

  if (!bookingId) {
    notFound();
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { service: true, client: true },
  });

  if (!booking) {
    notFound();
  }

  const depositPercent = Math.round(
    (booking.depositAmount / booking.totalPrice) * 100
  );

  const dateLabel = booking.date.toLocaleDateString("fr-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Lien WhatsApp avec message pré-rempli
  const whatsappMessage = encodeURIComponent(
    `Bonjour DKY Hair, je viens de réserver ${booking.service.name} pour le ${dateLabel} à ${booking.time}. J'aimerais confirmer les détails.`
  );
  const whatsappLink = `https://wa.me/18193298337?text=${whatsappMessage}`;

  // Lien "Ajouter à Google Calendar"
  const startDate = new Date(booking.date);
  const [hours, minutes] = booking.time.split(":");
  startDate.setHours(Number(hours), Number(minutes));
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const formatForCalendar = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Rendez-vous DKY Hair — ${booking.service.name}`
  )}&dates=${formatForCalendar(startDate)}/${formatForCalendar(
    endDate
  )}&details=${encodeURIComponent(
    `Réservation DKY Hair pour ${booking.service.name}`
  )}`;

  return (
    <main>
      <Navbar />

      <section className="bg-brand-black pt-40 pb-16 px-6 text-center">
        <span className="inline-block bg-brand-champagne/10 text-brand-champagne text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          ✓ Réservation confirmée
        </span>
        <h1 className="font-heading text-brand-ivory text-4xl md:text-5xl mb-4">
          Merci {booking.client.name.split(" ")[0]} !
        </h1>
        <p className="font-sans text-brand-ivory/70 text-base max-w-xl mx-auto">
          Votre demande de réservation a bien été enregistrée. Nous avons
          hâte de vous accueillir.
        </p>
      </section>

      <section className="bg-brand-ivory py-16 px-6">
        <div className="max-w-xl mx-auto flex flex-col gap-8">
          {/* Carte résumé */}
          <div className="bg-white rounded-2xl border border-brand-champagne/20 overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-brand-mocha to-brand-black flex items-center justify-center">
              <span className="font-heading text-brand-ivory text-2xl">
                {booking.service.name}
              </span>
            </div>
            <div className="p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 font-sans text-brand-mocha text-sm">
                📅 {dateLabel}
              </div>
              <div className="flex items-center gap-2 font-sans text-brand-mocha text-sm">
                🕐 {booking.time}
              </div>
              <div className="flex items-center gap-2 font-sans text-brand-mocha text-sm">
                📍 {booking.locationType === "HOME" ? "À domicile" : "Chez DKY Hair"}
              </div>
            </div>
          </div>

          {/* Paiement */}
          <div className="bg-white rounded-2xl border border-brand-champagne/20 p-6 flex flex-col gap-4">
            <h3 className="font-heading text-brand-black text-lg">
              Paiement
            </h3>
            <div className="flex justify-between font-sans text-sm">
              <span className="text-brand-mocha/70">Prix total</span>
              <span className="text-brand-black font-medium">
                {booking.totalPrice}$
              </span>
            </div>
            <div className="flex justify-between font-sans text-sm">
              <span className="text-brand-mocha/70">Dépôt demandé</span>
              <span className="text-brand-champagne font-medium">
                {booking.depositAmount}$
              </span>
            </div>
            <div className="flex justify-between font-sans text-sm">
              <span className="text-brand-mocha/70">Solde restant</span>
              <span className="text-brand-black font-medium">
                {booking.remainingBalance}$
              </span>
            </div>

            <div className="mt-2">
              <div className="w-full h-2 bg-brand-mocha/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-champagne rounded-full"
                  style={{ width: `${depositPercent}%` }}
                />
              </div>
              <p className="font-sans text-brand-mocha/50 text-xs mt-2">
                {depositPercent}% à prévoir en dépôt
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-brand-champagne/20 p-6">
            <h3 className="font-heading text-brand-black text-lg mb-5">
              Les prochaines étapes
            </h3>
            <div className="flex flex-col gap-4">
              {timelineSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                      index === 0
                        ? "bg-brand-champagne text-brand-black"
                        : "bg-brand-mocha/10 text-brand-mocha/40"
                    }`}
                  >
                    {index === 0 ? "✓" : index + 1}
                  </span>
                  <span
                    className={`font-sans text-sm ${
                      index === 0
                        ? "text-brand-black"
                        : "text-brand-mocha/50"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* À préparer */}
          <div className="bg-white rounded-2xl border border-brand-champagne/20 p-6">
            <h3 className="font-heading text-brand-black text-lg mb-4">
              Avant votre rendez-vous
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                "Arriver à l'heure",
                "Cheveux démêlés",
                "Prévoir des photos d'inspiration",
                "Prévoir le paiement restant",
              ].map((item) => (
                <li
                  key={item}
                  className="font-sans text-brand-mocha/80 text-sm"
                >
                  ✔ {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={calendarLink} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full">
                <Calendar size={16} className="mr-2" />
                Ajouter au calendrier
              </Button>
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-brand-champagne/40 text-brand-black hover:bg-brand-champagne/10 rounded-full"
              >
                <MessageCircle size={16} className="mr-2" />
                Contacter sur WhatsApp
              </Button>
            </a>
          </div>

          <Link href="/hair" className="text-center">
            <span className="font-sans text-brand-mocha/60 text-sm hover:text-brand-champagne transition-colors">
              Retour à l'accueil
            </span>
          </Link>

          {/* Citation */}
          <div className="border-l-4 border-brand-champagne pl-6 italic text-brand-mocha py-2">
            <p className="font-heading text-lg leading-relaxed">
              « Tout ce que vous faites, faites-le de bon cœur, comme pour le
              Seigneur. »
            </p>
            <span className="block mt-2 uppercase tracking-[0.2em] text-xs text-brand-champagne">
              Colossiens 3:23
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}