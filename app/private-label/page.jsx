import PageShell from "../../components/PageShell";
import Content from "../../components/pages/PrivateLabelPage";
import content from "../../lib/content.cjs";
import defaults from "../../config/private-label";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Private Label & White Label Paint Manufacturing",
  description:
    "Build your own paint brand with Aeropolish: product selection, custom branding and packaging, colour options and manufacturing support.",
};

export default async function Page() {
  await content.load();
  return (
    <PageShell active="private-label">
      <Content content={content.get("privateLabel", defaults)} />
    </PageShell>
  );
}
