export interface HairCareItem {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  priceFrom: number;
  tone: string;
}

export const hairCareItems: HairCareItem[] = [
  {
    slug: "lavage",
    name: "Signature Wash",
    tagline: "La base essentielle d'une chevelure saine",
    description:
      "Un lavage en profondeur avec des produits adaptés à ta texture, pour nettoyer le cuir chevelu et préparer les cheveux à recevoir soin ou coiffure.",
    duration: "30 à 45 minutes",
    priceFrom: 35,
    tone: "from-brand-mocha to-brand-black",
  },
  {
    slug: "hydratation",
    name: "Deep Hydration",
    tagline: "Un soin intense pour des cheveux souples et nourris",
    description:
      "Un traitement hydratant en profondeur qui restaure l'élasticité et la douceur des cheveux secs ou fragilisés, grâce à des produits riches en actifs nourrissants.",
    duration: "45 minutes",
    priceFrom: 45,
    tone: "from-brand-champagne/40 to-brand-black",
  },
  {
    slug: "traitement-proteine",
    name: "Strength Therapy",
    tagline: "Renforce et répare la fibre capillaire",
    description:
      "Un traitement protéiné qui reconstruit la fibre capillaire abîmée, renforce les cheveux fragiles et réduit la casse, pour une chevelure plus résistante.",
    duration: "45 à 60 minutes",
    priceFrom: 55,
    tone: "from-brand-black to-brand-mocha",
  },
  {
    slug: "massage",
    name: "Scalp Care",
    tagline: "Détente et stimulation du cuir chevelu",
    description:
      "Un massage du cuir chevelu qui stimule la circulation sanguine, favorise la pousse et offre un moment de pure détente avant ta coiffure.",
    duration: "20 minutes",
    priceFrom: 25,
    tone: "from-brand-champagne/30 to-brand-mocha",
  },
  {
    slug: "sechage",
    name: "Blow Dry",
    tagline: "Un séchage professionnel, prêt pour la coiffure",
    description:
      "Un brushing soigné qui démêle, lisse et prépare parfaitement les cheveux avant l'installation de ta coiffure.",
    duration: "30 minutes",
    priceFrom: 30,
    tone: "from-brand-mocha to-brand-champagne/30",
  },
];