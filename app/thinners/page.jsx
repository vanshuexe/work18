import PageShell from "../../components/PageShell";
import Content from "../../components/pages/ThinnersPage";
import content from "../../lib/content.cjs";
import defaults from "../../config/thinners";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Thinners",
  description: "Aeropolish thinners for professional and industrial coating applications, including NC Thinner.",
};

export default async function Page() {
  await content.load();
  return (
    <PageShell active="products">
      <Content thinners={content.get("thinners", defaults)} />
    </PageShell>
  );
}
