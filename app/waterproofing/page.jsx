import PageShell from "../../components/PageShell";
import Content from "../../components/pages/WaterproofingPage";
import content from "../../lib/content.cjs";
import defaults from "../../config/waterproofing";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Water Shield & Waterproofing Chemicals",
  description:
    "Aeropolish Water Shield & Waterproofing Chemicals help protect terraces, roofs, bathrooms, walls and basements against water penetration and dampness.",
};

export default async function Page() {
  await content.load();
  return (
    <PageShell active="products">
      <Content content={content.get("waterproofing", defaults)} />
    </PageShell>
  );
}
