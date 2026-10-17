import PageShell from "../components/PageShell";
import Content from "../components/pages/HomePage";
import data from "../lib/data";
import site from "../config/site";
import home from "../config/home";

export default function Page() {
  const props = {
    home,
    countries: data.getCountries(),
  };
  return (
    <PageShell active="home" behavior="home" headerTheme="" hideFooter={false}>
      <Content {...props} />
    </PageShell>
  );
}
