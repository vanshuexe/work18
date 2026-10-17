import SiteLink from '../SiteLink';
import CompanyContent from '../CompanyContent';
import inquiries from '../../config/inquiries';
const inputClass = 'inquiry-input';
function Field({field,countries}) {
 const id = `inquiry-${field.name}`;
 const common = {id,name:field.name,required:field.required,placeholder:field.placeholder,min:field.min,max:field.max,step:field.step,pattern:field.pattern,inputMode:field.inputMode,maxLength:field.maxLength || (field.type === 'textarea' ? 5000 : 200)};
 const label = <label htmlFor={id}>{field.label}{field.required ? <span aria-hidden="true"> *</span> : <span className="optional"> (optional)</span>}</label>;
 let control;
 if (field.type === 'phone') {
  const codeName = field.name === 'phone' ? 'countryCode' : `${field.name}CountryCode`;
  control = <div className="inquiry-phone"><div><label htmlFor={`${id}-code`}>Country Code</label><select id={`${id}-code`} name={codeName} defaultValue="+91" className={inputClass}>{countries.map(c=><option key={c.code+c.name} value={c.code}>{c.flag} {c.name} ({c.code})</option>)}</select></div><div>{label}<input type="tel" {...common} className={inputClass} /></div></div>;
 } else if (field.type === 'checkboxes') {
  control = <fieldset data-choice-group="" data-required={field.required ? 'true' : 'false'}><legend>{field.label}{field.required ? ' *' : ' (optional)'}</legend><div className="inquiry-choices">{field.options.map((option,i)=><label key={option} htmlFor={`${id}-${i}`}><input id={`${id}-${i}`} type="checkbox" name={field.name} value={option} /> <span>{option}</span></label>)}</div></fieldset>;
 } else if (field.type === 'select') {
  control = <>{label}<select {...common} defaultValue="" className={inputClass}><option value="">Select an option</option>{field.options.map(option=><option key={option}>{option}</option>)}</select></>;
 } else if (field.type === 'textarea') {
  control = <>{label}<textarea {...common} rows={5} className={inputClass} /></>;
 } else if (field.type === 'file') {
  control = <>{label}<input id={id} name={field.name} type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className={inputClass} /><p className="field-hint">PDF, Word, JPG or PNG. Maximum 5 MB per document.</p></>;
 } else control = <>{label}<input type={field.type} {...common} className={inputClass} /></>;
 return <div className="inquiry-field" data-other-field={field.allowOther ? field.name : undefined}>
  {control}
  {field.hint && <p className="field-hint">{field.hint}</p>}
  {field.allowOther && <div data-other-details="" hidden><label htmlFor={`${id}-other`}>Please specify other</label><input id={`${id}-other`} name={`${field.name}Other`} maxLength={200} className={inputClass} disabled /></div>}
 </div>;
}
export default function InquiryPage({type,countries}) {
 const inquiry = inquiries[type];
 const others = Object.entries(inquiries).filter(([key])=>key!==type);
 return <div className="aeropolish-page">
  <section className="aeropolish-hero"><span className="company-eyebrow">AEROPOLISH PAINTS & COATING INDUSTRY</span><h1>{inquiry.title}</h1><p>{inquiry.subtitle}</p></section>
  {type === 'investor' && <CompanyContent kind="investor" />}
  {inquiry.intro && <section className="company-section inquiry-intro"><h2>{inquiry.intro.title}</h2>{inquiry.intro.paragraphs.map((text,i)=><p key={i}>{text}</p>)}</section>}
  <div className="inquiry-container">
   <form data-inquiry-form="" data-success-message={inquiry.successMessage} action={`/api/inquiries/${type}`} method="post" encType="multipart/form-data" noValidate>
    <p className="field-hint">Fields marked * are required.</p>
    {inquiry.sections.map(section=><fieldset className="inquiry-section" key={section.title}><legend>{section.title}</legend><div className="inquiry-grid">{section.fields.map(field=><div key={field.name} className={field.wide || field.type==='phone' ? 'inquiry-wide' : ''}><Field field={field} countries={countries} /></div>)}</div></fieldset>)}
    {inquiry.disclaimer && <p className="inquiry-disclaimer">{inquiry.disclaimer}</p>}
    <div data-form-status="" className="form-status hidden" role="status" aria-live="polite"></div>
    <button type="submit" className="inquiry-submit">{inquiry.submitLabel}</button>
   </form>
   <p className="inquiry-links">{others.map(([key,other])=><SiteLink key={key} href={`/${key}`}>{key==='investor' ? 'Investment & Partnerships' : other.title}</SiteLink>)}<SiteLink href="/#contact">General Contact</SiteLink></p>
  </div>
 </div>;
}
