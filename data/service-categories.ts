export interface ServiceCategory {
  slug: string;
  title: string;
  tagline: string;
  href: string;
  tone: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "collections",
    title: "Collections",
    tagline: "Femmes • Hommes • Enfants",
    href: "/hair/services/collections",
    tone: "from-brand-mocha to-brand-black",
  },
  {
    slug: "hair-care",
    title: "Soins Capillaires",
    tagline: "Lavage, hydratation, traitement, massage",
    href: "/hair/services/hair-care",
    tone: "from-brand-champagne/40 to-brand-black",
  },
  {
    slug: "preparation",
    title: "Préparation",
    tagline: "Dépose, démêlage, préparation avant coiffure",
    href: "/hair/services/preparation",
    tone: "from-brand-black to-brand-mocha",
  },
  {
    slug: "packages",
    title: "Forfaits",
    tagline: "Essential • Care • Signature • Prestige",
    href: "/hair/packages",
    tone: "from-brand-mocha to-brand-champagne/30",
  },
  {
    slug: "shop",
    title: "Boutique",
    tagline: "Mèches premium et accessoires",
    href: "/hair/boutique",
    tone: "from-brand-champagne/30 to-brand-black",
  },
];