import Link from "next/link";
import { prisma } from "../../lib/prisma";

export default async function AdminDashboardPage() {
  const bookings = await prisma.booking.findMany({
    include: { client: true, service: true },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + booking.depositAmount,
    0
  );

  const today = new Date();
  const todayBookings = bookings.filter(
    (b) =>
      b.date.getDate() === today.getDate() &&
      b.date.getMonth() === today.getMonth() &&
      b.date.getFullYear() === today.getFullYear()
  );

  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;
  const recentBookings = bookings.slice(0, 5);

  return (
    <div>
      <h1 className="font-heading text-brand-ivory text-3xl mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/5 border border-brand-champagne/20 rounded-2xl p-6">
          <p className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest mb-2">
            Réservations totales
          </p>
          <p className="font-heading text-brand-ivory text-3xl">
            {bookings.length}
          </p>
        </div>
        <div className="bg-white/5 border border-brand-champagne/20 rounded-2xl p-6">
          <p className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest mb-2">
            Aujourd&apos;hui
          </p>
          <p className="font-heading text-brand-ivory text-3xl">
            {todayBookings.length}
          </p>
        </div>
        <div className="bg-white/5 border border-brand-champagne/20 rounded-2xl p-6">
          <p className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest mb-2">
            Dépôts (estimé)
          </p>
          <p className="font-heading text-brand-champagne text-3xl">
            {totalRevenue}$
          </p>
        </div>
      </div>

      {pendingCount > 0 && (
        <p className="font-sans text-brand-champagne text-sm mb-6">
          ⚠ {pendingCount} réservation(s) en attente de confirmation
        </p>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-brand-ivory text-xl">
          Réservations récentes
        </h2>
        <Link
          href="/admin/hair/bookings"
          className="font-sans text-brand-champagne text-sm hover:underline"
        >
          Voir tout →
        </Link>
      </div>

      <div className="bg-white/5 border border-brand-champagne/20 rounded-2xl overflow-hidden">
        {recentBookings.map((booking) => (
          <div
            key={booking.id}
            className="flex justify-between items-center p-4 border-b border-brand-champagne/10 last:border-0"
          >
            <div>
              <p className="font-sans text-brand-ivory text-sm">
                {booking.client.name}
              </p>
              <p className="font-sans text-brand-ivory/40 text-xs">
                {booking.service.name}
              </p>
            </div>
            <p className="font-sans text-brand-champagne text-sm">
              {booking.depositAmount}$
            </p>
          </div>
        ))}
        {recentBookings.length === 0 && (
          <p className="text-center font-sans text-brand-ivory/50 text-sm py-12">
            Aucune réservation pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}