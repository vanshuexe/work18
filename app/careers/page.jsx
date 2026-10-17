import PageShell from "../../components/PageShell";
import Content from "../../components/pages/CareersPage";
import data from "../../lib/data";
import site from "../../config/site";
import home from "../../config/home";
export const metadata = { title: "Careers" };
export default function Page() {
  const jobs = data.getJobs();
  const unique = (key) =>
    [...new Set(jobs.map((j) => j[key]).filter(Boolean))].sort();
  const props = {
    jobs,
    types: unique("type"),
    locations: unique("location"),
    departments: unique("department"),
    countries: data.getCountries(),
  };
  return (
    <PageShell
      active="about"
      behavior="careers"
      headerTheme=""
      hideFooter={false}
    >
      <Content {...props} />
    </PageShell>
  );
}
