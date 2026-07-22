import { prisma } from "../../../lib/prisma";

export default async function AdminClientsPage() {
  const clients = await prisma.client.findMany({
    include: { bookings: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-heading text-brand-ivory text-3xl mb-8">Clients</h1>

      <div className="bg-white/5 border border-brand-champagne/20 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-brand-champagne/20">
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">
                Nom
              </th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">
                Contact
              </th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">
                Réservations
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                className="border-b border-brand-champagne/10 last:border-0"
              >
                <td className="font-sans text-brand-ivory text-sm p-4">
                  {client.name}
                </td>
                <td className="font-sans text-brand-ivory/70 text-sm p-4">
                  {client.email}
                  <br />
                  <span className="text-brand-ivory/40 text-xs">
                    {client.phone}
                  </span>
                </td>
                <td className="font-sans text-brand-champagne text-sm p-4">
                  {client.bookings.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {clients.length === 0 && (
          <p className="text-center font-sans text-brand-ivory/50 text-sm py-12">
            Aucun client pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}