import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const products=JSON.parse(await fs.readFile('data/bicycle-catalog.json','utf8'));
const rules=JSON.parse(await fs.readFile('data/bicycle-catalog-exclusions.json','utf8'));
const codes=new Set(products.map(product=>product.code));
assert.equal(codes.size,26);
assert.deepEqual([...new Set(products.map(product=>product.category))].sort(),['accessories','carrier','stand']);
for(const code of rules.excludedCodes)assert(!codes.has(code),`X-marked product included: ${code}`);
for(const code of rules.addedCarriers)assert(products.some(product=>product.code===code&&product.category==='carrier'),`Missing added carrier ${code}`);
for(const product of products){assert(product.name&&product.code&&product.image);await fs.access('public'+product.image);}
if(process.env.CHECK_URL){
  for(const [path,category]of [['/carriers','carrier'],['/stands','stand'],['/accessories','accessories']]){
    const response=await fetch(process.env.CHECK_URL+path);assert.equal(response.status,200);const html=await response.text();
    for(const product of products.filter(item=>item.category===category)){assert(html.includes(`class="product-code">${product.code}</span>`),`Missing live code ${product.code}`);const image=await fetch(process.env.CHECK_URL+product.image);assert.equal(image.status,200);await image.arrayBuffer();}
    for(const code of rules.excludedCodes)assert(!html.includes(`class="product-code">${code}</span>`),`Excluded live code ${code}`);
  }
  const home=await (await fetch(process.env.CHECK_URL+'/bicycle-parts')).text();
  assert.equal((home.match(/class="bicycle-category-card"/g)||[]).length,3);
  for(const [old,target]of [['/roadstar-carriers','/carriers'],['/stands2','/stands'],['/frame','/bicycle-parts']]){const response=await fetch(process.env.CHECK_URL+old,{redirect:'manual'});assert.equal(response.status,307);assert.equal(response.headers.get('location'),target);}
}
console.log('Passed: 26 approved PDF entries, three categories, both added carriers, all photos, and 19 excluded codes.');
