import Link from 'next/link';
import Logo from '../brand/Logo';
import { site } from '../../lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-lead">
          <h2>Tell us what you need made.</h2>
          <Link href="/enquiry" className="btn btn--primary">Request a quote</Link>
        </div>
        <div className="footer-grid">
          <div className="footer-about">
            <Logo inverse />
            <p>
              Manufacturers of bicycle and agriculture parts from wire, tube and sheet metal. Engineering goods
              since {site.founded}, from Ludhiana, Punjab.
            </p>
            <p className="footer-contact">
              <a href={`tel:${site.phone.href}`}>{site.phone.label}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
          <nav aria-label="Products">
            <h3>Products</h3>
            <ul>
              <li><Link href="/carriers">Carriers</Link></li>
              <li><Link href="/stands">Stands</Link></li>
              <li><Link href="/accessories">Accessories</Link></li>
              <li><Link href="/baskets">Baskets</Link></li>
              <li><Link href="/agriculture-parts">Agriculture parts</Link></li>
            </ul>
          </nav>
          <nav aria-label="Company">
            <h3>Company</h3>
            <ul>
              <li><Link href="/about-us">Our story</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/infrastructure">Infrastructure</Link></li>
              <li><Link href="/quality">Quality</Link></li>
              <li><Link href="/news-events">News &amp; events</Link></li>
              <li><Link href="/contact-us">Contact</Link></li>
            </ul>
          </nav>
          <div>
            <h3>Visit</h3>
            {site.units.map((unit) => (
              <address key={unit.name}>
                <strong>{unit.name}</strong>
                {unit.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            ))}
          </div>
        </div>
        <div className="footer-legal">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
