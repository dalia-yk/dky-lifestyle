import Link from "next/link";
import { Scissors, Wind, Sparkles } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { prisma } from "../../../../lib/prisma";

const icons: Record<string, typeof Scissors> = {
  "Dépose": Scissors,
  "Démêlage": Wind,
  "Préparation avant coiffure": Sparkles,
};

export default async function PreparationPage() {
  const items = await prisma.service.findMany({
    where: { category: "PREPARATION" },
    orderBy: { name: "asc" },
  });

  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Préparation"
        description="Les étapes essentielles avant chaque coiffure, pour un résultat impeccable et des cheveux en santé."
      />

      <section className="bg-brand-black py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {items.map((item) => {
            const Icon = icons[item.name] ?? Sparkles;
            return (
              <div
                key={item.id}
                className="flex flex-col items-center text-center p-8 rounded-2xl border border-brand-champagne/20 hover:border-brand-champagne/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-brand-champagne/10 flex items-center justify-center mb-5">
                  <Icon className="text-brand-champagne" size={26} />
                </div>
                <h3 className="font-heading text-brand-ivory text-xl mb-3">
                  {item.name}
                </h3>
                <p className="font-sans text-brand-ivory/60 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <p className="font-sans text-brand-champagne text-sm mb-4">
                  À partir de {item.priceFrom}$ · {item.duration}
                </p>
                <Link href={`/hair/reservation?serviceId=${item.id}`}>
                  <Button
                    variant="outline"
                    className="border-brand-champagne/40 text-brand-ivory hover:bg-brand-champagne/10 rounded-full"
                  >
                    Réserver
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}