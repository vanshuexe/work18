import fs from 'node:fs/promises';
const dir='components/pages';
const categoryArt={
  'kids.png':'products/kids/tiddy.png',
  'ladies.png':'products/ladies/queen-miss-india.png',
  'mtb.png':'products/mtb/wild-fire.png',
  'welded.png':'products/welded/bull-power.png',
  'roadstar.png':'products/roadstar-carrier/channel-patti.png',
  'european-s.png':'products/european/euro-1.png',
  'hi-end.png':'products/hi-end/hi-end1.png',
  'e-bike.png':'products/e-bike1.png',
  'carrier-p.png':'products/roadstar-carrier/channel-patti.png',
  'stand-p.png':'products/stands/bb-193a.png',
  'frame-p.png':'products/frame/frame5.png',
  'forks-p.png':'products/fork/fork-mtb.png',
  'access.png':'products/accessories1.png',
  'footrest-p.png':'products/footrest1.png',
  'side-stand-p.png':'autopart/side-stand/side-stand-1.png',
  'center-stand-p.png':'autopart/center-stand/center-stand-1.png',
  'side-hook-p.png':'autopart/side-hook/side-hook1.png',
};
for(const name of await fs.readdir(dir)){
  if(name==='home.jsx')continue;
  let source=await fs.readFile(dir+'/'+name,'utf8');
  source=source.replace(/\sclassName(?=[\s>])/g,'');
  source=source.replace(/(<div id="banner-area">\s*)<img[^>]+\/>/g,'$1');
  source=source.replaceAll("background: 'url(/images/quality.jpg) 50% 50% / cover no-repeat'", "background: 'url(/images/brand/original-cycle-hero.webp) 50% 50% / cover no-repeat'");
  source=source.replaceAll('className="view icon-pentagon" data-rel','className="view icon-pentagon" aria-label="Enlarge product image" data-rel');
  source=source.replaceAll('className="link icon-pentagon" href','className="link icon-pentagon" aria-label="View product details" href');
  if(['carriers.jsx','bicycle-parts.jsx','two-wheeler-parts.jsx'].includes(name))for(const [before,after]of Object.entries(categoryArt))source=source.replaceAll('/images/recreated/'+before,'/images/recreated/'+after);
  await fs.writeFile(dir+'/'+name,source);
}
console.log('Refreshed inner banners, image reference and product actions.');
