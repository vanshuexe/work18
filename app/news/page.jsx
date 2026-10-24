import PageShell from "../../components/PageShell";
import Content from "../../components/pages/NewsPage";
import data from "../../lib/data";
import content from "../../lib/content.cjs";

export const dynamic = "force-dynamic";
export const metadata = { title: "News" };
export default async function Page() {
  await content.load();
  const props = { posts: data.getPosts() };
  return (
    <PageShell active="about" behavior="" headerTheme="" hideFooter={false}>
      <Content {...props} />
    </PageShell>
  );
}
