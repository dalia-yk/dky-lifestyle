import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";
import { productCategories } from "@/data/product-categories";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function BoutiqueCategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;
  const categoryInfo = productCategories.find((c) => c.slug === category);

  if (!categoryInfo) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.category === category);

  return (
    <main>
      <Navbar />
      <PageHeader
        eyebrow="Boutique DKY Hair"
        title={categoryInfo.title}
        description={categoryInfo.tagline}
      />

      <section className="bg-brand-black py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export function generateStaticParams() {
  return productCategories.map((category) => ({ category: category.slug }));
}