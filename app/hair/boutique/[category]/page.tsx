import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";
import { productCategories } from "@/data/product-categories";

const PAGE_SIZE = 6;

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function BoutiqueCategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const categoryInfo = productCategories.find((c) => c.slug === category);

  if (!categoryInfo) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.category === category);
  const totalPages = Math.max(1, Math.ceil(categoryProducts.length / PAGE_SIZE));
  const paginatedProducts = categoryProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

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
          {paginatedProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <Link
              href={`/hair/boutique/${category}?page=${Math.max(1, currentPage - 1)}`}
              className={`text-xs font-sans ${
                currentPage === 1 ? "text-brand-ivory/20 pointer-events-none" : "text-brand-champagne hover:underline"
              }`}
            >
              ← Précédent
            </Link>
            <span className="text-xs font-sans text-brand-ivory/40">
              {currentPage} / {totalPages}
            </span>
            <Link
              href={`/hair/boutique/${category}?page=${Math.min(totalPages, currentPage + 1)}`}
              className={`text-xs font-sans ${
                currentPage === totalPages ? "text-brand-ivory/20 pointer-events-none" : "text-brand-champagne hover:underline"
              }`}
            >
              Suivant →
            </Link>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}