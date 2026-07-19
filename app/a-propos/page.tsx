import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { AboutStory } from "@/components/about-story";
import { Pillars } from "@/components/pillars";
import { Founder } from "@/components/founder";

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="DKY Lifestyle"
        title="À propos de nous"
        description="Découvre l'histoire, la mission et la vision derrière DKY Lifestyle."
        tagline="Une vision. Plusieurs expériences. Des possibilités infinies."
      />
      <AboutStory />
      <Pillars />
      <Founder />
      <Footer />
    </main>
  );
}