'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Logo, { IndiaLogo } from '../brand/Logo';
import { nav, site } from '../../lib/site';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
    setOpenItem(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onPointer = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) setOpenItem(null);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpenItem(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-locked', menuOpen);
    return () => document.documentElement.classList.remove('menu-locked');
  }, [menuOpen]);

  const isActive = (item) => {
    if (item.href === pathname) return true;
    return (item.groups || []).some((group) => group.links.some(([, href]) => href === pathname));
  };

  return (
    <header ref={headerRef} className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Bicycle &amp; agriculture parts · Ludhiana, India · Since {site.founded}</span>
          <span className="topbar-contact">
            <a href={`tel:${site.phone.href}`}>{site.phone.label}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </span>
        </div>
      </div>
      <div className="container header-inner">
        <Logo priority />
        <button
          type="button"
          className="menu-button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="menu-button-label">{menuOpen ? 'Close' : 'Menu'}</span>
          <span className="menu-button-icon" aria-hidden="true" />
        </button>
        <nav id="primary-navigation" className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="Primary">
          <ul>
            {nav.map((item) => (
              <li key={item.label} className={item.groups ? 'has-panel' : undefined}>
                {item.groups ? (
                  <>
                    <button
                      type="button"
                      className="nav-trigger"
                      aria-expanded={openItem === item.label}
                      aria-current={isActive(item) ? 'true' : undefined}
                      onClick={() => setOpenItem(openItem === item.label ? null : item.label)}
                    >
                      {item.label}
                      <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    </button>
                    <div className={`nav-panel${openItem === item.label ? ' is-open' : ''}`}>
                      {item.groups.map((group) => (
                        <div className="nav-group" key={group.title}>
                          <Link href={group.href} className="nav-group-title">{group.title}</Link>
                          <ul>
                            {group.links.map(([label, href]) => (
                              <li key={href}>
                                <Link href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className="nav-link" aria-current={isActive(item) ? 'page' : undefined}>{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
          <Link href="/enquiry" className="btn btn--primary nav-cta">Request a quote</Link>
        </nav>
        <IndiaLogo className="india-logo--header" />
      </div>
    </header>
  );
}
