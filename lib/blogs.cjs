// Reads the blog content (defaults in config/blogs.js plus whatever the admin saved).
const content = require("./content.cjs");
const defaults = require("../config/blogs");

const slugify = (text) =>
  String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

function getBlogs() {
  const blogs = content.get("blogs", defaults);
  const used = new Set();
  const posts = (Array.isArray(blogs.posts) ? blogs.posts : [])
    .map((post, index) => {
      let slug = slugify(post.slug) || slugify(post.title) || `post-${index + 1}`;
      while (used.has(slug)) slug = `${slug}-${index + 1}`;
      used.add(slug);
      return { ...post, slug, sections: Array.isArray(post.sections) ? post.sections : [] };
    })
    .filter((post) => post.published !== false && String(post.title || "").trim());
  posts.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  return { ...blogs, posts };
}

const getPost = (slug) => getBlogs().posts.find((post) => post.slug === slug) || null;

module.exports = { getBlogs, getPost, slugify };
