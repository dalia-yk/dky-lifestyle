import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "../../../../lib/prisma";
import { DeleteAddOnButton } from "@/components/admin/delete-addon-button";

export default async function AdminAddOnsPage() {
  const addOns = await prisma.addOn.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-brand-ivory text-3xl">Add-ons</h1>
        <Link href="/admin/hair/addons/nouveau">
          <button className="flex items-center gap-2 bg-brand-champagne text-brand-black text-sm font-sans px-4 py-2 rounded-full hover:bg-brand-champagne/90 transition-colors">
            <Plus size={16} />
            Nouvel add-on
          </button>
        </Link>
      </div>

      <div className="bg-white/5 border border-brand-champagne/20 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-brand-champagne/20">
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Nom</th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Prix</th>
              <th className="font-sans text-brand-ivory/50 text-xs uppercase tracking-widest p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {addOns.map((addOn) => (
              <tr key={addOn.id} className="border-b border-brand-champagne/10 last:border-0">
                <td className="font-sans text-brand-ivory text-sm p-4">{addOn.name}</td>
                <td className="font-sans text-brand-champagne text-sm p-4">{addOn.price}$</td>
                <td className="p-4">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/hair/addons/${addOn.id}/modifier`}
                      className="font-sans text-brand-champagne text-xs hover:underline"
                    >
                      Modifier
                    </Link>
                    <DeleteAddOnButton addOnId={addOn.id} addOnName={addOn.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {addOns.length === 0 && (
          <p className="text-center font-sans text-brand-ivory/50 text-sm py-12">
            Aucun add-on pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}