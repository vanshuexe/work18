// Site-wide settings: navigation, product categories and colour families.

const navigation = [
  { label: "Home", href: "/", key: "home" },
  {
    label: "About Us",
    key: "about",
    children: [
      { label: "About Aeropolish", href: "/about-us" },
      { label: "Our Vision", href: "/our-vision" },
      { label: "Our Mission", href: "/our-mission" },
      { label: "Client Inquiry", href: "/client" },
      { label: "Become a Vendor", href: "/vendor" },
      { label: "Investor Relations", href: "/investor" },
    ],
  },
  {
    label: "Products",
    key: "products",
    children: [
      { label: "Interior Paints", href: "/interior-paints" },
      { label: "Exterior Paints", href: "/exterior-paints" },
      { label: "Industrial Paints", href: "/industrial-paints" },
      { label: "Thinners", href: "/thinners" },
      { label: "Water Shield & Waterproofing", href: "/waterproofing" },
    ],
  },
  {
    label: "Colors",
    key: "colors",
    children: [
      { label: "Our Colors", href: "/our-colors" },
      { label: "Color Trends", href: "/color-trends" },
      { label: "Color Visualizer", href: "/color-visualizer" },
      { label: "RAL Colours", href: "/ral-colours" },
    ],
  },
  { label: "Private Label", href: "/private-label", key: "private-label" },
];

const footerLinks = {
  products: navigation.find((item) => item.key === "products")?.children || [],
  colors: [
    { label: "Our Colors", href: "/our-colors" },
    { label: "Color Visualizer", href: "/color-visualizer" },
    { label: "Color Trends", href: "/color-trends" },
    { label: "RAL Colours", href: "/ral-colours" },
  ],
  support: [
    { label: "About Us", href: "/about-us" },
    { label: "Paint Guides", href: "/paint-guides" },
    { label: "Private Label", href: "/private-label" },
    { label: "Contact Us", href: "/#contact" },
    { label: "Client Inquiry", href: "/client" },
    { label: "Become a Vendor", href: "/vendor" },
    { label: "Investor Relations", href: "/investor" },
  ],
};

// Product category pages, keyed by URL slug (matches mainCategory.slug in data/products.json)
const productCategories = {
  "interior-paints": {
    title: "Interior Paints",
    description:
      "Transform your indoor spaces with our premium interior paint solutions",
    heroImage: "/new-images/banner-interior.svg",
    allLabel: "All Interior Paint Products",
  },
  "exterior-paints": {
    title: "Exterior Paints",
    description:
      "Protect and beautify your outdoor surfaces with our durable exterior paint solutions",
    heroImage: "/new-images/banner-exterior.svg",
    allLabel: "All Exterior Paint Products",
  },
  "industrial-paints": {
    title: "Industrial Paints",
    description:
      "Heavy-duty protection for industrial environments and specialized applications",
    heroImage: "/new-images/banner-industrial.svg",
    allLabel: "All Industrial Paint Products",
  },
  ink: {
    title: "Ink",
    description:
      "High-quality printing inks for various industrial and commercial applications",
    heroImage: "/new-images/banner-ink.svg",
    allLabel: "All Ink Products",
  },

};

// Product tag name -> icon in public/tags (most are the slugified name)
const tagIconOverrides = {
  "Yellowing Resistance": "non-yellowing",
};

function tagIcon(tag) {
  const file =
    tagIconOverrides[tag] ||
    tag
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  // Tags without a dedicated icon fall back to a generic one instead of a broken image.
  return availableTagIcons().has(file) ? `/tags/${file}.svg` : "/tags/generic.svg";
}

let tagIconFiles;
function availableTagIcons() {
  if (!tagIconFiles) {
    const fs = require("fs");
    const path = require("path");
    try {
      tagIconFiles = new Set(
        fs
          .readdirSync(path.join(process.cwd(), "public", "tags"))
          .map((name) => name.replace(/\.svg$/, "")),
      );
    } catch {
      return new Set();
    }
  }
  return tagIconFiles;
}

// Colour families on Our Colors / Color Visualizer, in display order
const colorFamilies = [
  { type: "off-white", label: "Off White", swatch: "#F5F5F5" },
  { type: "yellow", label: "Yellow", swatch: "#FFC107" },
  { type: "lime", label: "Lime", swatch: "#32CD32" },
  { type: "orange", label: "Orange", swatch: "#F28E16" },
  { type: "red", label: "Red", swatch: "#E4032F" },
  { type: "green", label: "Green", swatch: "#3F993F" },
  { type: "teal", label: "Teal", swatch: "#2FAF9F" },
  { type: "blue", label: "Blue", swatch: "#4376A3" },
  { type: "violet", label: "Violet", swatch: "#745184" },
  { type: "neutral", label: "Neutral", swatch: "#8F9293" },
];

module.exports = {
  siteName: "Aeropolish",
  description:
    "Aeropolish Paints & Coating Industry — reliable, performance-oriented and value-driven coatings for industrial, commercial, infrastructure and decorative applications.",
  navigation,
  footerLinks,
  productCategories,
  tagIcon,
  colorFamilies,
};
