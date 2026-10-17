import PageShell from "../../components/PageShell";
import Content from "../../components/pages/ColorTrendsPage";
import site from "../../config/site";
import home from "../../config/home";
export const metadata = { title: "Color Trends" };
export default function Page() {
  return (
    <PageShell active="colors" behavior="" headerTheme="" hideFooter={false}>
      <Content />
    </PageShell>
  );
}
