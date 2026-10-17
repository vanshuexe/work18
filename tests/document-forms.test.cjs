const {test, before, after} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const api = require('../lib/api.cjs');
const {validateInquiry} = require('../lib/submissions.cjs');
const definitions = require('../config/inquiries');
const client = {company:'Example Engineering',companyType:'Private Limited',yearEstablished:'2018',address:'Industrial Estate',city:'Pune',state:'Maharashtra',pinCode:'411001',name:'Purchasing Contact',designation:'Purchase Manager',phone:'9876543210',countryCode:'+91',industry:'Engineering & Manufacturing',products:['Epoxy Coating','Industrial Thinner'],application:'Fabricated steel',monthlyConsumption:'1,000–3,000 Litres'};
const vendor = {company:'Example Supplier',name:'Supplier Contact',phone:'9876543210',email:'supplier@example.com',cityState:'Pune, Maharashtra',yearEstablished:'2010',supplyCategory:['Resins','Pigments']};
let folder;
const previous = process.env.STORAGE_DIR;
before(()=>{folder=fs.mkdtempSync(path.join(os.tmpdir(),'aeropolish-doc-forms-'));process.env.STORAGE_DIR=folder;});
after(()=>{if(previous===undefined)delete process.env.STORAGE_DIR;else process.env.STORAGE_DIR=previous;fs.rmSync(folder,{recursive:true,force:true});});
function submit(type,body) {
 return api.post(new Request(`http://localhost/api/inquiries/${type}`,{method:'POST',...(body instanceof FormData ? {body} : {headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})}),['inquiries',type]);
}
function form(values) {const result=new FormData();for(const [key,value] of Object.entries(values))for(const item of Array.isArray(value)?value:[value])result.append(key,item);return result;}
test('client accepts optional email, preserves multiple products and independent phone codes',async()=>{
 const response=await submit('client',form({...client,whatsapp:'1234567890',whatsappCountryCode:'+44'}));
 assert.equal(response.status,201,JSON.stringify(await response.json()));
 const saved=JSON.parse(fs.readFileSync(path.join(folder,'client-inquiries.json')))[0];
 assert.deepEqual(saved.products,client.products);
 assert.equal(saved.email,'');assert.equal(saved.countryCode,'+91');assert.equal(saved.whatsappCountryCode,'+44');
});
test('client rejects missing required selections, invalid PIN/year, and missing Other details',()=>{
 for(const change of [{products:[]},{products:['Unknown']},{pinCode:'123'},{yearEstablished:'2999'},{yearEstablished:'2015.5'},{companyType:'Other'}])assert.ok(validateInquiry(definitions.client,{...client,...change}).errors.length,JSON.stringify(change));
 assert.deepEqual(validateInquiry(definitions.client,{...client,products:['Other'],productsOther:'Special coating'}).errors,[]);
});
test('vendor multipart submission stores all three documents privately with selected supplies',async()=>{
 const body=form(vendor);
 body.set('catalogue',new File(['%PDF-1.7 test catalogue'],'catalogue.pdf',{type:'application/pdf'}));
 body.set('companyProfile',new File(['word fixture'],'profile.docx'));
 body.set('gstCertificate',new File(['image fixture'],'gst.png'));
 assert.equal((await submit('vendor',body)).status,201);
 const saved=JSON.parse(fs.readFileSync(path.join(folder,'vendor-inquiries.json')))[0];
 assert.deepEqual(saved.supplyCategory,['Resins','Pigments']);assert.equal(saved.attachments.length,3);
 for(const attachment of saved.attachments){assert.ok(attachment.file.startsWith('vendor-documents/'));assert.equal(fs.statSync(path.join(folder,attachment.file)).size,attachment.size);}
});
test('bad vendor uploads and duplicate files are rejected without saving records or attachments',async()=>{
 const recordPath=path.join(folder,'vendor-inquiries.json');
 const initialRecords=fs.readFileSync(recordPath,'utf8');
 const initialFiles=fs.readdirSync(path.join(folder,'vendor-documents'));
 for(const file of [new File(['bad'],'malware.exe'),new File([],'empty.pdf'),new File([new Uint8Array(5*1024*1024+1)],'large.pdf')]){
  const body=form(vendor);body.set('catalogue',file);assert.equal((await submit('vendor',body)).status,400);
 }
 const duplicate=form(vendor);duplicate.append('catalogue',new File(['a'],'a.pdf'));duplicate.append('catalogue',new File(['b'],'b.pdf'));
 assert.equal((await submit('vendor',duplicate)).status,400);
 assert.equal(fs.readFileSync(recordPath,'utf8'),initialRecords);assert.deepEqual(fs.readdirSync(path.join(folder,'vendor-documents')),initialFiles);
});
test('native URL encoded forms preserve repeated selections',async()=>{
 const values=new URLSearchParams();for(const [key,value]of Object.entries(client))for(const item of Array.isArray(value)?value:[value])values.append(key,item);
 const response=await api.post(new Request('http://localhost/api/inquiries/client',{method:'POST',body:values}),['inquiries','client']);assert.equal(response.status,201);
 const saved=JSON.parse(fs.readFileSync(path.join(folder,'client-inquiries.json'))).at(-1);assert.deepEqual(saved.products,client.products);
});
