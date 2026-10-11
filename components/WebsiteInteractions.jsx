'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
export default function WebsiteInteractions(){
  const pathname=usePathname();
  const [preview,setPreview]=useState(null);
  useEffect(()=>{
    document.querySelectorAll('nav a').forEach(a=>{if(a.getAttribute('href')===pathname)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    const nav=document.querySelector('nav.navbar-collapse');
    nav?.classList.remove('in');
    const toggle=document.querySelector('.navbar-toggle');
    toggle?.setAttribute('aria-expanded','false');
    const slides=[...document.querySelectorAll('.flexslider .slides > li')];
    let current=0;
    const show=i=>{current=(i+slides.length)%slides.length;slides.forEach((slide,index)=>{slide.classList.toggle('slide-active',index===current);slide.setAttribute('aria-hidden',String(index!==current));});};
    let timer;
    let controls;
    if(slides.length){show(0);timer=setInterval(()=>show(current+1),6000);controls=document.createElement('div');controls.className='slide-controls';for(const [label,step] of [['Previous slide',-1],['Next slide',1]]){const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',label);button.textContent=step<0?'‹':'›';button.onclick=()=>{clearInterval(timer);show(current+step);};controls.append(button);}document.querySelector('.flexslider')?.append(controls);}
    function click(event){
      if(!(event.target instanceof Element))return;
      if(event.target.closest('.navbar-toggle')){const open=nav?.classList.toggle('in');toggle?.setAttribute('aria-expanded',String(Boolean(open)));}
      const dropdown=event.target.closest('a.dropdown-toggle');
      if(dropdown){event.preventDefault();const parent=dropdown.parentElement;const open=parent.classList.toggle('open');dropdown.setAttribute('aria-expanded',String(open));}
      const gallery=event.target.closest('a[href]');
      if(gallery && /\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(gallery.getAttribute('href'))){event.preventDefault();setPreview({src:gallery.getAttribute('href'),alt:gallery.querySelector('img')?.alt||gallery.title||'Product image'});}
    }
    document.addEventListener('click',click,true);
    return ()=>{clearInterval(timer);controls?.remove();document.removeEventListener('click',click,true);};
  },[pathname]);
  useEffect(()=>{if(!preview)return;const before=document.activeElement;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';document.querySelector('.image-dialog button')?.focus();function key(e){if(e.key==='Escape')setPreview(null);if(e.key==='Tab')e.preventDefault();}document.addEventListener('keydown',key);return()=>{document.body.style.overflow=overflow;document.removeEventListener('keydown',key);before?.focus?.();};},[preview]);
  return <><button className="back-top" aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑</button>{preview&&<div className="image-dialog" role="dialog" aria-modal="true" aria-label={preview.alt} onClick={()=>setPreview(null)}><button type="button" aria-label="Close image preview" onClick={()=>setPreview(null)}>×</button><img src={preview.src} alt={preview.alt} onClick={e=>e.stopPropagation()}/></div>}</>;
}
