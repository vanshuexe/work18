import { notFound } from "next/navigation";
import PageShell from "../../../components/PageShell";
import BlogPostPage from "../../../components/pages/BlogPostPage";
import content from "../../../lib/content.cjs";
import blogLib from "../../../lib/blogs.cjs";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  await content.load();
  const post = blogLib.getPost((await params).slug);
  return { title: post?.title || "Blog not found", description: post?.excerpt };
}

export default async function Page({ params }) {
  await content.load();
  const post = blogLib.getPost((await params).slug);
  if (!post) notFound();
  return (
    <PageShell active="blogs" headerTheme="dark">
      <BlogPostPage post={post} blogs={blogLib.getBlogs()} />
    </PageShell>
  );
}
