import PageShell from "../../components/PageShell";
import Content from "../../components/pages/GalleryPage";
import gallery from "../../config/gallery";

export const metadata = {
  title: "Our Gallery",
  description: "Photos of Aeropolish industrial paints and coatings in use.",
};

export default function Page() {
  return (
    <PageShell active="gallery">
      <Content gallery={gallery} />
    </PageShell>
  );
}
