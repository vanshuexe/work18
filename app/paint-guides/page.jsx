import fs from "node:fs";
import path from "node:path";
import PageShell from "../../components/PageShell";
import Content from "../../components/pages/PaintGuidesPage";
import content from "../../lib/content.cjs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Paint Application Guides",
  description: "Surface preparation, mixing, application, drying and safety guidance for Aeropolish paints and coatings.",
};

export default async function Page() {
  await content.load();
  const defaults = {
    title: "Paint Application Guides",
    tagline: "Prepare Right. Apply Right. Protect Longer.",
    html: fs.readFileSync(path.join(process.cwd(), "data", "paint-guides.html"), "utf8"),
  };
  const guide = content.get("paintGuides", defaults);
  return (
    <PageShell active="">
      <Content html={guide.html} title={guide.title} tagline={guide.tagline} />
    </PageShell>
  );
}
