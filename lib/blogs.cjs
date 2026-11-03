// Reads the blog content (defaults in config/blogs.js plus whatever the admin saved).
const content = require("./content.cjs");
const defaults = require("../config/blogs");
const { blocksFromContent } = require("./blog-blocks.cjs");

const slugify = (text) =>
  String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

function getBlogs() {
  const saved = content.raw("blogs");
  const blogs = content.get("blogs", defaults);
  const bannerDesktop =
    typeof saved?.bannerDesktop === "string"
      ? saved.bannerDesktop
      : typeof saved?.banner === "string"
        ? saved.banner
        : blogs.bannerDesktop;
  const bannerMobile =
    typeof saved?.bannerMobile === "string"
      ? saved.bannerMobile
      : blogs.bannerMobile;
  const used = new Set();
  const posts = (Array.isArray(blogs.posts) ? blogs.posts : [])
    .map((post, index) => {
      let slug = slugify(post.slug) || slugify(post.title) || `post-${index + 1}`;
      while (used.has(slug)) slug = `${slug}-${index + 1}`;
      used.add(slug);
      // A section typed as plain text still shows (as a paragraph) instead of vanishing.
      const sections = (Array.isArray(post.sections) ? post.sections : [])
        .map((section) => {
          const normalized = typeof section === "string" ? { title: "", image: "", content: section } : section;
          return {
            ...normalized,
            blocks: Array.isArray(normalized.blocks)
              ? normalized.blocks
              : blocksFromContent(normalized.content),
          };
        })
        .filter((section) => section && typeof section === "object");
      return { ...post, slug, sections };
    })
    .filter((post) => post.published !== false && String(post.title || "").trim());
  posts.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  return { ...blogs, bannerDesktop, bannerMobile, posts };
}

const getPost = (slug) => getBlogs().posts.find((post) => post.slug === slug) || null;

module.exports = { getBlogs, getPost, slugify };
