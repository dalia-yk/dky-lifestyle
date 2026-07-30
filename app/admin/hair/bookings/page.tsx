import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { prisma } from "../../../../lib/prisma";
import { BookingActions } from "@/components/admin/booking-actions";
import { SearchBar } from "@/components/admin/search-bar";
import type { Prisma } from "../../../../lib/generated/prisma/client";

const PAGE_SIZE = 10;

interface Props {
  searchParams: Promise<{ page?: string; q?: string; status?: string }>;
}

const statusFilters = [
  { value: "", label: "Tous" },
  { value: "PENDING", label: "En attente" },
  { value: "CONFIRMED", label: "Confirmées" },
  { value: "CANCELLED", label: "Annulées" },
  { value: "COMPLETED", label: "Terminées" },
];

export default async function AdminBookingsPage({ searchParams }: Props) {
  const { page, q, status } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const where: Prisma.BookingWhereInput = {
    ...(status ? { status: status as Prisma.EnumBookingStatusFilter["equals"] } : {}),
    ...(q
      ? {
          OR: [
            { client: { name: { contains: q, mode: "insensitive" } } },
            { client: { email: { contains: q, mode: "insensitive" } } },
            { service: { name: { contains: q, mode: "insensitive" } } },
          ],
        }
      : {}),
  };

  const totalCount = await prisma.booking.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const bookings = await prisma.booking.findMany({
    where,
    include: { client: true, service: true },
    orderBy: { createdAt: "desc" },
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-heading text-brand-ivory text-3xl">Bookings</h1>
        <SearchBar placeholder="Rechercher cliente ou service..." />
      </div>

      <div className="flex gap-2 mb-6">
        {statusFilters.map((filter) => (
          <Link
            key={filter.value}
            href={`/admin/hair/bookings?status=${filter.value}${q ? `&q=${q}` : ""}`}
            className={`text-xs font-sans px-3 py-1.5 rounded-full border transition-colors ${
              (status ?? "") === filter.value
                ? "bg-brand-champagne text-brand-black border-brand-champagne"
                : "border-brand-champagne/20 text-brand-ivory/60 hover:border-brand-champagne/50"
            }`}
          >
            {filter.label}
          </Link>
        ))}
      </div>

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
            Aucune réservation trouvée.
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
              href={`/admin/hair/bookings?page=${Math.max(1, currentPage - 1)}&status=${status ?? ""}&q=${q ?? ""}`}
              className={`flex items-center gap-1 text-xs font-sans px-3 py-1.5 rounded-lg border border-brand-champagne/20 ${
                currentPage === 1 ? "text-brand-ivory/20 pointer-events-none" : "text-brand-ivory/70 hover:border-brand-champagne/50"
              }`}
            >
              <ChevronLeft size={14} /> Précédent
            </Link>
            <Link
              href={`/admin/hair/bookings?page=${Math.min(totalPages, currentPage + 1)}&status=${status ?? ""}&q=${q ?? ""}`}
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