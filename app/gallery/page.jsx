import PageShell from "../../components/PageShell";
import Content from "../../components/pages/GalleryPage";
import content from "../../lib/content.cjs";
import defaults from "../../config/gallery";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Gallery",
  description: "Photos of Aeropolish industrial paints and coatings in use.",
};

export default async function Page() {
  await content.load();
  return (
    <PageShell active="gallery">
      <Content gallery={content.get("gallery", defaults)} />
    </PageShell>
  );
}
