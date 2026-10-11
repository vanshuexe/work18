import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const id=Number(process.argv[2]);
const manifest=JSON.parse(await fs.readFile('output/image-recreation/inventory.json','utf8'));
const result=JSON.parse(await fs.readFile(`output/image-recreation/results/${id}.json`,'utf8'));
const item=manifest.find(x=>x.id===id);
const target=path.resolve('public'+item.target);
await fs.mkdir(path.dirname(target),{recursive:true});
await sharp(result.path).resize(item.width,item.height,{fit:'fill'}).png({compressionLevel:9}).toFile(target);
const files=['components/Header.jsx','components/Footer.jsx',...(await fs.readdir('components/pages')).map(f=>'components/pages/'+f),'app/legacy.css','app/globals.css','app/layout.jsx'];
for(const file of files){const source=await fs.readFile(file,'utf8');const next=source.replaceAll(item.url,item.target);if(next!==source)await fs.writeFile(file,next);}
console.log('Installed recreated image',id);
