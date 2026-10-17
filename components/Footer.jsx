import SiteLink from './SiteLink';
import site from '../config/site';
export default function Footer() {
 const columns=[{title:'Products',links:site.footerLinks.products},{title:'Colors',links:site.footerLinks.colors},{title:'Support',links:site.footerLinks.support}];
 return <footer className="site-footer">
  <div className="footer-inner">
    <div className="footer-brand"><SiteLink href="/" aria-label="Aeropolish home"><img src="/aeropolish-navbar-logo.png" width="3964" height="855" alt="Aeropolish — Paints & Coating Industry" loading="lazy" /></SiteLink><p className="footer-slogan">Apna Rang, Apni Pehchaan.</p></div>
   <div className="footer-columns">{columns.map(column=><nav key={column.title} aria-label={column.title+' links'}><h2>{column.title}</h2>{column.links.map(link=><SiteLink key={link.href} href={link.href} {...(link.file ? {target:"_blank",rel:"noopener noreferrer"} : {})}>{link.label}</SiteLink>)}</nav>)}</div>
  </div>
  <div className="footer-bottom">© {new Date().getFullYear()} Aeropolish Paints & Coating Industry</div>
 </footer>;
}
