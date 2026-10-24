import PageShell from "../../components/PageShell";
import Content from "../../components/pages/BlogsPage";
import content from "../../lib/content.cjs";
import blogLib from "../../lib/blogs.cjs";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  await content.load();
  const blogs = blogLib.getBlogs();
  return { title: blogs.title, description: blogs.tagline };
}

export default async function Page() {
  await content.load();
  return (
    <PageShell active="blogs">
      <Content blogs={blogLib.getBlogs()} />
    </PageShell>
  );
}
