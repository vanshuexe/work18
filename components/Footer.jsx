import SiteLink from './SiteLink';
import siteDefault from '../config/site';
export default function Footer({site=siteDefault}) {
 const columns=[{title:'Products',links:site.footerLinks.products},{title:'Colors',links:site.footerLinks.colors},{title:'Support',links:site.footerLinks.support}];
 return <footer className="site-footer">
  <div className="footer-inner">
    <div className="footer-brand"><SiteLink href="/" aria-label="Aeropolish home"><img src="/aeropolish-navbar-logo.png" width="1400" height="197" alt="Aeropolish — Paints & Coating Industry" loading="lazy" /></SiteLink><p className="footer-slogan">{site.footer.slogan}</p></div>
   <div className="footer-columns">{columns.map(column=><nav key={column.title} aria-label={column.title+' links'}><h2>{column.title}</h2>{column.links.map(link=><SiteLink key={link.href} href={link.href} {...(link.file ? {target:"_blank",rel:"noopener noreferrer"} : {})}>{link.label}</SiteLink>)}</nav>)}</div>
  </div>
  <div className="footer-bottom">© {new Date().getFullYear()} {site.footer.copyright}</div>
 </footer>;
}
