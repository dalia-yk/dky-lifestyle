export interface Product {
  slug: string;
  name: string;
  category: "meches" | "accessoires" | "hair-care" | "kits";
  price: number;
  rating: number;
  colors?: string[];
  lengths?: string[];
  imageCount?: number;
  kitIncludes?: string[];
  available: boolean;
}

export const products: Product[] = [
  // --- MÈCHES ---
  {
    slug: "meches-boho",
    name: "Premium Boho Braiding Hair",
    category: "meches",
    price: 50,
    rating: 5,
    colors: ["1B", "2", "4", "30"],
    lengths: ["14\"", "18\"", "22\"", "26\""],
    imageCount: 3,
    available: true,
  },
  {
    slug: "meches-knotless",
    name: "Premium Knotless Braiding Hair",
    category: "meches",
    price: 45,
    rating: 5,
    colors: ["1B", "2", "4", "27", "30"],
    lengths: ["14\"", "18\"", "22\"", "26\""],
    imageCount: 3,
    available: true,
  },

  // --- ACCESSOIRES ---
  {
    slug: "bonnet-satin",
    name: "Bonnet Satin DKY",
    category: "accessoires",
    price: 20,
    rating: 5,
    available: false,
  },
  {
    slug: "edge-control",
    name: "Edge Control",
    category: "accessoires",
    price: 15,
    rating: 4,
    available: false,
  },
  {
    slug: "peigne-queue",
    name: "Peigne à queue DKY",
    category: "accessoires",
    price: 12,
    rating: 5,
    available: false,
  },

  // --- HAIR CARE (produits, pas services) ---
  {
    slug: "huile-capillaire",
    name: "Huile Capillaire DKY",
    category: "hair-care",
    price: 25,
    rating: 5,
    available: false,
  },
  {
    slug: "mousse-coiffante",
    name: "Mousse Coiffante DKY",
    category: "hair-care",
    price: 18,
    rating: 4,
    available: false,
  },

  // --- KITS ---
  {
    slug: "kit-knotless",
    name: "Kit Entretien Knotless",
    category: "kits",
    price: 60,
    rating: 5,
    kitIncludes: [
      "Bonnet satin",
      "Mousse coiffante",
      "Huile capillaire",
      "Edge control",
      "Peigne à queue",
    ],
    available: false,
  },
];