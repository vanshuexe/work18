import PageShell from "../../components/PageShell";
import Content from "../../components/pages/OurColorsPage";
import data from "../../lib/data";
import site from "../../config/site";
import home from "../../config/home";
export const metadata = { title: "Our Colors" };
export default function Page() {
  const props = {
    colors: [...data.getColors()].sort(
      (a, b) => a.row - b.row || a.column - b.column,
    ),
  };
  return (
    <PageShell
      active="colors"
      behavior="our-colors"
      headerTheme="dark"
      hideFooter={true}
    >
      <Content {...props} />
    </PageShell>
  );
}
