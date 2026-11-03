import content from "../../../../lib/content.cjs";
import editable from "../../../../lib/editable.cjs";
import { createRequire } from "node:module";

const MAX_BYTES = 6 * 1024 * 1024;
const require = createRequire(import.meta.url);
const { prepareBlogsForEditor } = require("../../../../lib/blog-blocks.cjs");

async function authorised(request) {
  const user = await content.verifyAdmin(request);
  return user || null;
}

function entry(request) {
  const key = new URL(request.url).searchParams.get("key") || "";
  return editable.find(key);
}

// Current content of one page: the defaults from the code and what the admin has saved.
export async function GET(request) {
  if (!(await authorised(request))) return Response.json({ error: "Not authorised" }, { status: 401 });
  const page = entry(request);
  if (!page) return Response.json({ error: "Unknown page" }, { status: 404 });
  await content.load({ force: true });
  const rawDefaults = page.defaults();
  const defaults = page.key === "blogs" ? prepareBlogsForEditor(rawDefaults) : rawDefaults;
  const saved = content.raw(page.key);
  let value = saved === undefined ? defaults : content.merge(defaults, saved);
  if (page.key === "blogs") {
    value = prepareBlogsForEditor(value);
    value.bannerDesktop =
      typeof saved?.bannerDesktop === "string"
        ? saved.bannerDesktop
        : typeof saved?.banner === "string"
          ? saved.banner
          : defaults.bannerDesktop;
    value.bannerMobile =
      typeof saved?.bannerMobile === "string"
        ? saved.bannerMobile
        : defaults.bannerMobile;
    delete value.banner;
  }
  if (page.key === "data.productDetails" && Array.isArray(saved)) {
    const savedById = new Map(
      saved.filter((item) => item && typeof item._id === "string").map((item) => [item._id, item]),
    );
    value = defaults.map((item) => ({
      ...item,
      ...(savedById.get(item._id) || {}),
    }));
  }
  return Response.json({ key: page.key, label: page.label, defaults, value, saved: saved !== undefined });
}

// Save the edited content of a page.
export async function PUT(request) {
  const user = await authorised(request);
  if (!user) return Response.json({ error: "Not authorised" }, { status: 401 });
  const page = entry(request);
  if (!page) return Response.json({ error: "Unknown page" }, { status: 404 });
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const value = body?.value;
  if (value === null || typeof value !== "object") return Response.json({ error: "Content must be an object or a list" }, { status: 400 });
  if (Buffer.byteLength(JSON.stringify(value)) > MAX_BYTES) return Response.json({ error: "Content is too large" }, { status: 413 });
  try {
    await content.save(page.key, value, user.email);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 502 });
  }
  return Response.json({ ok: true });
}

// Go back to the content that ships with the code.
export async function DELETE(request) {
  if (!(await authorised(request))) return Response.json({ error: "Not authorised" }, { status: 401 });
  const page = entry(request);
  if (!page) return Response.json({ error: "Unknown page" }, { status: 404 });
  try {
    await content.remove(page.key);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 502 });
  }
  return Response.json({ ok: true });
}
