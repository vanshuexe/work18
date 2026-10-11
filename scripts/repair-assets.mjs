import fs from 'node:fs/promises';
const report=JSON.parse(await fs.readFile('data/asset-report.json','utf8'));
const missing=new Set(report.failures.map(f=>'/'+f.file.replace(/^public\//,'')));
for(const file of await fs.readdir('components/pages')){
  const name='components/pages/'+file;let jsx=await fs.readFile(name,'utf8');
  for(const asset of missing)jsx=jsx.replaceAll(asset,'/images/product-unavailable.svg');
  await fs.writeFile(name,jsx);
}
let css=await fs.readFile('app/legacy.css','utf8');
css=css.replace(/url\("(\/[^"?#]+)(?:[^"\)]*)"\)/g,(full,url)=>missing.has(url)?'url("/images/product-unavailable.svg")':full);
await fs.writeFile('app/legacy.css',css);
