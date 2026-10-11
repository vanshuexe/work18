import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const dir='C:/Users/vansh/.codex/generated_images/01a1260f-50d8-7f20-a145-6505ad216992';
const complete=JSON.parse(await fs.readFile('output/image-recreation/generated.json','utf8'));
const used=new Set(complete.map(r=>path.basename(r.path)));
const completedTimes=await Promise.all(complete.filter(r=>r.path.replaceAll('\\','/').startsWith(dir)).map(async r=>(await fs.stat(r.path)).mtimeMs));
const boundary=Math.max(...completedTimes);
used.add('exec-d6e1ca0f-2e97-4b99-969e-f03c52e1bc94.png');
used.add('exec-'+ 'e199dfb1-6cbe-4feb-969c-51d873d8074d.png');
const orphan=[];
for(const name of await fs.readdir(dir)){
 if(used.has(name)||!name.endsWith('.png'))continue;
 const stat=await fs.stat(path.join(dir,name));
 // Ignore abandoned blank typography generation and prior known outputs.
 if(stat.mtimeMs <= boundary)continue;
 orphan.push({name,path:path.join(dir,name),time:stat.mtime.toISOString()});
}
orphan.sort((a,b)=>a.time.localeCompare(b.time));
await fs.writeFile('output/image-recreation/orphans.json',JSON.stringify(orphan,null,2));
await fs.mkdir('output/image-recreation/recovery',{recursive:true});
for(let start=0;start<orphan.length;start+=24){
 const batch=orphan.slice(start,start+24),tiles=[];
 for(let j=0;j<batch.length;j++){
  const item=batch[j],x=j%4*300,y=Math.floor(j/4)*200;
  const input=await sharp(item.path).resize(290,164,{fit:'contain',background:'#eee'}).png().toBuffer();tiles.push({input,left:x+5,top:y});
  const label=Buffer.from(`<svg width="300" height="36"><text x="8" y="20" font-family="Arial" font-size="13">Recovery ${start+j}</text></svg>`);tiles.push({input:label,left:x,top:y+164});
 }
 await sharp({create:{width:1200,height:Math.ceil(batch.length/4)*200,channels:3,background:'#fff'}}).composite(tiles).png().toFile(`output/image-recreation/recovery/sheet-${Math.floor(start/24)}.png`);
}
console.log(JSON.stringify({count:orphan.length,first:orphan[0],last:orphan.at(-1)},null,2));
