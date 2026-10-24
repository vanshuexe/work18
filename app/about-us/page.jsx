import PageShell from "../../components/PageShell";
import Content from "../../components/pages/AboutPage";
import content from "../../lib/content.cjs";
import defaults from "../../config/about";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Aeropolish",
  description: "Learn about Aeropolish Paints & Coating Industry, our approach, quality, vision and mission.",
};

export default async function Page() {
  await content.load();
  return (
    <PageShell active="about" headerTheme="dark">
      <Content about={content.get("about", defaults)} />
    </PageShell>
  );
}
