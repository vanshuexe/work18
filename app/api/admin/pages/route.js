import content from "../../../../lib/content.cjs";
import editable from "../../../../lib/editable.cjs";

export async function GET(request) {
  const user = await content.verifyAdmin(request);
  if (!user) return Response.json({ error: "Not authorised" }, { status: 401 });
  await content.load({ force: true });
  const pages = editable.pages.map(({ key, group, label, note }) => ({ key, group, label, note, saved: content.raw(key) !== undefined }));
  return Response.json({ pages });
}
