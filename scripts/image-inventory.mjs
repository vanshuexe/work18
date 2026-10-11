import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const refs=new Set();
const files=['components/Header.jsx','components/Footer.jsx',...(await fs.readdir('components/pages')).map(f=>'components/pages/'+f),'app/legacy.css','app/globals.css'];
for(const file of files){const source=(await fs.readFile(file,'utf8')).replace(/\{\/\*[\s\S]*?\*\/\}/g,'');for(const match of source.matchAll(/(?:src=|href=|url\()\s*["'](\/images\/[^"')?#]+)/g))refs.add(match[1]);}
const inventory=[];
for(const url of [...refs].sort()){
  const source=path.resolve('public'+url);const meta=await sharp(source).metadata();
  if(meta.width<40||meta.height<20||url.includes('/prettyPhoto/'))continue;
  inventory.push({id:inventory.length,url,source,width:meta.width,height:meta.height,alpha:!!meta.hasAlpha,target:'/images/recreated/'+url.slice('/images/'.length).replace(/\.[^.]+$/,'.png')});
}
await fs.mkdir('output/image-recreation/references',{recursive:true});
await fs.writeFile('output/image-recreation/inventory.json',JSON.stringify(inventory,null,2));
for(let start=0;start<inventory.length;start+=24){
 const batch=inventory.slice(start,start+24);const tiles=[];
 for(let j=0;j<batch.length;j++){
  const item=batch[j];const x=(j%4)*300,y=Math.floor(j/4)*200;
  const thumb=await sharp(item.source).resize(290,164,{fit:'contain',background:'#f3f3f3'}).png().toBuffer();
  tiles.push({input:thumb,left:x+5,top:y});
  const label=Buffer.from(`<svg width="300" height="36"><rect width="300" height="36" fill="white"/><text x="5" y="16" font-family="Arial" font-size="11">${item.id}: ${path.basename(item.url).replaceAll('&','&amp;')}</text><text x="5" y="31" font-family="Arial" font-size="10">${item.width} × ${item.height}</text></svg>`);
  tiles.push({input:label,left:x,top:y+164});
 }
 await sharp({create:{width:1200,height:Math.ceil(batch.length/4)*200,channels:3,background:'#fff'}}).composite(tiles).png().toFile(`output/image-recreation/references/sheet-${Math.floor(start/24)}.png`);
}
console.log(JSON.stringify({count:inventory.length,sheets:Math.ceil(inventory.length/24),inventory},null,2));
