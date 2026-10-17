import SiteLink from './SiteLink';
import site from '../config/site';
const Chevron = () => <svg data-chevron="" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>;
const Close = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6 12 12M6 18 18 6" /></svg>;
export default function Header({active=''}) {
 return <header className="site-header">
  <div className="header-bar">
   <button type="button" data-mobile-menu-open="" className="header-menu-button" aria-label="Open menu" aria-expanded="false" aria-controls="site-mobile-menu"><span /><span /><span /></button>
   <SiteLink className="header-brand" href="/" aria-label="Aeropolish home"><img className="header-brand-logo" src="/aeropolish-navbar-logo.png" width="3964" height="855" alt="Aeropolish — Paints & Coating Industry" /></SiteLink>
   <nav className="header-desktop-nav" aria-label="Main navigation">
    {site.navigation.map(item=>item.children ? <div key={item.key} data-dropdown="" className="header-dropdown">
     <button type="button" data-dropdown-toggle="" aria-expanded="false" aria-controls={`menu-${item.key}`} className={active===item.key ? 'is-current' : ''}>{item.label}<Chevron /></button>
     <div id={`menu-${item.key}`} data-dropdown-menu="" className="header-dropdown-menu hidden">{item.children.map(child=><SiteLink key={child.href} href={child.href}>{child.label}</SiteLink>)}</div>
    </div> : <SiteLink key={item.key} href={item.href} aria-current={active===item.key ? 'page' : undefined}>{item.label}</SiteLink>)}
   </nav>
   <div className="header-actions">
    <div data-search="" className="header-search">
     <button type="button" data-search-toggle="" className="header-icon-button" aria-label="Search" aria-expanded="false" aria-controls="site-search-panel"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg></button>
     <div id="site-search-panel" data-search-panel="" className="header-search-panel hidden">
      <div className="header-search-input"><input data-search-input="" type="search" aria-label="Search products, news and jobs" placeholder="Search products, news, jobs…" autoComplete="off"/><button type="button" data-search-close="" className="header-icon-button" aria-label="Close search"><Close /></button></div>
      <div data-search-results="" className="header-search-results" aria-live="polite" />
     </div>
    </div>
   </div>
  </div>
  <div id="site-mobile-menu" data-mobile-menu="" className="site-mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation" aria-hidden="true" inert>
   <div className="mobile-menu-heading"><SiteLink href="/" className="mobile-menu-brand" aria-label="Aeropolish home"><img className="header-brand-logo" src="/aeropolish-navbar-logo.png" width="3964" height="855" alt="Aeropolish" /></SiteLink><button type="button" data-mobile-menu-close="" className="header-icon-button" aria-label="Close menu"><Close /></button></div>
   <nav aria-label="Mobile navigation">
    {site.navigation.map(item=>item.children ? <div key={item.key} data-mobile-submenu="">
     <button type="button" data-mobile-submenu-toggle="" aria-expanded="false" aria-controls={`mobile-${item.key}`} className={active===item.key ? 'is-current' : ''}>{item.label}<Chevron /></button>
     <div id={`mobile-${item.key}`} data-mobile-submenu-items="" className="hidden">{item.children.map(child=><SiteLink key={child.href} href={child.href}>{child.label}</SiteLink>)}</div>
    </div> : <SiteLink key={item.key} href={item.href} aria-current={active===item.key ? 'page' : undefined}>{item.label}</SiteLink>)}
   </nav>
  </div>
 </header>;
}
