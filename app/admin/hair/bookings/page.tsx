import { prisma } from "../../../../lib/prisma";
import { BookingActions } from "@/components/admin/booking-actions";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: { client: true, service: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-heading text-brand-ivory text-3xl mb-8">
        Bookings
      </h1>

      <div className="bg-white/5 border border-brand-champagne/20 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-brand-champagne/20">
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">
                Cliente
              </th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">
                Coiffure
              </th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">
                Date
              </th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">
                Statut
              </th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">
                Dépôt
              </th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-brand-champagne/10 last:border-0"
              >
                <td className="font-sans text-brand-ivory text-sm p-4">
                  {booking.client.name}
                  <br />
                  <span className="text-brand-ivory/40 text-xs">
                    {booking.client.email}
                  </span>
                </td>
                <td className="font-sans text-brand-ivory/80 text-sm p-4">
                  {booking.service.name}
                </td>
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
                        : "bg-brand-ivory/10 text-brand-ivory/50"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="p-4">
                  <BookingActions
                    bookingId={booking.id}
                    currentStatus={booking.status}
                  />
                </td>
                <td className="font-sans text-brand-champagne text-sm p-4">
                  {booking.depositAmount}$
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
    </div>
  );
}