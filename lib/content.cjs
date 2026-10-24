// Editable site content stored in Supabase (table public.site_content).
//
// Every page keeps its original text and image paths as defaults in the code. When Supabase is
// configured, whatever the admin saved is merged over those defaults at request time, so an
// untouched page looks exactly as before and the site still works if Supabase is unreachable.
//
// Usage on the server:   await content.load();   const about = content.get("about", defaults);

const TTL_MS = 8000;

const env = () => ({
  url: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  anon: process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  service: process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  adminEmail: (process.env.ADMIN_EMAIL || "admin@aeropolish.com").trim().toLowerCase(),
});

const enabled = () => {
  const { url, anon } = env();
  return Boolean(url && anon);
};

let rows = {};
let loadedAt = 0;
let pending = null;

const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

// Objects merge key by key (so fields added to the defaults later still appear);
// arrays and primitives saved by the admin replace the default outright.
function merge(defaults, override) {
  if (override === undefined || override === null) return defaults;
  if (isObject(defaults) && isObject(override)) {
    const out = { ...defaults };
    for (const key of Object.keys(override)) out[key] = merge(defaults[key], override[key]);
    return out;
  }
  return override;
}

async function load({ force = false } = {}) {
  if (!enabled()) return rows;
  if (!force && Date.now() - loadedAt < TTL_MS) return rows;
  if (pending) return pending;
  const { url, anon } = env();
  pending = (async () => {
    try {
      const response = await fetch(`${url}/rest/v1/site_content?select=key,value`, {
        headers: { apikey: anon, Authorization: `Bearer ${anon}` },
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`Supabase responded ${response.status}`);
      const list = await response.json();
      rows = Object.fromEntries(list.map((row) => [row.key, row.value]));
      loadedAt = Date.now();
    } catch (error) {
      // Keep serving the last good copy (or the code defaults) and retry shortly.
      loadedAt = Date.now() - TTL_MS + 2000;
      if (process.env.NODE_ENV !== "production") console.warn("[content] could not load Supabase content:", error.message);
    } finally {
      pending = null;
    }
    return rows;
  })();
  return pending;
}

const get = (key, defaults) => merge(defaults, rows[key]);

// The raw saved value, or undefined. Used by the JSON data layer (products, news, jobs).
const raw = (key) => rows[key];

const clear = () => {
  loadedAt = 0;
};

// ----- admin helpers -----

async function verifyAdmin(request) {
  const { url, anon, service, adminEmail } = env();
  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token || !url || !(service || anon)) return null;
  try {
    const response = await fetch(`${url}/auth/v1/user`, {
      headers: { apikey: service || anon, Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!response.ok) return null;
    const user = await response.json();
    return user?.email && user.email.toLowerCase() === adminEmail ? user : null;
  } catch {
    return null;
  }
}

async function save(key, value, email) {
  const { url, service } = env();
  if (!service) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  const response = await fetch(`${url}/rest/v1/site_content?on_conflict=key`, {
    method: "POST",
    headers: {
      apikey: service,
      Authorization: `Bearer ${service}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({ key, value, updated_at: new Date().toISOString(), updated_by: email || null }),
  });
  if (!response.ok) throw new Error(`Save failed (${response.status}): ${await response.text()}`);
  rows[key] = value;
  clear();
}

async function remove(key) {
  const { url, service } = env();
  if (!service) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  const response = await fetch(`${url}/rest/v1/site_content?key=eq.${encodeURIComponent(key)}`, {
    method: "DELETE",
    headers: { apikey: service, Authorization: `Bearer ${service}` },
  });
  if (!response.ok) throw new Error(`Reset failed (${response.status})`);
  delete rows[key];
  clear();
}

module.exports = { enabled, env, load, get, raw, merge, clear, verifyAdmin, save, remove };
