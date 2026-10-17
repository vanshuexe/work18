import assert from "node:assert/strict";
import data from "../lib/data.js";
import site from "../config/site.js";

const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const pages = [
  "/",
  "/about-us",
  "/news",
  "/careers",
  "/tinting-center",
  "/our-colors",
  "/color-trends",
  "/color-visualizer",
  "/client",
  "/vendor",
  "/investor",
  ...Object.keys(site.productCategories).map((slug) => `/${slug}`),
  ...data.getPosts().map((post) => `/news/${post._id}`),
];
for (const page of pages) {
  const response = await fetch(base + page);
  assert.equal(response.status, 200, page);
  const html = await response.text();
  assert.ok(
    html.includes("<main") && html.includes("/_next/"),
    `Next.js markup on ${page}`,
  );
  assert.ok(
    !html.includes("SLOT") && !html.includes("<%"),
    `No template placeholders on ${page}`,
  );
  console.log(`PASS ${page}`);
}
for (const page of [
  "/missing-page",
  "/news/missing",
  "/constructor",
  "/__proto__",
]) {
  assert.equal((await fetch(base + page)).status, 404, page);
  console.log(`PASS 404 ${page}`);
}
for (const endpoint of [
  "main-categories",
  "subcategories",
  "products",
  "colors",
  "tinting-centers",
  "team-members",
  "posts",
  "catalogs",
  "jobs",
  "search?q=paint",
]) {
  const response = await fetch(`${base}/api/${endpoint}`);
  assert.equal(response.status, 200, endpoint);
  await response.json();
  console.log(`PASS /api/${endpoint}`);
}
const response = await fetch(`${base}/interior-paints?q=zzznomatchingproduct`);
assert.ok(
  /data-products-empty="" class="\s*text-center/.test(await response.text()),
  "Empty product state is visible for an unmatched query",
);
console.log("PASS product query filters");
console.log(
  `Verified ${pages.length} pages, 4 missing-page cases, 10 APIs and product filters.`,
);
