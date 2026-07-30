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
    title: "Soins & Préparation",
    tagline: "Lavage, hydratation, traitement, dépose, démêlage",
    href: "/hair/services/hair-care",
    tone: "from-brand-champagne/40 to-brand-black",
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