import { LifestyleHero } from "@/components/lifestyle-hero";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Divisions } from "@/components/divisions";

export default function Home() {
  return (
    <main>
      <Navbar />
      <LifestyleHero />
      <Divisions />
      <Footer />
    </main>
  );
}