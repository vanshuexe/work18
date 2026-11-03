// Everything the admin panel can edit. Each entry's `defaults()` returns the content that ships
// in the code; saved edits are merged over it (see lib/content.cjs).
//
// To make another config editable: add it here, then read it with content.get(key, defaults)
// in the page that renders it.

const fs = require("fs");
const path = require("path");

const clone = (value) => JSON.parse(JSON.stringify(value));
const pick = (source, keys) => Object.fromEntries(keys.map((key) => [key, source[key]]));

const siteDefaults = () => {
  const site = require("../config/site");
  return clone(pick(site, ["siteName", "seoTitle", "description", "footer", "navigation", "footerLinks", "productCategories"]));
};

const guidesHtml = () => {
  try {
    return fs.readFileSync(path.join(process.cwd(), "data", "paint-guides.html"), "utf8");
  } catch {
    return "";
  }
};

const readJson = (name) => JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", `${name}.json`), "utf8"));

const pages = [
  { key: "home", group: "Pages", label: "Home page", note: "Hero slides, product tiles, headings, About, gallery, contact section text.", defaults: () => clone(require("../config/home")) },
  { key: "about", group: "Pages", label: "About Aeropolish", note: "Who we are, approach, quality, industries, future. Use **bold** and ==bold orange== in paragraphs.", defaults: () => clone(require("../config/about")) },
  { key: "company", group: "Pages", label: "Vision, Mission & company text", note: "Texts used on the Our Vision and Our Mission pages and the homepage About section.", defaults: () => clone(require("../config/company")) },
  { key: "privateLabel", group: "Pages", label: "Private Label", note: "Banner, intro, partner cards, offers and the closing section.", defaults: () => clone(require("../config/private-label")) },
  { key: "ralPage", group: "Pages", label: "RAL Colours page", note: "Banner and the texts around the RAL colour list.", defaults: () => clone(require("../config/ral-page")) },
  { key: "gallery", group: "Pages", label: "Gallery", note: "Sections and photos.", defaults: () => clone(require("../config/gallery")) },
  { key: "thinners", group: "Pages", label: "Thinners", note: "Thinner products, images and descriptions.", defaults: () => clone(require("../config/thinners")) },
  { key: "waterproofing", group: "Pages", label: "Water Shield & Waterproofing", note: "Intro, features, applications and the Leakage Master image.", defaults: () => clone(require("../config/waterproofing")) },
  { key: "blogs", group: "Blogs", label: "Blogs (page, home strip & posts)", note: "Set separate desktop and mobile banner images, and add, edit, reorder or delete posts under Posts. A post shows on the website only when Published is Yes.", defaults: () => clone(require("../config/blogs")) },
  { key: "paintGuides", group: "Pages", label: "Paint Guides", note: "The guide article is HTML (h2/h3/p/ul). Replace the images or text carefully.", defaults: () => ({ title: "Paint Application Guides", tagline: "Prepare Right. Apply Right. Protect Longer.", html: guidesHtml() }) },
  { key: "site", group: "Site-wide", label: "Menu, footer & SEO", note: "Navigation menu, footer links and slogan, product category banners, site title and description.", defaults: siteDefaults },
  { key: "contact", group: "Site-wide", label: "Contact details & WhatsApp", note: "Phone numbers, WhatsApp number, email and unit addresses.", defaults: () => clone(require("../config/contact")) },
  { key: "data.products", group: "Products & data", label: "Products", note: "Every product: name, description, image, TDS file, tags, active flag.", defaults: () => readJson("products") },
  { key: "data.productDetails", group: "Product details", label: "Product descriptions & tags", note: "Edit the brief and add, edit or remove the feature tags shown on each product card and in its View details popup.", defaults: () => readJson("products").map(({ _id, productNameEn, bioEn, tags }) => ({ _id, productNameEn, bioEn: bioEn || "", tags: Array.isArray(tags) ? tags : [] })) },
  { key: "tagIcons", group: "Product details", label: "Feature tag icons", note: "Add, edit or remove feature tag icon mappings. Choose a tag name and an icon from the available icons.", defaults: () => {
    const tagIcons = require("../config/tag-icons").default;
    const icons = new Map();
    const products = readJson("products");
    for (const product of products) {
      for (const tag of product.tags || []) {
        const slug = tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        const icon = tag === "Yellowing Resistance" ? "non-yellowing" : slug;
        icons.set(tag, `/tags/${tagIcons.includes(icon) ? icon : "generic"}.svg`);
      }
    }
    return [...icons].map(([tag, icon]) => ({ tag, icon }));
  } },
  { key: "data.posts", group: "Products & data", label: "News posts", note: "News articles.", defaults: () => readJson("posts") },
  { key: "data.jobs", group: "Products & data", label: "Jobs (Careers)", note: "Open positions.", defaults: () => readJson("jobs") },
];

const find = (key) => pages.find((page) => page.key === key) || null;

module.exports = { pages, find, siteDefaults };
