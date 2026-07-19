import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { ContactInfo } from "@/components/contact-info";

export default function HairContactPage() {
  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Hair"
        title="Contactez-nous"
        description="Une question sur nos services ou ta réservation ? Écris-nous."
      />

      <section className="bg-brand-black py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <ContactForm />
          <ContactInfo email="dkylifestyle@gmail.com" phone="819-329-8337" />
        </div>
      </section>

      <Footer />
    </main>
  );
}