import fs from 'node:fs/promises';
const clean=text=>text.replace(/<br\s*\/?\s*>/g,' · ').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const groups={'side-stands':['side-stands','side-stands2','side-stands3','side-stands4'],'center-stands':['center-stands','center-stands2'],'side-hooks':['side-hooks'],'footrest':['footrest'],'cargo-bike-parts':['cargo-bike-parts'],'kick-scooty-parts':['kick-scooty-parts'],'infrastructure':['infrastructure','infrastructure2']};
const data={};
for(const [key,pages] of Object.entries(groups)){
 data[key]=[];
 for(const page of pages){const source=await fs.readFile(`components/pages/${page}.jsx`,'utf8');for(const match of source.matchAll(/<figure[^>]*>([\s\S]*?)<\/figure>\s*<div className="portfolio-static-desc">([\s\S]*?)<\/div>/g)){
 const image=match[1].match(/src="([^"]+)"/)?.[1];const name=clean(match[2].match(/<h3>([\s\S]*?)<\/h3>/)?.[1]||'Component');const description=clean(match[2].match(/<p>([\s\S]*?)<\/p>/)?.[1]||'');const code=clean(match[1].match(/className="tag">([^<]+)</)?.[1]||'');
 if(image&&!data[key].some(item=>item.image===image)){await fs.access('public'+image);data[key].push({name,description,code,image});}
 }}
}
if(Object.values(data).some(items=>!items.length))throw new Error('Legacy layouts are no longer present. Keep the existing site-collections.json; do not overwrite it.');
await fs.writeFile('data/site-collections.json',JSON.stringify(data,null,2)+'\n');
console.log(Object.fromEntries(Object.entries(data).map(([key,items])=>[key,items.length])));
