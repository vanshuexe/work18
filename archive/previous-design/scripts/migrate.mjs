import fs from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';
import HTMLtoJSX from 'htmltojsx';

const origin = 'https://harison.in/';
const slugs = ['about-us','news-events','bicycle-parts','carriers','stands','frame','forks','accessories','two-wheeler-parts','side-stands','center-stands','side-hooks','footrest','cargo-bike-parts','kick-scooty-parts','infrastructure','quality','contact-us','enquiry'];
const assets = new Map();
const converter = new HTMLtoJSX({ createClass: false });
await fs.mkdir('components/pages', { recursive: true });
await fs.mkdir('data', { recursive: true });
await fs.mkdir('app', { recursive: true });
function localAsset(value) {
  if (!value || /^(data:|#)/.test(value)) return value;
  const url = new URL(value, origin);
  if (url.origin !== new URL(origin).origin) return url.href;
  const local = '/' + url.pathname.replace(/^\/+/, '');
  assets.set(url.href, 'public' + local);
  return local;
}
function localLink(value) {
  if(value==='#.php')return '#';
  if (!value || value.startsWith('#') || /^(mailto:|tel:|javascript:)/.test(value)) return value;
  const url = new URL(value, origin);
  if (url.origin !== new URL(origin).origin) return value;
  let slug = url.pathname.replace(/^\/+|\.(php|html)$/g, '');
  if (slug === 'side-stand') slug = 'side-stands';
  if (slug === 'footrests') slug = 'footrest';
  return (slug === 'index' || !slug ? '/' : '/' + slug) + url.search + url.hash;
}
const titles = {};
for (let pageIndex=-1;pageIndex<slugs.length;pageIndex++) {
  const slug=pageIndex===-1?'home':slugs[pageIndex];
  const raw = slug === 'home' ? await fs.readFile('index.html', 'utf8') : await fs.readFile(`data/${slug}.source.html`,'utf8').catch(()=>fetch(origin + slug + '.php').then(r => { if (!r.ok) throw new Error(`${slug}: ${r.status}`); return r.text(); }));
  await fs.writeFile(`data/${slug}.source.html`, raw);
  const $ = load(raw);
  $('script,noscript,base').remove();
  $('*').each((_, el) => { for (const attr of Object.keys(el.attribs || {})) if (/^on/i.test(attr)) $(el).removeAttr(attr); });
  $('img').each((_, el) => { $(el).attr('src', localAsset($(el).attr('src'))); if (!$(el).attr('alt')) $(el).attr('alt', 'Harison International'); });
  $('a').each((_, el) => {
    const href=$(el).attr('href');
    if(href && !/^(mailto:|tel:|javascript:|#)/.test(href)) {
      const url=new URL(href,origin);
      const match=url.pathname.match(/^\/([a-z0-9-]+)\.php$/);
      if(url.origin===new URL(origin).origin && match && !['index','side-stand','footrests','formmail'].includes(match[1]) && !slugs.includes(match[1])) slugs.push(match[1]);
      if(url.origin===new URL(origin).origin && /\.(jpg|jpeg|png|webp)$/i.test(url.pathname))localAsset(href);
    }
    $(el).attr('href', localLink(href) || '#'); if ($(el).attr('target') === '_blank') $(el).attr('rel', 'noopener noreferrer');
  });
  $('[style]').each((_, el) => { $(el).attr('style', $(el).attr('style').replace(/url\(['"]?([^)'"\s]+)['"]?\)/g, (_, url) => `url(${localAsset(url)})`)); });
  $('iframe').attr('loading', 'lazy').attr('title', 'Harison International location');
  $('form').replaceWith('<div data-enquiry-placeholder></div>');
  const body = $('body');
  if (slug === 'home') {
    const header = $('header').first();
    await fs.writeFile('components/Header.jsx', `import Link from 'next/link';\nexport default function Header(){return (${converter.convert(header.toString()).replace(/<a(?=\s|>)/g,'<Link').replace(/<\/a>/g,'</Link>')});}\n`);
    const footer = $('footer').first();
    const copyright = $('#copyright').first();
    await fs.writeFile('components/Footer.jsx', `import Link from 'next/link';\nexport default function Footer(){return (<><footer>${converter.convert(footer.html() || '')}</footer>${converter.convert(copyright.toString())}</>);}\n`);
  }
  $('header,footer,#copyright,#back-to-top').remove();
  const wrapper = $('.body-inner').first();
  let html = wrapper.length ? wrapper.html() : body.html();
  html = html.replace(/<!--[\s\S]*?-->/g,'');
  let jsx = converter.convert(html);
  jsx = jsx.replace(/<div data-enquiry-placeholder(?:="")?\s*\/>/g,'<EnquiryForm />').replace(/<div data-enquiry-placeholder(?:="")?>\s*<\/div>/g,'<EnquiryForm />');
  jsx = jsx.replace(/<a(?=\s|>)/g,'<Link').replace(/<\/a>/g,'</Link>');
  await fs.writeFile(`components/pages/${slug}.jsx`, `import Link from 'next/link';\nimport EnquiryForm from '../EnquiryForm';\nexport default function PageContent(){return (${jsx});}\n`);
  titles[slug] = slug === 'home' ? 'Harison International' : ($('h1,h2').first().text().trim() || slug.replaceAll('-', ' '));
  console.log('Converted', slug);
}
let css = await fs.readFile('styles.css','utf8');
// The cloned CSS records each stylesheet's URL, allowing relative assets to resolve correctly.
let base = origin;
css = css.split(/(?=\/\* ===== https?:)/).map(part => {
  const match = part.match(/^\/\* ===== (https?:\S+) =====/);
  if (match) base = match[1];
  return part.replace(/url\(\s*(['"]?)([^)'"\s]+)\1\s*\)/g, (_, quote, value) => `url("${localAsset(new URL(value, base).href)}")`);
}).join('');
css=css.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\*\//g,'').replace(/@import[^;]+;/g,'').replace(/@charset[^;]+;/g,'').replace(/\*[a-z-]+\s*:[^;{}]+;?/g,'');
await fs.writeFile('app/legacy.css', css);
await fs.writeFile('data/routes.json', JSON.stringify(titles, null, 2));
const imports = slugs.map((slug,i) => `import Page${i} from '../../components/pages/${slug}';`).join('\n');
await fs.mkdir('app/[slug]', {recursive:true});
await fs.writeFile('app/[slug]/page.jsx', `import { notFound } from 'next/navigation';\nimport titles from '../../data/routes.json';\n${imports}\nconst pages={${slugs.map((s,i)=>`${JSON.stringify(s)}:Page${i}`).join(',')}};\nexport function generateStaticParams(){return Object.keys(pages).map(slug=>({slug}));}\nexport async function generateMetadata({params}){const {slug}=await params; return {title:titles[slug] ? titles[slug]+' | Harison International' : 'Page not found'};}\nexport default async function Page({params}){const {slug}=await params; const Content=pages[slug]; if(!Content) notFound(); return <Content/>;}\n`);
let failures=[];
const queue=[...assets];
let cursor=0;
await Promise.all(Array.from({length:8},async()=>{
  while(cursor<queue.length){const [url,file]=queue[cursor++]; try {try{await fs.access(file);continue;}catch{}const r=await fetch(url,{signal:AbortSignal.timeout(20000)});if(!r.ok) throw new Error(String(r.status));await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,Buffer.from(await r.arrayBuffer()));}catch(e){failures.push({url,file,error:e.message});}}
}));
await fs.writeFile('data/asset-report.json', JSON.stringify({total:assets.size,failures},null,2));
console.log('Assets:', assets.size, 'Missing:', failures.length);
await import('./repair-assets.mjs');
try { await fs.access('output/image-recreation/generated.json'); await import('./install-recreated-images.mjs'); } catch(error) { if(error.code!=='ENOENT')throw error; }
