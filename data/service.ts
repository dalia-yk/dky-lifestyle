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
  collection: "braids" | "twist" | "locs";
  availableFor: ("femmes" | "hommes" | "enfants")[];
}

export const services: Service[] = [
  // --- BRAIDS COLLECTION ---
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
    collection: "braids",
    availableFor: ["femmes", "enfants"],
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
    collection: "braids",
    availableFor: ["femmes"],
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
    collection: "braids",
    availableFor: ["femmes", "enfants"],
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
    collection: "braids",
    availableFor: ["femmes", "hommes", "enfants"],
  },
  {
    slug: "stitch-braids",
    name: "Stitch Braids",
    tagline: "Des lignes nettes et précises, façon couture",
    description:
      "Des cornrows réalisées avec une technique de piqué très serrée qui crée des lignes fines et nettes, semblables à des points de couture — un rendu graphique et soigné.",
    duration: "2 à 4 heures",
    priceFrom: 110,
    withExtensions: false,
    addons: ["Lavage", "Démêlage"],
    tone: "from-brand-champagne/30 to-brand-mocha",
    collection: "braids",
    availableFor: ["femmes", "enfants"],
  },

  // --- TWIST COLLECTION ---
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
    collection: "twist",
    availableFor: ["femmes"],
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
    collection: "twist",
    availableFor: ["femmes"],
  },
  {
    slug: "havana-twist",
    name: "Havana Twist",
    tagline: "Un twist épais et texturé, au style affirmé",
    description:
      "Réalisé avec des mèches épaisses à texture afro, ce twist offre un volume généreux et une allure audacieuse, parfaite pour un style qui ne passe pas inaperçu.",
    duration: "5 à 7 heures",
    priceFrom: 180,
    withExtensions: true,
    addons: ["Lavage", "Traitement", "Dépose"],
    tone: "from-brand-mocha to-brand-black",
    collection: "twist",
    availableFor: ["femmes"],
  },
  {
    slug: "senegalese-twist",
    name: "Senegalese Twist",
    tagline: "Des torsades fines et lisses, élégance intemporelle",
    description:
      "Un twist fin et soyeux réalisé avec des mèches lisses, pour un rendu raffiné et uniforme, apprécié pour sa polyvalence et son allure soignée.",
    duration: "5 à 7 heures",
    priceFrom: 175,
    withExtensions: true,
    addons: ["Lavage", "Traitement"],
    tone: "from-brand-champagne/40 to-brand-mocha",
    collection: "twist",
    availableFor: ["femmes"],
  },
  {
    slug: "barrel-twist",
    name: "Barrel Twist",
    tagline: "Un twist court et structuré, pensé pour les hommes",
    description:
      "Un style de twist compact et bien défini, adapté aux cheveux courts à mi-longs, offrant une allure soignée et facile à entretenir.",
    duration: "1 à 3 heures",
    priceFrom: 65,
    withExtensions: false,
    addons: ["Lavage"],
    tone: "from-brand-black to-brand-mocha",
    collection: "twist",
    availableFor: ["hommes"],
  },

  // --- LOCS COLLECTION ---
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
    collection: "locs",
    availableFor: ["femmes"],
  },
  {
    slug: "butterfly-locs",
    name: "Butterfly Locs",
    tagline: "Des locs vaporeuses à l'effet déstructuré",
    description:
      "Une variante des soft locs légèrement défaite pour un effet plus vaporeux et bohème, très prisée pour son rendu naturel et texturé.",
    duration: "6 à 8 heures",
    priceFrom: 210,
    withExtensions: true,
    addons: ["Lavage", "Traitement", "Dépose"],
    tone: "from-brand-champagne/30 to-brand-black",
    collection: "locs",
    availableFor: ["femmes"],
  },
  {
    slug: "faux-locs",
    name: "Faux Locs",
    tagline: "Des locs classiques, nettes et bien définies",
    description:
      "Des locs artificielles fermement enroulées pour un rendu net et défini, une alternative durable et élégante aux vraies dreadlocks.",
    duration: "6 à 8 heures",
    priceFrom: 205,
    withExtensions: true,
    addons: ["Lavage", "Traitement", "Dépose"],
    tone: "from-brand-black to-brand-champagne/20",
    collection: "locs",
    availableFor: ["femmes"],
  },
];