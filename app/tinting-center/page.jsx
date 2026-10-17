import PageShell from "../../components/PageShell";
import Content from "../../components/pages/TintingCenterPage";
import data from "../../lib/data";
import site from "../../config/site";
import home from "../../config/home";
export const metadata = { title: "Tinting Centers" };
export default function Page() {
  const centers = data.getTintingCenters();
  const props = {
    centers,
    cities: [...new Set(centers.map((c) => c.city).filter(Boolean))].sort(),
  };
  return (
    <PageShell
      active="tinting-center"
      behavior="tinting-center"
      headerTheme=""
      hideFooter={false}
    >
      <Content {...props} />
    </PageShell>
  );
}
