import fs from 'node:fs/promises';
import sharp from 'sharp';
const manifest=JSON.parse(await fs.readFile('output/image-recreation/inventory.json','utf8'));
const results=JSON.parse(await fs.readFile('output/image-recreation/generated.json','utf8')).sort((a,b)=>a.id-b.id);
await fs.mkdir('output/image-recreation/previews',{recursive:true});
for(let start=0;start<results.length;start+=24){
 const batch=results.slice(start,start+24),tiles=[];
 for(let j=0;j<batch.length;j++){
  const result=batch[j],item=manifest.find(x=>x.id===result.id),x=(j%4)*300,y=Math.floor(j/4)*200;
  const background=[63,99,207,208,209,219,220].includes(item.id)?'#303030':'#f3f3f3';
  const thumb=await sharp(result.path).flatten({background}).resize(290,164,{fit:'contain',background}).png().toBuffer();tiles.push({input:thumb,left:x+5,top:y});
  const label=Buffer.from(`<svg width="300" height="36"><rect width="300" height="36" fill="white"/><text x="5" y="20" font-family="Arial" font-size="11">${item.id}: ${item.url.split('/').pop().replaceAll('&','&amp;')}</text></svg>`);tiles.push({input:label,left:x,top:y+164});
 }
 await sharp({create:{width:1200,height:Math.ceil(batch.length/4)*200,channels:3,background:'#fff'}}).composite(tiles).png().toFile(`output/image-recreation/previews/sheet-${Math.floor(start/24)}.png`);
}
console.log('Preview sheets created:',Math.ceil(results.length/24));
