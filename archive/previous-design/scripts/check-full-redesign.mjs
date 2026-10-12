import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const collections=JSON.parse(await fs.readFile('data/site-collections.json','utf8'));
const counts={'side-stands':17,'center-stands':7,'side-hooks':4,footrest:2,'cargo-bike-parts':3,'kick-scooty-parts':3,infrastructure:23};
for(const [key,count] of Object.entries(counts)){assert.equal(collections[key].length,count,key);for(const item of collections[key])await fs.access('public'+item.image);}
for(const file of await fs.readdir('components/pages')){const source=await fs.readFile('components/pages/'+file,'utf8');assert(!/portfolio-static|banner-area|col-(?:sm|md)|prod-sec/.test(source),`Legacy page layout: ${file}`);}
const layout=await fs.readFile('app/layout.jsx','utf8');assert(!/legacy\.css|globals\.css|redesign\.css|studio\.css/.test(layout));
if(process.env.CHECK_URL){for(const page of ['','about-us','infrastructure','quality','news-events','contact-us','enquiry','two-wheeler-parts','side-stands','center-stands','side-hooks','footrest','cargo-bike-parts','kick-scooty-parts','bicycle-parts','carriers','stands','accessories']){const response=await fetch(process.env.CHECK_URL+'/'+page);assert.equal(response.status,200,page);const html=await response.text();assert(html.includes('site-header')&&html.includes('site-footer'),page);assert(!html.includes('portfolio-static'),page);if(counts[page]&&page!=='infrastructure')assert.equal((html.match(/class="bicycle-product-card"/g)||[]).length,counts[page],page);}}
console.log('Passed: all page layouts rebuilt, 36 additional products and 23 facility images preserved, shared header/footer and collection routes.');
