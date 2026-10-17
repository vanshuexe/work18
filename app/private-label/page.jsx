import PageShell from "../../components/PageShell";
import Content from "../../components/pages/PrivateLabelPage";

export const metadata = {
  title: "Private Label Paint Manufacturing",
  description:
    "Build your own paint brand with Aeropolish: product selection, custom branding and packaging, colour options and manufacturing support.",
};

export default function Page() {
  return (
    <PageShell active="private-label">
      <Content />
    </PageShell>
  );
}
