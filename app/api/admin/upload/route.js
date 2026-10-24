import { createClient } from "@supabase/supabase-js";
import content from "../../../../lib/content.cjs";

const BUCKET = "media";
const ALLOWED = /^(image\/(png|jpe?g|webp|gif|svg\+xml|avif)|video\/(mp4|webm|quicktime)|application\/pdf|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/;

// Hands the browser a one-time signed URL so large photos and videos go straight to Supabase Storage
// (they never pass through this server, which keeps big uploads fast and within host limits).
export async function POST(request) {
  const user = await content.verifyAdmin(request);
  if (!user) return Response.json({ error: "Not authorised" }, { status: 401 });
  const { url, service } = content.env();
  if (!url || !service) return Response.json({ error: "Supabase storage is not configured" }, { status: 503 });

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const filename = String(body?.filename || "file");
  const type = String(body?.contentType || "");
  if (!ALLOWED.test(type)) return Response.json({ error: "This file type is not allowed" }, { status: 415 });

  const safe = filename.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(-80) || "file";
  const folder = /^(image|video)/.test(type) ? type.split("/")[0] + "s" : "files";
  const path = `${folder}/${Date.now()}-${safe}`;

  const admin = createClient(url, service, { auth: { persistSession: false } });
  const { data, error } = await admin.storage.from(BUCKET).createSignedUploadUrl(path);
  if (error) return Response.json({ error: error.message }, { status: 502 });
  const publicUrl = admin.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  return Response.json({ bucket: BUCKET, path: data.path, token: data.token, publicUrl });
}
