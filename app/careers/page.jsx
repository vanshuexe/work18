import PageShell from "../../components/PageShell";
import Content from "../../components/pages/CareersPage";
import data from "../../lib/data";
import content from "../../lib/content.cjs";

export const dynamic = "force-dynamic";
export const metadata = { title: "Careers" };
export default async function Page() {
  await content.load();
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
