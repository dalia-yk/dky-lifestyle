import { prisma } from "../../../lib/prisma";
import { BusinessHoursRow } from "@/components/admin/business-hours-row";
import { BlockedDatesManager } from "@/components/admin/blocked-dates-manager";

export default async function AdminSettingsPage() {
  const businessHours = await prisma.businessHours.findMany({
    orderBy: { dayOfWeek: "asc" },
  });

  const blockedDates = await prisma.blockedDate.findMany({
    where: { date: { gte: new Date() } },
    orderBy: { date: "asc" },
  });

  return (
    <div>
      <h1 className="font-heading text-brand-ivory text-3xl mb-8">Réglages</h1>

      <div className="mb-12">
        <h2 className="font-heading text-brand-ivory text-xl mb-4">Horaires d&apos;ouverture</h2>
        <div className="bg-white/5 border border-brand-champagne/20 rounded-2xl p-6">
          {businessHours.map((hours) => (
            <BusinessHoursRow
              key={hours.dayOfWeek}
              dayOfWeek={hours.dayOfWeek}
              initialIsOpen={hours.isOpen}
              initialOpenTime={hours.openTime}
              initialCloseTime={hours.closeTime}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-heading text-brand-ivory text-xl mb-4">Dates bloquées</h2>
        <div className="bg-white/5 border border-brand-champagne/20 rounded-2xl p-6">
          <BlockedDatesManager blockedDates={blockedDates} />
        </div>
      </div>
    </div>
  );
}