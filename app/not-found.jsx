import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="container missing">
      <span className="missing-code" aria-hidden="true">404</span>
      <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>That page has gone off the road.</h1>
      <p className="lead">The link may be out of date. Try the product ranges, or get in touch and we will help you find it.</p>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <Link href="/products" className="btn btn--primary">Browse products</Link>
        <Link href="/contact-us" className="btn btn--ghost">Contact us</Link>
      </div>
    </section>
  );
}
