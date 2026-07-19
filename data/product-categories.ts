export interface ProductCategory {
  slug: string;
  title: string;
  tagline: string;
}

export const productCategories: ProductCategory[] = [
  {
    slug: "meches",
    title: "Mèches Premium",
    tagline: "Une sélection de mèches pour chaque style",
  },
  {
    slug: "accessoires",
    title: "Accessoires",
    tagline: "Bonnets, peignes, edge control",
  },
  {
    slug: "hair-care",
    title: "Hair Care",
    tagline: "Huiles, mousses et soins du quotidien",
  },
  {
    slug: "kits",
    title: "Kits DKY",
    tagline: "Des ensembles pensés pour chaque coiffure",
  },
];