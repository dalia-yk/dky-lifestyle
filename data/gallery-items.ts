export interface GalleryItem {
  id: string;
  label: string;
  category: "braids" | "twist" | "locs" | "kids" | "men" | "before-after";
  tone: string;
}

export const galleryItems: GalleryItem[] = [
  { id: "g1", label: "Knotless Braids", category: "braids", tone: "from-brand-mocha to-brand-black" },
  { id: "g2", label: "Boho Braids", category: "braids", tone: "from-brand-champagne/40 to-brand-black" },
  { id: "g3", label: "Fulani Braids", category: "braids", tone: "from-brand-black to-brand-mocha" },
  { id: "g4", label: "Spring Twist", category: "twist", tone: "from-brand-champagne/30 to-brand-black" },
  { id: "g5", label: "Passion Twist", category: "twist", tone: "from-brand-black to-brand-champagne/20" },
  { id: "g6", label: "Havana Twist", category: "twist", tone: "from-brand-mocha to-brand-black" },
  { id: "g7", label: "Soft Locs", category: "locs", tone: "from-brand-mocha to-brand-black" },
  { id: "g8", label: "Butterfly Locs", category: "locs", tone: "from-brand-champagne/30 to-brand-black" },
  { id: "g9", label: "Kids Braids", category: "kids", tone: "from-brand-champagne/40 to-brand-mocha" },
  { id: "g10", label: "Kids Cornrows", category: "kids", tone: "from-brand-black to-brand-mocha" },
  { id: "g11", label: "Men Barrel Twist", category: "men", tone: "from-brand-black to-brand-champagne/20" },
  { id: "g12", label: "Men Cornrows", category: "men", tone: "from-brand-mocha to-brand-champagne/30" },
  { id: "g13", label: "Avant / Après — Knotless", category: "before-after", tone: "from-brand-champagne/30 to-brand-mocha" },
  { id: "g14", label: "Avant / Après — Soft Locs", category: "before-after", tone: "from-brand-black to-brand-mocha" },
];