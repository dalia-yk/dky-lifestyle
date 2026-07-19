import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { ContactInfo } from "@/components/contact-info";

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Lifestyle"
        title="Contactez-nous"
        description="Une question sur nos divisions ou notre vision ? Écris-nous."
      />

      <section className="bg-brand-black py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <ContactForm />
          <ContactInfo email="dkylifestyle@gmail.com" />
        </div>
      </section>

      <Footer />
    </main>
  );
}