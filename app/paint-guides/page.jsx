import fs from "node:fs";
import path from "node:path";
import PageShell from "../../components/PageShell";
import Content from "../../components/pages/PaintGuidesPage";

export const metadata = {
  title: "Paint Application Guides",
  description:
    "Surface preparation, mixing, application, drying and safety guidance for Aeropolish paints and coatings.",
};

export default function Page() {
  const html = fs.readFileSync(path.join(process.cwd(), "data", "paint-guides.html"), "utf8");
  return (
    <PageShell active="">
      <Content html={html} />
    </PageShell>
  );
}
