import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const manifest=JSON.parse(await fs.readFile('output/image-recreation/inventory.json','utf8'));
const saved=JSON.parse(await fs.readFile('output/image-recreation/generated.json','utf8'));
const resultMap=new Map(saved.map(r=>[r.id,r]));
for(const name of await fs.readdir('output/image-recreation/results').catch(()=>[])){
  if(!name.endsWith('.json'))continue;
  const record=JSON.parse(await fs.readFile('output/image-recreation/results/'+name,'utf8'));resultMap.set(record.id,record);
}
const results=[...resultMap.values()].sort((a,b)=>a.id-b.id);
await fs.writeFile('output/image-recreation/generated.json',JSON.stringify(results,null,2));
for(const result of results){
  const item=manifest.find(x=>x.id===result.id);
  const target=path.resolve('public'+item.target);
  await fs.mkdir(path.dirname(target),{recursive:true});
  await sharp(result.path).resize(item.width,item.height,{fit:'fill'}).png({compressionLevel:9}).toFile(target);
}
const files=['components/Header.jsx','components/Footer.jsx',...(await fs.readdir('components/pages')).map(f=>'components/pages/'+f),'app/legacy.css','app/globals.css'];
for(const file of files){let source=await fs.readFile(file,'utf8');for(const result of results){const item=manifest.find(x=>x.id===result.id);source=source.replaceAll(item.url,item.target);}await fs.writeFile(file,source);}
console.log(`Installed ${results.length} recreated images and updated all page references.`);
