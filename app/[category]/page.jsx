import { notFound } from "next/navigation";
import PageShell from "../../components/PageShell";
import ProductsPage from "../../components/pages/ProductsPage";
import siteDefault from "../../config/site";
import data from "../../lib/data";
import content from "../../lib/content.cjs";
import siteLib from "../../lib/site.cjs";

export const dynamic = "force-dynamic";

// Category banners, titles and descriptions can be edited in the admin panel (Menu, footer & SEO).
function getCategory(slug) {
  const categories = siteLib.getSite().productCategories || siteDefault.productCategories;
  return Object.hasOwn(categories, slug) ? categories[slug] : null;
}

export async function generateMetadata({ params }) {
  await content.load();
  const { category: slug } = await params;
  const category = getCategory(slug);
  return category
    ? { title: category.title, description: category.description }
    : { title: "Page not found" };
}

export default async function CategoryPage({ params, searchParams }) {
  await content.load();
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
