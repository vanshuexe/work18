// Shared form definitions used by the UI and server validation.
const f = (name, label, type = 'text', required = false, extra = {}) => ({name,label,type,required,...extra});
const s = (name,label,options,required=false,extra={}) => f(name,label,'select',required,{options,allowOther:options.includes('Other'),...extra});
const m = (name,label,options,required=false) => f(name,label,'checkboxes',required,{options,wide:true,allowOther:options.includes('Other')});
const year = (label) => f('yearEstablished',label,'number',true,{min:1800,max:new Date().getFullYear(),step:1});
const q = (name,label) => f(name,label,'number',false,{min:0,step:'any'});
const group = (title,fields) => ({title,fields});
const clientSections = [
 group('01 — Company information',[
 f('company','Company / Business Name','text',true),
 s('companyType','Company Type',['Private Limited','Public Limited','Partnership','LLP','Proprietorship','Individual Business','Other'],true),
 year('Year Established'),f('website','Company Website','url'),f('gstNumber','GST Number'),
 f('address','Company Address','textarea',true,{wide:true}),f('city','City','text',true),f('state','State','text',true),
 f('pinCode','PIN Code','text',true,{pattern:'[1-9][0-9]{5}',inputMode:'numeric',maxLength:6,hint:'Enter your six-digit Indian PIN code.'})]),
 group('02 — Contact person',[
 f('name','Contact Person Name','text',true),
 s('designation','Designation',['Owner / Proprietor','Director','Purchase Manager','Procurement Head','Production Manager','Project Manager','Other'],true),
 f('phone','Mobile Number','phone',true),f('whatsapp','WhatsApp Number','phone'),f('email','Business Email','email')]),
 group('03 — Your business',[
 s('industry','Industry / Business Category',['Engineering & Manufacturing','Fabrication','Scaffolding','Construction / Infrastructure','Automobile / Auto Components','Furniture / Wood','Electrical / Industrial','Machinery Manufacturing','Steel / Metal Industry','Chemical Industry','Dealer / Distributor','Contractor','Other'],true),
 f('businessDescription','Briefly describe your business','textarea',false,{wide:true}),
 f('operatingLocations','Number of Manufacturing / Operating Locations','number',false,{min:1,step:1}),f('businessLocations','Main Business Location(s)')]),
 group('04 — Product requirement',[
 m('products','Which products are you currently looking for?',['Industrial Synthetic Enamel','Quick Drying Paint','Red Oxide Primer','Epoxy Coating','PU Coating','Heat Resistant Paint','Hammer Tone Paint','Water-Based Paint','Industrial Thinner','Other'],true),
 f('application','Application / End Use','text',true),f('specification','Required Paint Type / Specification'),f('shades','Required Shades / RAL Codes'),
 m('packaging','Required Packaging',['1 Litre','4 Litre','20 Litre','Drum / Bulk','Other'])]),
 group('05 — Monthly consumption',[
 s('monthlyConsumption','How much paint/coating do you currently consume per month?',['Below 500 Litres','500–1,000 Litres','1,000–3,000 Litres','3,000–5,000 Litres','5,000–10,000 Litres','10,000–25,000 Litres','25,000–50,000 Litres','50,000–1,00,000 Litres','1,00,000+ Litres'],true,{wide:true}),
 q('paintConsumption','Approximate Monthly Paint Consumption (L/month)'),q('thinnerConsumption','Approximate Monthly Thinner Consumption (L/month)'),q('futureRequirement','Expected Future Monthly Requirement (L/month)')]),
 group('06 — Current purchase & supplier information',[
 s('existingSupplier','Are you currently purchasing industrial paints from another supplier?',['Yes','No'],false,{wide:true}),f('supplierName','Current Brand / Supplier Name'),
 m('supplierReasons','What are the main reasons you are looking for a new supplier?',['Price','Quality','Availability','Shade Consistency','Drying Time','Coverage','Delivery','Technical Support','Current Supplier Issues','Looking for Additional Supplier','Other'])]),
 group('07 — Additional information',[
 f('message','Please tell us anything else about your requirement','textarea',false,{wide:true}),
 s('referral','How did you hear about Aeropolish?',['Google','LinkedIn','Website','Referral','Existing Customer','Dealer / Distributor','Other'])])
];
const vendorSections = [
 group('01 — Company information',[
 f('company','Company / Firm Name','text',true),f('name','Contact Person','text',true),f('designation','Designation'),f('phone','Mobile Number','phone',true),f('email','Email Address','email',true),f('website','Website','url'),f('cityState','City / State','text',true),year('Year of Establishment'),
 s('businessType','Business Type',['Manufacturer','Authorized Distributor','Importer','Trader','Service Provider','Other'])]),
 group('02 — What do you supply?',[
 m('supplyCategory','Products / Services You Supply',['Paint Raw Materials','Resins','Pigments','Solvents / Thinners','Additives / Driers','Industrial Chemicals','Packaging Materials','Tin / Plastic Containers','Machinery & Equipment','Logistics / Transportation','Other'])]),
 group('03 — Supply capacity',[
 s('supplyCapacity','Approximate Monthly Supply Capacity',['₹5–10 Lakh','₹25–50 Lakh','₹50 Lakh–₹1 Crore','₹1–3 Crore']),
 s('minimumSupply','Minimum Monthly Supply Capability to Aeropolish',['Below ₹25 Lakh','₹25 Lakh – ₹50 Lakh','₹50 Lakh–₹1 Crore','₹1–3 Crore'])]),
 group('04 — Credit / payment terms',[s('creditTerms','What credit facility can you offer?',['45 Days','60 Days','90 Days'])]),
 group('05 — Commercial & quality information',[
 f('moq','Minimum Order Quantity (MOQ)'),f('leadTime','Lead Time'),f('deliveryLocations','Delivery Locations'),s('gstRegistered','GST Registered?',['Yes','No']),f('gstNumber','GST Number'),f('certifications','ISO / Other Certifications'),s('qualityControl','In-house Quality Control / Laboratory?',['Yes','No']),
 f('catalogue','Product Catalogue Upload','file',false,{wide:true}),f('companyProfile','Company Profile Upload','file',false,{wide:true}),f('gstCertificate','GST Certificate Upload','file',false,{wide:true})]),
 group('06 — Final question',[f('message','Why would you like to become an Aeropolish supplier/vendor?','textarea',false,{wide:true,placeholder:'Written comment…'})])
];
const disclaimer = 'Vendor applications are evaluated based on product quality, manufacturing/supply capacity, commercial terms, delivery capability, compliance and long-term business suitability. Submission of this form does not guarantee vendor approval.';
const inquiries = {
 client:{title:'Client Inquiry',subtitle:'Tell us about your business and coating requirements so we can recommend a suitable Aeropolish solution.',sections:clientSections,submitLabel:'Submit Client Inquiry',successMessage:'Thank you! Your inquiry has been received. Our team will contact you.'},
 vendor:{title:'Become Our Vendor / Supplier',subtitle:'Partner with Aeropolish Paints & Coating Industry',sections:vendorSections,submitLabel:'Submit Vendor Application',disclaimer,intro:{title:'Strategic Partnerships. Higher Standards.',paragraphs:[disclaimer,'Quality is never a compromise.','Aeropolish works with a trusted and growing network of manufacturers and supply partners selected for their quality, reliability and technical capabilities. Through strong partnerships and rigorous standards, we aim to deliver consistent products, dependable supply and lasting value to every customer we serve.']},successMessage:'Thank you! Your vendor application has been received for review.'},
 investor:{title:'Strategic Investment & Global Growth',subtitle:'Partner With Aeropolish. Build the Future of Paints & Coatings.',submitLabel:'Start a Conversation',successMessage:'Thank you for your interest. Your message has been received by Aeropolish.',sections:[group('Start a conversation',[
 f('name','Full Name','text',true),f('organization','Organization'),f('email','Email','email',true),f('phone','Phone','phone',true),f('country','Country','text',true),
 s('investorType','Partnership Interest',['Strategic Investors','Private Investors','Industry Partners','Business Groups','International Investors','Distribution & Market Partners','Strategic Growth Partners'],true),f('message','Tell us about your investment or partnership interest','textarea',true,{wide:true})])]}
};
for (const definition of Object.values(inquiries)) {
 definition.heroImage = '/new-images/industrial-paints.svg';
 definition.fields = definition.sections.flatMap(section=>section.fields);
}
module.exports = inquiries;
