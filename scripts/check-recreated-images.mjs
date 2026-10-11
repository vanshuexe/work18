import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const manifest=JSON.parse(await fs.readFile('output/image-recreation/inventory.json','utf8'));
const results=JSON.parse(await fs.readFile('output/image-recreation/generated.json','utf8'));
const ids=new Set(results.map(r=>r.id));
assert.equal(ids.size,manifest.length,'Not all images have been recreated');
const files=['components/Header.jsx','components/Footer.jsx',...(await fs.readdir('components/pages')).map(f=>'components/pages/'+f),'app/legacy.css','app/globals.css','app/layout.jsx'];
const source=(await Promise.all(files.map(f=>fs.readFile(f,'utf8')))).join('\n').replace(/\{\/\*[\s\S]*?\*\/\}/g,'');
for(const item of manifest){
  assert(ids.has(item.id),`Missing result ${item.url}`);
  const meta=await sharp('public'+item.target).metadata();
  assert.equal(meta.width,item.width,item.target+' width');assert.equal(meta.height,item.height,item.target+' height');
  const stats=await sharp('public'+item.target).stats();
  assert(stats.channels.some(c=>c.max>0),`Empty image: ${item.target}`);
  assert(!source.includes('"'+item.url+'"')&&!source.includes("'"+item.url+"'"),`Original still referenced: ${item.url}`);
  if(process.env.CHECK_URL){const response=await fetch(process.env.CHECK_URL+item.target);assert.equal(response.status,200,item.target);assert(response.headers.get('content-type')?.startsWith('image/'),item.target+' MIME type');assert((await response.arrayBuffer()).byteLength>0,item.target+' response body');}
}
console.log(`Passed: all ${manifest.length} recreated assets exist, are nonempty, retain dimensions, and replace original page references.`);
