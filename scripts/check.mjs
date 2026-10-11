import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const routes=JSON.parse(await fs.readFile('data/routes.json','utf8'));
let links=0,images=0;
for(const file of [...(await fs.readdir('components/pages')).map(f=>'components/pages/'+f),'components/Header.jsx','components/Footer.jsx']){
  const source=(await fs.readFile(file,'utf8')).replace(/\{\/\*[\s\S]*?\*\/\}/g,'');
  for(const match of source.matchAll(/href="(\/[^"?#]*)/g)){
    const href=match[1];
    if(/\.[a-z0-9]+$/i.test(href)){await fs.access('public'+href);}else{assert(href==='/'||routes[href.slice(1)],`Missing route ${href} in ${file}`);links++;}
  }
  const imagePaths=new Set([...source.matchAll(/(?:["']|url\()(\/images\/[^"')\s?#]+)/g)].map(match=>match[1]));
  for(const imagePath of imagePaths){await fs.access('public'+imagePath);images++;}
  for(const match of source.matchAll(/href:\s*['"](\/[^'"?#]*)/g)){assert(routes[match[1].slice(1)],`Missing category route ${match[1]} in ${file}`);links++;}
  assert(!/href="[^"]*\.php/.test(source),`Legacy link in ${file}`);
}
console.log(`Passed: ${Object.keys(routes).length} pages, ${links} internal links, ${images} local image references.`);
if(process.env.CHECK_URL){
  for(const route of Object.keys(routes)){
    const url=process.env.CHECK_URL+(route==='home'?'/':'/'+route);
    const response=await fetch(url);assert.equal(response.status,200,url);
    const html=await response.text();assert(html.includes('main-content'),`Missing layout ${url}`);
  }
  const invalid=await fetch(process.env.CHECK_URL+'/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});assert.equal(invalid.status,400);
  const legacy=await fetch(process.env.CHECK_URL+'/about-us.php',{redirect:'manual'});assert.equal(legacy.status,308);
  const missing=await fetch(process.env.CHECK_URL+'/does-not-exist');assert.equal(missing.status,404);
  console.log('Passed: all live pages, PHP redirects, 404 response, enquiry validation.');
}
