// Queries sent through the website forms (contact, client, vendor, investor, job applications),
// kept in the Supabase table public.submissions and shown in the admin panel under "Queries".
// Uploaded documents go to the private storage bucket "submissions".
//
// The table is private: only the server (service role key) can read or write it.

const content = require("./content.cjs");
const crypto = require("node:crypto");
const path = require("node:path");

const BUCKET = "submissions";
const KINDS = ["contact", "client", "vendor", "investor", "job"];

const config = () => {
  const { url, service } = content.env();
  return url && service ? { url, service } : null;
};

const enabled = () => Boolean(config());

const headers = (service, extra = {}) => ({ apikey: service, Authorization: `Bearer ${service}`, ...extra });

async function rest(pathAndQuery, options = {}) {
  const { url, service } = config();
  const response = await fetch(`${url}/rest/v1/${pathAndQuery}`, {
    cache: "no-store",
    ...options,
    headers: headers(service, { "Content-Type": "application/json", ...(options.headers || {}) }),
  });
  if (!response.ok) throw new Error(`Supabase ${options.method || "GET"} ${pathAndQuery.split("?")[0]} failed (${response.status}): ${(await response.text()).slice(0, 300)}`);
  return response;
}

// Stores a document in the private bucket and returns its storage path.
async function uploadFile(kind, file) {
  const { url, service } = config();
  const name = `${kind}/${crypto.randomUUID()}${path.extname(file.name || "").toLowerCase()}`;
  const response = await fetch(`${url}/storage/v1/object/${BUCKET}/${name}`, {
    method: "POST",
    headers: headers(service, { "Content-Type": file.type || "application/octet-stream", "x-upsert": "false" }),
    body: Buffer.from(await file.arrayBuffer()),
  });
  if (!response.ok) throw new Error(`Upload failed (${response.status}): ${(await response.text()).slice(0, 200)}`);
  return name;
}

// files: [{ fieldName, file }]
async function add(kind, record, files = []) {
  const stored = [];
  for (const { fieldName, file } of files) {
    const storagePath = await uploadFile(kind, file);
    stored.push({ field: fieldName, name: path.basename(file.name || "file"), path: storagePath, size: file.size });
  }
  try {
    await rest("submissions", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ kind, data: record, attachments: stored }) });
  } catch (error) {
    await removeFiles(stored.map((item) => item.path));
    throw error;
  }
}

async function removeFiles(paths) {
  const list = paths.filter(Boolean);
  if (!list.length) return;
  const { url, service } = config();
  await fetch(`${url}/storage/v1/object/${BUCKET}`, {
    method: "DELETE",
    headers: headers(service, { "Content-Type": "application/json" }),
    body: JSON.stringify({ prefixes: list }),
  }).catch(() => {});
}

async function list({ kind, status, limit = 500 } = {}) {
  const query = [`select=*`, `order=created_at.desc`, `limit=${Math.min(Math.max(Number(limit) || 500, 1), 1000)}`];
  if (KINDS.includes(kind)) query.push(`kind=eq.${kind}`);
  if (["new", "read", "done"].includes(status)) query.push(`status=eq.${status}`);
  return (await rest(`submissions?${query.join("&")}`)).json();
}

async function setStatus(id, status) {
  if (!["new", "read", "done"].includes(status)) throw new Error("Invalid status");
  await rest(`submissions?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ status }) });
}

async function remove(id) {
  const rows = await (await rest(`submissions?id=eq.${encodeURIComponent(id)}&select=attachments`)).json();
  await rest(`submissions?id=eq.${encodeURIComponent(id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
  await removeFiles((rows[0]?.attachments || []).map((item) => item.path));
}

// A link to a private document that works for one hour.
async function signedUrl(storagePath) {
  const { url, service } = config();
  const response = await fetch(`${url}/storage/v1/object/sign/${BUCKET}/${storagePath.split("/").map(encodeURIComponent).join("/")}`, {
    method: "POST",
    headers: headers(service, { "Content-Type": "application/json" }),
    body: JSON.stringify({ expiresIn: 3600 }),
  });
  if (!response.ok) throw new Error(`Could not create a download link (${response.status})`);
  const { signedURL } = await response.json();
  return `${url}/storage/v1${signedURL}`;
}

module.exports = { enabled, add, list, setStatus, remove, signedUrl, KINDS, BUCKET };
