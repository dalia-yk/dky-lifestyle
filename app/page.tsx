import { LifestyleHero } from "@/components/lifestyle-hero";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Divisions } from "@/components/divisions";
import { GalleryPreview } from "@/components/gallery-preview";
import { Testimonials } from "@/components/testimonials";
import { Cta } from "@/components/cta";

export default function Home() {
  return (
    <main>
      <Navbar />
      <LifestyleHero />
      <Divisions />
      <GalleryPreview />
      <Testimonials />
      <Cta />
      <Footer />
    </main>
  );
}