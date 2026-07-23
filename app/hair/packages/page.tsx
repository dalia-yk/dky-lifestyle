import { Check } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { prisma } from "../../../lib/prisma";

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    include: { includedAddOns: true },
    orderBy: { name: "asc" },
  });

  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Nos forfaits"
        description="Des expériences pensées pour tous les besoins, du soin ponctuel à l'expérience complète."
      />

      <section className="bg-brand-black py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`flex flex-col rounded-2xl p-8 border transition-all ${
                pkg.featured
                  ? "bg-gradient-to-br from-brand-champagne/20 to-brand-black border-brand-champagne scale-105"
                  : "border-brand-champagne/20 hover:border-brand-champagne/50"
              }`}
            >
              {pkg.featured && (
                <span className="self-start bg-brand-champagne text-brand-black text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  Populaire
                </span>
              )}

              <h3 className="font-heading text-brand-ivory text-2xl mb-2">
                {pkg.name}
              </h3>
              <p className="font-sans text-brand-ivory/60 text-sm mb-6">
                {pkg.tagline}
              </p>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {pkg.includedAddOns.length === 0 ? (
                  <li className="font-sans text-brand-ivory/50 text-sm">
                    Coiffure au choix
                  </li>
                ) : (
                  pkg.includedAddOns.map((addOn) => (
                    <li
                      key={addOn.id}
                      className="flex items-start gap-2 font-sans text-brand-ivory/80 text-sm"
                    >
                      <Check className="text-brand-champagne shrink-0 mt-0.5" size={16} />
                      {addOn.name}
                    </li>
                  ))
                )}
              </ul>

              <Link href={`/hair/reservation?packageId=${pkg.id}`}>
                <Button
                  className={
                    pkg.featured
                      ? "bg-brand-champagne text-brand-black hover:bg-brand-champagne/90 rounded-full w-full"
                      : "bg-transparent border border-brand-champagne/40 text-brand-ivory hover:bg-brand-champagne/10 rounded-full w-full"
                  }
                >
                  Choisir {pkg.name}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}