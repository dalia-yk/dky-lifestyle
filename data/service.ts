export interface Service {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  priceFrom: number;
  withExtensions: boolean;
  addons: string[];
  tone: string;
}

export const services: Service[] = [
  {
    slug: "knotless-braids",
    name: "Knotless Braids",
    tagline: "Douceur et légèreté, sans tension sur le cuir chevelu",
    description:
      "Une technique de tressage moderne qui commence avec tes cheveux naturels avant d'intégrer les mèches, pour un résultat plus léger et confortable qu'une tresse traditionnelle.",
    duration: "4 à 6 heures",
    priceFrom: 150,
    withExtensions: true,
    addons: ["Lavage", "Traitement", "Démêlage"],
    tone: "from-brand-mocha to-brand-black",
  },
  {
    slug: "boho-braids",
    name: "Boho Braids",
    tagline: "Un style bohème avec des mèches bouclées apparentes",
    description:
      "Des tresses fines mêlées à des boucles naturelles laissées apparentes, pour un look romantique et texturé, parfait pour un style estival ou décontracté-chic.",
    duration: "5 à 7 heures",
    priceFrom: 180,
    withExtensions: true,
    addons: ["Lavage", "Traitement", "Dépose"],
    tone: "from-brand-champagne/40 to-brand-black",
  },
  {
    slug: "fulani-braids",
    name: "Fulani Braids",
    tagline: "Un motif tribal élégant, souvent orné de perles",
    description:
      "Inspirées des traditions peules, ces tresses combinent des cornrows au centre et des tresses sur les côtés, souvent accessoirisées avec des perles ou anneaux dorés.",
    duration: "4 à 6 heures",
    priceFrom: 160,
    withExtensions: true,
    addons: ["Lavage", "Traitement"],
    tone: "from-brand-black to-brand-mocha",
  },
  {
    slug: "cornrows",
    name: "Cornrows",
    tagline: "Un classique intemporel, plaqué contre le cuir chevelu",
    description:
      "Des tresses plaquées au cuir chevelu en motifs variés, droits ou géométriques, aussi élégantes au naturel qu'avec mèches.",
    duration: "2 à 4 heures",
    priceFrom: 100,
    withExtensions: false,
    addons: ["Lavage", "Démêlage"],
    tone: "from-brand-mocha to-brand-champagne/30",
  },
  {
    slug: "spring-twist",
    name: "Spring Twist",
    tagline: "Des boucles ressort légères et pleines de volume",
    description:
      "Une technique de vrillage avec des mèches pré-bouclées qui donnent un volume naturel et un rebond caractéristique, idéale pour un look texturé longue durée.",
    duration: "5 à 7 heures",
    priceFrom: 170,
    withExtensions: true,
    addons: ["Lavage", "Traitement", "Dépose"],
    tone: "from-brand-champagne/30 to-brand-black",
  },
  {
    slug: "passion-twist",
    name: "Passion Twist",
    tagline: "Des torsades souples à l'allure naturelle",
    description:
      "Des vrilles réalisées avec des mèches à texture bohème, offrant un rendu doux et naturel, plus léger qu'un twist classique.",
    duration: "5 à 7 heures",
    priceFrom: 175,
    withExtensions: true,
    addons: ["Lavage", "Traitement"],
    tone: "from-brand-black to-brand-champagne/20",
  },
  {
    slug: "soft-locs",
    name: "Soft Locs",
    tagline: "L'allure des locs, sans engagement permanent",
    description:
      "Une alternative temporaire aux dreadlocks, réalisée par enroulement de mèches autour des cheveux naturels pour un rendu texturé et sophistiqué.",
    duration: "6 à 8 heures",
    priceFrom: 200,
    withExtensions: true,
    addons: ["Lavage", "Traitement", "Dépose"],
    tone: "from-brand-mocha to-brand-black",
  },
  {
    slug: "men-braids",
    name: "Men Braids",
    tagline: "Des tresses sur mesure, adaptées aux styles masculins",
    description:
      "Des designs de tresses pensés spécifiquement pour les coupes et textures masculines, du cornrow simple aux motifs plus élaborés.",
    duration: "1 à 3 heures",
    priceFrom: 60,
    withExtensions: false,
    addons: ["Lavage"],
    tone: "from-brand-black to-brand-mocha",
  },
  {
    slug: "kids-braids",
    name: "Kids Braids",
    tagline: "Des styles doux et adaptés aux enfants",
    description:
      "Des coiffures protectrices réalisées avec douceur et patience, adaptées aux cheveux et au cuir chevelu sensible des enfants.",
    duration: "2 à 4 heures",
    priceFrom: 70,
    withExtensions: false,
    addons: ["Lavage", "Démêlage"],
    tone: "from-brand-champagne/40 to-brand-mocha",
  },
];