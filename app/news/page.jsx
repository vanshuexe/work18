import PageShell from "../../components/PageShell";
import Content from "../../components/pages/NewsPage";
import data from "../../lib/data";
import site from "../../config/site";
import home from "../../config/home";
export const metadata = { title: "News" };
export default function Page() {
  const props = { posts: data.getPosts() };
  return (
    <PageShell active="about" behavior="" headerTheme="" hideFooter={false}>
      <Content {...props} />
    </PageShell>
  );
}
