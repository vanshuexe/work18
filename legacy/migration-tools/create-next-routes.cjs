const fs = require("node:fs");
function write(file, content) {
  fs.mkdirSync(require("node:path").dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}
const routes = {
  "": {
    component: "HomePage",
    active: "home",
    behavior: "home",
    content: "const props = { home, countries: data.getCountries() };",
  },
  "about-us": {
    component: "AboutPage",
    title: "About Pachin",
    active: "about",
    content:
      "const team = data.getTeamMembers(); const props = { boardLeaders: team.filter(m => m.category === 'boardTeam' && m.class === 1), boardMembers: team.filter(m => m.category === 'boardTeam' && m.class === 2), executives: team.filter(m => m.category !== 'boardTeam') };",
  },
  news: {
    component: "NewsPage",
    title: "News",
    active: "about",
    content: "const props = { posts: data.getPosts() };",
  },
  careers: {
    component: "CareersPage",
    title: "Careers",
    active: "about",
    behavior: "careers",
    content:
      "const jobs = data.getJobs(); const unique = key => [...new Set(jobs.map(j => j[key]).filter(Boolean))].sort(); const props = { jobs, types: unique('type'), locations: unique('location'), departments: unique('department'), countries: data.getCountries() };",
  },
  catalogs: {
    component: "CatalogsPage",
    title: "Catalogs",
    content: "const props = { catalogs: data.getCatalogs() };",
  },
  "tinting-center": {
    component: "TintingCenterPage",
    title: "Tinting Centers",
    active: "tinting-center",
    behavior: "tinting-center",
    content:
      "const centers = data.getTintingCenters(); const props = { centers, cities: [...new Set(centers.map(c => c.city).filter(Boolean))].sort() };",
  },
  "our-colors": {
    component: "OurColorsPage",
    title: "Our Colors",
    active: "colors",
    behavior: "our-colors",
    dark: true,
    hideFooter: true,
    content:
      "const props = { colors: [...data.getColors()].sort((a,b) => a.row - b.row || a.column - b.column) };",
  },
  "color-trends": {
    component: "ColorTrendsPage",
    title: "Color Trends",
    active: "colors",
    content:
      "const props = { catalog: data.getCatalogs().find(c => /trend/i.test(c.title)) };",
  },
  "color-visualizer": {
    component: "ColorVisualizerPage",
    title: "Color Visualizer",
    active: "colors",
    behavior: "color-visualizer",
    dark: true,
    hideFooter: true,
    content: `const colors = data.getColors(); const props = { counts: Object.fromEntries(site.colorFamilies.map(f => [f.type, colors.filter(c => c.colorType === f.type).length])), defaultColor: colors.find(c => c.colorType === 'neutral') || colors[0], sofas: [{ hex: '#9CA3AF', desktop: '/desktop_grey-sofa.webp', mobile: '/mobile_grey-sofa-final-min.webp' }, { hex: '#8B4513', desktop: '/desktop_brown-sofa.webp', mobile: '/mobile-brown-sofa-min.webp' }, { hex: '#FFFFFF', desktop: '/desktop_white-sofa.webp', mobile: '/mobile-white-sofa-final-min.webp' }] };`,
  },
};
for (const [route, config] of Object.entries(routes)) {
  const prefix = route ? "../../" : "../";
  write(
    `app/${route ? route + "/" : ""}page.jsx`,
    `import PageShell from '${prefix}components/PageShell';
import Content from '${prefix}components/pages/${config.component}';
import data from '${prefix}lib/data';
import site from '${prefix}config/site';
import home from '${prefix}config/home';
${config.title ? `export const metadata = { title: ${JSON.stringify(config.title)} };` : ""}
export default function Page() {
  ${config.content}
  return <PageShell active="${config.active || ""}" behavior="${config.behavior || ""}" headerTheme="${config.dark ? "dark" : ""}" hideFooter={${!!config.hideFooter}}><Content {...props} /></PageShell>;
}
`,
  );
}
for (const name of [
  "main",
  "home",
  "products",
  "careers",
  "tinting-center",
  "our-colors",
  "color-visualizer",
]) {
  let source = fs.readFileSync(`public/js/${name}.js`, "utf8");
  source = source
    .replace("(function () {", "export default function initialize(scope) {")
    .replace(/\}\)\(\);\s*$/, "}");
  source = source.replace(
    /([\w.]+(?:\.querySelector\([^;\n]*?\))?)\.addEventListener\(/g,
    "scope.on($1, ",
  );
  source = source.replace(
    /\b(setTimeout|clearTimeout|setInterval|clearInterval|fetch)\(/g,
    "scope.$1(",
  );
  write(`lib/client/${name}.js`, source);
}
