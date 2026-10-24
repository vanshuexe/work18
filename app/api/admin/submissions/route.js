import content from "../../../../lib/content.cjs";
import inbox from "../../../../lib/inbox.cjs";
import inquiries from "../../../../config/inquiries";

const FILE_PATH = /^(contact|client|vendor|investor|job)\/[A-Za-z0-9._-]+$/;
const UUID = /^[0-9a-f-]{36}$/i;

// Field name -> the label shown on the form, per kind, so the admin sees "Company name" and not "companyName".
function labelsFor() {
  const out = { contact: { name: "Name", email: "Email", city: "City", category: "Category", countryCode: "Country code", phone: "Phone", message: "Message" }, job: { jobTitle: "Job", name: "Name", email: "Email", countryCode: "Country code", phone: "Phone", cvFile: "CV" } };
  for (const [kind, definition] of Object.entries(inquiries)) {
    out[kind] = Object.fromEntries(definition.fields.map((field) => [field.name, field.label.replace(/\s*\(optional\)$/i, "")]));
  }
  return out;
}

async function guard(request) {
  const user = await content.verifyAdmin(request);
  if (!user) return Response.json({ error: "Not authorised" }, { status: 401 });
  if (!inbox.enabled()) return Response.json({ error: "Supabase is not configured" }, { status: 503 });
  return null;
}

const notReady = (error) => /PGRST205|42P01|does not exist|Could not find the table/i.test(error.message);

export async function GET(request) {
  const denied = await guard(request);
  if (denied) return denied;
  const params = new URL(request.url).searchParams;

  const file = params.get("file");
  if (file) {
    if (!FILE_PATH.test(file)) return Response.json({ error: "Invalid file" }, { status: 400 });
    try {
      return Response.json({ url: await inbox.signedUrl(file) });
    } catch (error) {
      return Response.json({ error: error.message }, { status: 502 });
    }
  }

  try {
    const submissions = await inbox.list({ kind: params.get("kind") || undefined, status: params.get("status") || undefined });
    return Response.json({ submissions, labels: labelsFor() });
  } catch (error) {
    if (notReady(error)) return Response.json({ submissions: [], labels: labelsFor(), notReady: true });
    return Response.json({ error: error.message }, { status: 502 });
  }
}

export async function PATCH(request) {
  const denied = await guard(request);
  if (denied) return denied;
  const body = await request.json().catch(() => ({}));
  if (!UUID.test(String(body.id || ""))) return Response.json({ error: "Invalid id" }, { status: 400 });
  try {
    await inbox.setStatus(body.id, body.status);
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: error.message === "Invalid status" ? 400 : 502 });
  }
}

export async function DELETE(request) {
  const denied = await guard(request);
  if (denied) return denied;
  const id = new URL(request.url).searchParams.get("id") || "";
  if (!UUID.test(id)) return Response.json({ error: "Invalid id" }, { status: 400 });
  try {
    await inbox.remove(id);
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 502 });
  }
}
