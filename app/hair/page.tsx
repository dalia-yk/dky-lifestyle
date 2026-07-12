import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhyDky } from "@/components/why-dky";

export default function HairHome() {
  return (
    <main>
      <Hero />
      <Navbar />
      <WhyDky />
      <Footer />
    </main>
  );
}