import PageShell from "../components/PageShell";
import Content from "../components/pages/HomePage";
import data from "../lib/data";
import content from "../lib/content.cjs";
import siteLib from "../lib/site.cjs";
import blogLib from "../lib/blogs.cjs";
import homeDefaults from "../config/home";
import companyDefaults from "../config/company";

export const dynamic = "force-dynamic";

export default async function Page() {
  await content.load();
  const props = {
    home: content.get("home", homeDefaults),
    company: content.get("company", companyDefaults),
    contact: siteLib.getContact(),
    countries: data.getCountries(),
    blogs: blogLib.getBlogs(),
  };
  return (
    <PageShell active="home" behavior="home" headerTheme="" hideFooter={false}>
      <Content {...props} />
    </PageShell>
  );
}
