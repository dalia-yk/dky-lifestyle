import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { prisma } from "../../../lib/prisma";

const PAGE_SIZE = 10;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminPaymentsPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const totalCount = await prisma.booking.count({
    where: { paymentStatus: { not: "PENDING" } },
  });
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const bookings = await prisma.booking.findMany({
    where: { paymentStatus: { not: "PENDING" } },
    include: { client: true, service: true },
    orderBy: { createdAt: "desc" },
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <div>
      <h1 className="font-heading text-brand-ivory text-3xl mb-8">Paiements</h1>

      <div className="bg-white/5 border border-brand-champagne/20 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-brand-champagne/20">
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Cliente</th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Service</th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Dépôt payé</th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Statut</th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Remboursement</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-brand-champagne/10 last:border-0">
                <td className="font-sans text-brand-ivory text-sm p-4">{booking.client.name}</td>
                <td className="font-sans text-brand-ivory/70 text-sm p-4">{booking.service.name}</td>
                <td className="font-sans text-brand-champagne text-sm p-4">{booking.depositAmount}$</td>
                <td className="p-4">
                  <span
                    className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full ${
                      booking.status === "CANCELLED"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="font-sans text-sm p-4">
                  {booking.status === "CANCELLED" ? (
                    booking.refundAmount > 0 ? (
                      <span className="text-green-400">
                        {booking.refundAmount}$ remboursé
                        <br />
                        <span className="text-brand-ivory/40 text-xs">{booking.refundReason}</span>
                      </span>
                    ) : (
                      <span className="text-brand-ivory/40">
                        Aucun
                        <br />
                        <span className="text-xs">{booking.refundReason}</span>
                      </span>
                    )
                  ) : (
                    <span className="text-brand-ivory/30">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <p className="text-center font-sans text-brand-ivory/50 text-sm py-12">
            Aucun paiement pour le moment.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="font-sans text-brand-ivory/40 text-xs">
            Page {currentPage} / {totalPages} — {totalCount} paiements
          </p>
          <div className="flex gap-2">
            <Link
              href={`/admin/payments?page=${Math.max(1, currentPage - 1)}`}
              className={`flex items-center gap-1 text-xs font-sans px-3 py-1.5 rounded-lg border border-brand-champagne/20 ${
                currentPage === 1 ? "text-brand-ivory/20 pointer-events-none" : "text-brand-ivory/70 hover:border-brand-champagne/50"
              }`}
            >
              <ChevronLeft size={14} /> Précédent
            </Link>
            <Link
              href={`/admin/payments?page=${Math.min(totalPages, currentPage + 1)}`}
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