import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { prisma } from "../../../../lib/prisma";
import { BookingActions } from "@/components/admin/booking-actions";

const PAGE_SIZE = 10;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminBookingsPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const totalCount = await prisma.booking.count();
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const bookings = await prisma.booking.findMany({
    include: { client: true, service: true },
    orderBy: { createdAt: "desc" },
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <div>
      <h1 className="font-heading text-brand-ivory text-3xl mb-8">Bookings</h1>

      <div className="bg-white/5 border border-brand-champagne/20 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-brand-champagne/20">
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Cliente</th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Coiffure</th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Date</th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Statut</th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Paiement</th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Dépôt</th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-brand-champagne/10 last:border-0">
                <td className="font-sans text-brand-ivory text-sm p-4">
                  {booking.client.name}
                  <br />
                  <span className="text-brand-ivory/40 text-xs">{booking.client.email}</span>
                </td>
                <td className="font-sans text-brand-ivory/80 text-sm p-4">{booking.service.name}</td>
                <td className="font-sans text-brand-ivory/80 text-sm p-4">
                  {booking.date.toLocaleDateString("fr-CA")} — {booking.time}
                </td>
                <td className="p-4">
                  <span
                    className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full ${
                      booking.status === "PENDING"
                        ? "bg-brand-champagne/20 text-brand-champagne"
                        : booking.status === "CONFIRMED"
                        ? "bg-green-500/20 text-green-400"
                        : booking.status === "CANCELLED"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-brand-ivory/10 text-brand-ivory/50"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full ${
                      booking.paymentStatus === "PAID"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-brand-champagne/10 text-brand-ivory/50"
                    }`}
                  >
                    {booking.paymentStatus === "PAID" ? "Payé" : "En attente"}
                  </span>
                </td>
                <td className="font-sans text-brand-champagne text-sm p-4">{booking.depositAmount}$</td>
                <td className="p-4">
                  <BookingActions bookingId={booking.id} currentStatus={booking.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <p className="text-center font-sans text-brand-ivory/50 text-sm py-12">
            Aucune réservation pour le moment.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="font-sans text-brand-ivory/40 text-xs">
            Page {currentPage} / {totalPages} — {totalCount} réservations
          </p>
          <div className="flex gap-2">
            <Link
              href={`/admin/hair/bookings?page=${Math.max(1, currentPage - 1)}`}
              className={`flex items-center gap-1 text-xs font-sans px-3 py-1.5 rounded-lg border border-brand-champagne/20 ${
                currentPage === 1 ? "text-brand-ivory/20 pointer-events-none" : "text-brand-ivory/70 hover:border-brand-champagne/50"
              }`}
            >
              <ChevronLeft size={14} /> Précédent
            </Link>
            <Link
              href={`/admin/hair/bookings?page=${Math.min(totalPages, currentPage + 1)}`}
              className={`flex items-center gap-1 text-xs font-sans px-3 py-1.5 rounded-lg border border-brand-champagne/20 ${
                currentPage === totalPages ? "text-brand-ivory/20 pointer-events-none" : "text-brand-ivory/70 hover:border-brand-champagne/50"
              }`}
            >
              Suivant <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}