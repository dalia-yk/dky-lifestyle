import { prisma } from "../../lib/prisma";

export default async function TestDbPage() {
  const services = await prisma.service.findMany();

  return (
    <main className="min-h-screen bg-brand-black p-10">
      <h1 className="font-heading text-brand-ivory text-3xl mb-6">
        Test base de données
      </h1>
      <ul className="flex flex-col gap-2">
        {services.map((service) => (
          <li key={service.id} className="font-sans text-brand-ivory/80">
            {service.name} — {service.priceFrom}$
          </li>
        ))}
      </ul>
    </main>
  );
}