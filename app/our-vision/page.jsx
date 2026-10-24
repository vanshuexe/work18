import PageShell from "../../components/PageShell";
import Content from "../../components/pages/VisionPage";
import content from "../../lib/content.cjs";
import defaults from "../../config/company";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Vision",
  description: "Aeropolish vision: building a trusted Indian coatings brand for the world.",
};

export default async function Page() {
  await content.load();
  return (
    <PageShell active="about">
      <Content company={content.get("company", defaults)} />
    </PageShell>
  );
}
