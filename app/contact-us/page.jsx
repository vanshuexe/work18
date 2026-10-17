import Link from 'next/link';
import { Arrow, PageHero, SectionHead } from '../../components/ui/blocks';
import { site } from '../../lib/site';

export const metadata = {
  title: 'Contact us — Ludhiana, Punjab',
  description: 'Phone, email and addresses for Harison Cycle Industries and Harison India in Ludhiana, Punjab.',
  alternates: { canonical: '/contact-us' },
};

export default function Contact() {
  return (
    <>
      <PageHero
        crumbs={[['Contact']]}
        title="Talk to the team."
        lead="For product information, custom manufacturing and business enquiries. The fastest route is a phone call or an email with your product code, drawing or requirement."
      />

      <section className="section">
        <div className="container contact-grid">
          <div>
            <a className="contact-big" href={`tel:${site.phone.href}`}>{site.phone.label}</a>
            <a className="contact-big" href={`mailto:${site.email}`}>{site.email}</a>
            <div className="contact-list">
              <div>
                <h3>Second number</h3>
                <a href={`tel:${site.phone2.href}`}>{site.phone2.label}</a>
              </div>
              {site.instagram && (
                <div>
                  <h3>Instagram</h3>
                  <a href={site.instagram} target="_blank" rel="noopener noreferrer">Harison Cycle Industries</a>
                </div>
              )}
              {site.facebook && (
                <div>
                  <h3>Facebook</h3>
                  <a href={site.facebook} target="_blank" rel="noopener noreferrer">Harison Cycle Industries</a>
                </div>
              )}
            </div>
          </div>
          <div className="split-copy">
            <p className="kicker"><span className="mono">→</span>Prefer to write it down?</p>
            <h2>Send an enquiry.</h2>
            <p>The enquiry form takes a product code, quantity and a description of what you need. We reply by email or phone.</p>
            <Link href="/enquiry" className="btn btn--primary">Start an enquiry</Link>
          </div>
        </div>
      </section>

      <section className="section section--bone">
        <div className="container">
          <SectionHead index="01" label="Ludhiana · Punjab · India" title="Our two addresses." />
          <div className="cards-2">
            {site.units.map((unit) => (
              <div className="unit" key={unit.name} style={{ border: 0 }}>
                <span className="mono">{unit.name}</span>
                <h3>{unit.title}</h3>
                <address>
                  {unit.lines.map((line) => (
                    <span key={line} style={{ display: 'block' }}>{line}</span>
                  ))}
                </address>
                <a className="text-link" href={unit.map} target="_blank" rel="noopener noreferrer">Get directions <Arrow /></a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
