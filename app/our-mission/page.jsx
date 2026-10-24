import PageShell from "../../components/PageShell";
import Content from "../../components/pages/MissionPage";
import content from "../../lib/content.cjs";
import defaults from "../../config/company";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Mission",
  description: "Aeropolish mission: bringing quality paints closer to every home.",
};

export default async function Page() {
  await content.load();
  return (
    <PageShell active="about">
      <Content company={content.get("company", defaults)} />
    </PageShell>
  );
}
