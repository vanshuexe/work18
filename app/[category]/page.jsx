import { notFound } from "next/navigation";
import PageShell from "../../components/PageShell";
import ProductsPage from "../../components/pages/ProductsPage";
import site from "../../config/site";
import data from "../../lib/data";

export function generateStaticParams() {
  return Object.keys(site.productCategories).map((category) => ({ category }));
}

function getCategory(slug) {
  return Object.hasOwn(site.productCategories, slug)
    ? site.productCategories[slug]
    : null;
}

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  return category
    ? { title: category.title, description: category.description }
    : { title: "Page not found" };
}

export default async function CategoryPage({ params, searchParams }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const filters = await searchParams;
  const subcategories = data.getSubcategories(slug);
  const products = data.getProducts({ mainCategorySlug: slug });
  const normalize = (value) =>
    String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  const activeSubcategory =
    subcategories.find(
      (s) => normalize(s.subcategoryEn) === normalize(filters.subcategory),
    ) || null;
  const query = String(filters.q || "").trim();
  const isVisible = (product) =>
    (!activeSubcategory || product.subcategory._id === activeSubcategory._id) &&
    (!query ||
      [
        product.productNameEn,
        product.productCode,
        product.subcategoryEn,
        ...(product.tags || []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()));
  return (
    <PageShell
      key={`${slug}:${query}:${activeSubcategory?._id || ""}`}
      active="products"
      behavior="products"
    >
      <ProductsPage
        category={category}
        subcategories={subcategories}
        products={products}
        activeSubcategory={activeSubcategory}
        query={query}
        isVisible={isVisible}
        visibleCount={products.filter(isVisible).length}
      />
    </PageShell>
  );
}
