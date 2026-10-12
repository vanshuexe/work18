'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function CatalogProducts({items,title}) {
  const [query,setQuery]=useState('');
  const [finish,setFinish]=useState('all');
  const finishes=[...new Set(items.map(item=>item.finish).filter(Boolean))];
  const visible=items.filter(item=>`${item.code||''} ${item.name} ${item.size||''} ${item.description||''}`.toLowerCase().includes(query.trim().toLowerCase())&&(finish==='all'||item.finish===finish));
  return <div className="catalog-results">
    <div className="catalog-tools"><label className="catalog-search"><span>Find a component</span><input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search name, code or wheel size…"/></label>{finishes.length>1&&<label className="catalog-finish"><span>Finish</span><select value={finish} onChange={event=>setFinish(event.target.value)}><option value="all">All finishes</option>{finishes.map(value=><option key={value}>{value}</option>)}</select></label>}</div>
    <div className="catalog-list-heading"><h2>{title} collection</h2><span role="status" aria-live="polite">{visible.length} of {items.length} products</span></div>
    {visible.length===0?<div className="catalog-empty"><h3>No matching components</h3><p>Try another name, product code or wheel size.</p><button type="button" onClick={()=>{setQuery('');setFinish('all');}}>Clear filters</button></div>:<div className="bicycle-product-grid">{visible.map(item=><article className="bicycle-product-card" key={item.image}><Link className="bicycle-product-photo" href={item.image} aria-label={`Enlarge ${item.name}${item.code?', '+item.code:''}`}><img src={item.image} alt={`${item.name}${item.code?' — '+item.code:''}`} loading="lazy"/><span className="photo-zoom" aria-hidden="true">↗</span></Link><div className="bicycle-product-info">{item.code&&<span className="product-code">{item.code}</span>}<h3>{item.name}</h3><dl>{item.finish&&<><dt>Finish</dt><dd>{item.finish}</dd></>}{item.size&&<><dt>Size</dt><dd>{item.size}</dd></>}</dl>{(item.info||item.description)&&<p className="product-note">{item.info||item.description}</p>}<Link className="product-enquiry" href={item.code?.match(/^(?:DX-)?HCI-/)?`/enquiry?product=${encodeURIComponent(item.code)}`:`/enquiry?item=${encodeURIComponent(item.name+' '+(item.code||item.description||''))}`}>Enquire about this product <span aria-hidden="true">↗</span></Link></div></article>)}</div>}
  </div>;
}
