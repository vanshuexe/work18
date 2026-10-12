// Static integrity check: every internal link points at a real route, every image reference exists.
// With CHECK_URL set (e.g. http://localhost:3000) it also requests each live page.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();
const walk = async (dir) => {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
};

const appFiles = await walk(path.join(root, 'app'));
const routes = new Set(
  appFiles
    .filter((file) => /[\\/]page\.jsx$/.test(file))
    .map((file) => '/' + path.relative(path.join(root, 'app'), path.dirname(file)).split(path.sep).join('/'))
    .map((route) => (route === '/.' ? '/' : route)),
);

const sources = [...appFiles, ...(await walk(path.join(root, 'components'))), ...(await walk(path.join(root, 'lib')))].filter((file) => /\.(jsx?|mjs)$/.test(file));

let links = 0;
let images = 0;
for (const file of sources) {
  const source = await fs.readFile(file, 'utf8');
  const hrefs = [...source.matchAll(/(?:href=["'`]|href:\s*["'`]|\],\s*\[?\s*["'`]|\['[^']+',\s*["'`])(\/[a-z0-9\-/]*)/gi)].map((match) => match[1]);
  for (const href of hrefs) {
    if (href === '/' || /^\/images\//.test(href)) continue;
    assert(routes.has(href.replace(/\/$/, '')), `Unknown route ${href} in ${path.relative(root, file)}`);
    links++;
  }
  for (const match of source.matchAll(/["'`](\/images\/[^"'`\s?#$]+)/g)) {
    await fs.access(path.join(root, 'public', match[1])).catch(() => assert.fail(`Missing image ${match[1]} in ${path.relative(root, file)}`));
    images++;
  }
}

// Catalogue data images.
for (const name of ['bicycle-catalog', 'site-collections']) {
  const text = await fs.readFile(path.join(root, 'data', `${name}.json`), 'utf8');
  for (const match of text.matchAll(/"(\/images\/[^"]+)"/g)) {
    await fs.access(path.join(root, 'public', match[1])).catch(() => assert.fail(`Missing image ${match[1]} in data/${name}.json`));
    images++;
  }
}

console.log(`Passed: ${routes.size} routes, ${links} internal links, ${images} image references.`);

if (process.env.CHECK_URL) {
  for (const route of routes) {
    const response = await fetch(process.env.CHECK_URL + route);
    assert.equal(response.status, 200, route);
    assert((await response.text()).includes('id="main"'), `Missing layout on ${route}`);
  }
  const invalid = await fetch(process.env.CHECK_URL + '/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
  assert.equal(invalid.status, 400);
  const legacy = await fetch(process.env.CHECK_URL + '/about-us.php', { redirect: 'manual' });
  assert.equal(legacy.status, 308);
  const oldPage = await fetch(process.env.CHECK_URL + '/mtb-carriers2', { redirect: 'manual' });
  assert.equal(oldPage.status, 307);
  const missing = await fetch(process.env.CHECK_URL + '/does-not-exist');
  assert.equal(missing.status, 404);
  console.log('Passed: live pages, legacy redirects, 404, enquiry validation.');
}
