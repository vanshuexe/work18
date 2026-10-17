import PageShell from "../../components/PageShell";
import Content from "../../components/pages/WaterproofingPage";
import content from "../../config/waterproofing";

export const metadata = {
  title: "Water Shield & Waterproofing Chemicals",
  description:
    "Aeropolish Water Shield & Waterproofing Chemicals help protect terraces, roofs, bathrooms, walls and basements against water penetration and dampness.",
};

export default function Page() {
  return (
    <PageShell active="products">
      <Content content={content} />
    </PageShell>
  );
}
