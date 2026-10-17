import { notFound } from "next/navigation";
import PageShell from "../../../components/PageShell";
import NewsDetailPage from "../../../components/pages/NewsDetailPage";
import data from "../../../lib/data";

export function generateStaticParams() {
  return data.getPosts().map((post) => ({ id: post._id }));
}

export async function generateMetadata({ params }) {
  const post = data.getPost((await params).id);
  return {
    title: post?.title || "News not found",
    description: post?.briefText,
  };
}

export default async function PostPage({ params }) {
  const post = data.getPost((await params).id);
  if (!post) notFound();
  return (
    <PageShell active="about" headerTheme="dark">
      <NewsDetailPage post={post} />
    </PageShell>
  );
}
