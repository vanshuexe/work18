'use client';
import { useEffect, useState } from 'react';
export default function EnquiryForm() {
  const [status,setStatus]=useState('');
  const [busy,setBusy]=useState(false);
  const [productCode,setProductCode]=useState('');
  useEffect(()=>{const params=new URLSearchParams(window.location.search);const code=params.get('product')||'';const item=(params.get('item')||'').slice(0,200);if(/^(?:DX-)?HCI-\d+[A-Z]?$/.test(code))setProductCode(code);else if(item)setProductCode(item);},[]);
  async function submit(event){
    event.preventDefault(); setBusy(true); setStatus('');
    const form=event.currentTarget;
    const data=Object.fromEntries(new FormData(form));
    if(productCode)data.query=`Product: ${productCode}\n\n${data.query}`;
    try{const res=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const result=await res.json();setStatus(result.message);if(res.ok)form.reset();}catch{setStatus('Unable to send. Please email dsm@harison.in or call +91 161 5071011.');}finally{setBusy(false);}
  }
  return <form onSubmit={submit} className="enquiry-form">
    {productCode&&<p className="selected-product">Product enquiry: <strong>{productCode}</strong></p>}
    { [['name','Name','text',true],['email','E-mail Address','email',true],['address','Address','text',false],['tel','Telephone','tel',true],['company-name','Company Name','text',false]].map(([name,label,type,required])=><div className="form-group" key={name}><label htmlFor={`enquiry-${name}`}>{label}{required?' *':''}</label><input className="form-control" id={`enquiry-${name}`} name={name} type={type} required={required} maxLength={250}/></div>) }
    <div className="form-group"><label htmlFor="enquiry-message">Message *</label><textarea className="form-control" name="query" id="enquiry-message" rows={5} required maxLength={5000}/></div>
    <div className="form-trap" aria-hidden="true"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <button className="dee" disabled={busy} type="submit">{busy?'Sending…':'Submit'}</button> <button className="dee" type="reset" onClick={()=>setStatus('')}>Clear Form</button>
    <p role="status" className="form-status">{status}</p>
    <p>Or email <a href="mailto:dsm@harison.in">dsm@harison.in</a>.</p>
  </form>;
}
