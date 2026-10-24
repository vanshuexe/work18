import PageShell from "../../components/PageShell";
import Content from "../../components/pages/RalColoursPage";
import colours from "../../data/ral-colours.json";
import content from "../../lib/content.cjs";
import defaults from "../../config/ral-page";

export const dynamic = "force-dynamic";

export const metadata = { title: "RAL Colours", description: "RAL Classic colour reference with codes and names." };

export default async function Page() {
  await content.load();
  return (
    <PageShell active="colors">
      <Content colours={colours} content={content.get("ralPage", defaults)} />
    </PageShell>
  );
}
