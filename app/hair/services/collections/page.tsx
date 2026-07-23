import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { ServiceGrid } from "@/components/service-grid";
import { prisma } from "../../../../lib/prisma";

export default async function CollectionsPage() {
  const services = await prisma.service.findMany({
    where: { category: "COLLECTION" },
    orderBy: { name: "asc" },
  });

  const braids = services.filter((s) => s.collection === "braids");
  const twist = services.filter((s) => s.collection === "twist");
  const locs = services.filter((s) => s.collection === "locs");

  const menSelection = services.filter((s) => s.availableFor.includes("HOMMES"));
  const kidsSelection = services.filter((s) => s.availableFor.includes("ENFANTS"));

  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Collections"
        description="Chaque style raconte une histoire. Découvre nos collections signature."
      />

      <section className="bg-brand-black py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <ServiceGrid title="Braids Collection" services={braids} />
          <ServiceGrid title="Twist Collection" services={twist} />
          <ServiceGrid title="Locs Collection" services={locs} />
          <ServiceGrid title="Men's Selection" services={menSelection} />
          <ServiceGrid title="Kids Selection" services={kidsSelection} />
        </div>
      </section>

      <Footer />
    </main>
  );
}