import PageShell from "../../components/PageShell";
import Content from "../../components/pages/ThinnersPage";
import thinners from "../../config/thinners";

export const metadata = {
  title: "Thinners",
  description: "Aeropolish thinners for professional and industrial coating applications, including NC Thinner.",
};

export default function Page() {
  return (
    <PageShell active="products">
      <Content thinners={thinners} />
    </PageShell>
  );
}
