import { Suspense } from 'react';
import EnquiryForm from '../../components/enquiry/EnquiryForm';
import { PageHero } from '../../components/ui/blocks';
import { site } from '../../lib/site';

export const metadata = {
  title: 'Enquiry — request a quotation',
  description: 'Send Harison a product code, drawing or requirement and receive availability, price and lead time.',
  alternates: { canonical: '/enquiry' },
};

export default function Enquiry() {
  return (
    <>
      <PageHero
        crumbs={[['Enquiry']]}
        title="Request a quotation."
        lead="Tell us what you need. The more detail you share — product code, wheel size, finish, quantity — the faster we can reply."
      />
      <section className="section">
        <div className="container enquiry-grid">
          <aside className="enquiry-aside">
            <div>
              <p className="kicker">How it works</p>
              <ol>
                <li>Describe the part, or give us its code.</li>
                <li>Tell us the quantity and any finish or size.</li>
                <li>We reply with availability, price and lead time.</li>
              </ol>
            </div>
            <div className="enquiry-direct">
              <p className="kicker">Prefer to talk?</p>
              <a href={`tel:${site.phone.href}`}>{site.phone.label}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </aside>
          <div className="enquiry-panel">
            <Suspense fallback={<p>Loading form…</p>}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
