// Loads the JSON files in data/ and provides the queries the pages and API need.
// Data is cached in memory; call reload() after editing the files while the server runs.

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(process.cwd(), "data");
const cache = {};
const mtimes = {};

function load(name) {
  const filePath = path.join(DATA_DIR, `${name}.json`);
  const stat = fs.statSync(filePath);
  if (!cache[name] || mtimes[name] !== stat.mtimeMs) {
    cache[name] = JSON.parse(fs.readFileSync(filePath, "utf8"));
    mtimes[name] = stat.mtimeMs;
  }
  return cache[name];
}

function reload() {
  for (const key of Object.keys(cache)) delete cache[key];
}

const bySortOrder = (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0);

function getMainCategories() {
  return load("main-categories")
    .filter((c) => c.isActive)
    .sort(bySortOrder);
}

function getSubcategories(mainCategorySlug) {
  return load("subcategories")
    .filter(
      (s) =>
        s.isActive &&
        (!mainCategorySlug || s.mainCategory.slug === mainCategorySlug),
    )
    .sort(bySortOrder);
}

function getProducts({ mainCategorySlug, subcategoryId } = {}) {
  return load("products")
    .filter((p) => p.isActive)
    .filter(
      (p) => !mainCategorySlug || p.mainCategory.slug === mainCategorySlug,
    )
    .filter((p) => !subcategoryId || p.subcategory._id === subcategoryId)
    .sort(bySortOrder);
}

function getProduct(id) {
  return load("products").find((p) => p._id === id && p.isActive) || null;
}

function getColors(colorType) {
  return load("colors").filter((c) => !colorType || c.colorType === colorType);
}

// Kept in file order (newest first), matching the original site
function getTintingCenters() {
  return load("tinting-centers").filter((c) => c.isPublished);
}

function getTeamMembers() {
  return load("team-members")
    .filter((m) => m.isPublished)
    .sort(bySortOrder);
}

function getPosts() {
  return load("posts")
    .filter((p) => p.isPublished)
    .sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
}

function getPost(id) {
  return getPosts().find((p) => p._id === id) || null;
}

function getCatalogs() {
  return load("catalogs")
    .filter((c) => c.isPublished)
    .sort(bySortOrder);
}

function getJobs() {
  return load("jobs").filter((j) => j.isActive !== false);
}

function getCountries() {
  return load("countries");
}

// Header search: products, news and jobs whose text matches the query
function search(query, limit = 20) {
  // NFKC turns styled Unicode text (e.g. the bold letters in news titles) into plain letters
  const normalize = (text) =>
    String(text || "")
      .normalize("NFKC")
      .toLowerCase();
  const q = normalize(query).trim();
  if (q.length < 2) return [];
  const matches = (...fields) =>
    fields.some((f) => f && normalize(f).includes(q));
  const results = [];

  for (const p of getProducts()) {
    if (
      matches(
        p.productNameEn,
        p.productCode,
        p.subcategoryEn,
        p.mainCategory.nameEn,
        ...(p.tags || []),
      )
    ) {
      results.push({
        id: p._id,
        type: "product",
        title: p.productNameEn,
        subtitle: p.subcategoryEn,
        image: p.imageLink,
        url: `/${p.mainCategory.slug}?product=${p._id}`,
        category: p.mainCategory.nameEn,
      });
    }
  }
  for (const post of getPosts()) {
    if (matches(post.title, post.briefText, ...(post.tags || []))) {
      results.push({
        id: post._id,
        type: "news",
        title: post.title,
        subtitle: post.author,
        image: post.mainImage,
        url: `/news/${post._id}`,
        category: "News",
      });
    }
  }
  for (const job of getJobs()) {
    if (matches(job.title, job.department, job.location)) {
      results.push({
        id: job._id,
        type: "job",
        title: job.title,
        subtitle: job.location,
        image: null,
        url: "/careers",
        category: "Careers",
      });
    }
  }
  return results.slice(0, limit);
}

module.exports = {
  reload,
  getMainCategories,
  getSubcategories,
  getProducts,
  getProduct,
  getColors,
  getTintingCenters,
  getTeamMembers,
  getPosts,
  getPost,
  getCatalogs,
  getJobs,
  getCountries,
  search,
};
