import Image from 'next/image';
import Link from 'next/link';

export function PageHero({ crumbs = [], title, lead, tone = 'bone', children, image }) {
  return (
    <section className={`page-hero page-hero--${tone}`}>
      <div className="container page-hero-inner">
        <div className="page-hero-copy">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            {crumbs.map(([label, href]) => (
              <span key={label}>
                <i aria-hidden="true">/</i>
                {href ? <Link href={href}>{label}</Link> : <span aria-current="page">{label}</span>}
              </span>
            ))}
          </nav>
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
        {image && (
          <div className="page-hero-media">
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 45vw" priority />
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHead({ index, label, title, children, align }) {
  return (
    <header className={`section-head${align === 'split' ? ' section-head--split' : ''}`}>
      <div>
        {(index || label) && (
          <p className="kicker">
            {index && <span className="mono">{index}</span>}
            {label}
          </p>
        )}
        <h2>{title}</h2>
      </div>
      {children && <div className="section-head-aside">{children}</div>}
    </header>
  );
}

export function Photo({ src, alt, ratio = '4 / 3', sizes = '(max-width: 900px) 100vw, 50vw', priority = false, className = '' }) {
  return (
    <div className={`photo ${className}`} style={{ aspectRatio: ratio }}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
    </div>
  );
}

export function ProductImage({ src, alt, sizes = '(max-width: 700px) 50vw, 25vw', priority = false }) {
  return (
    <span className="product-image">
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
    </span>
  );
}

export function CtaBand({ title = 'Have a drawing, sample or product code?', text = 'Send us the details and our team will come back with availability, pricing and lead time.' }) {
  return (
    <section className="cta-band">
      <div className="container cta-band-inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band-actions">
          <Link href="/enquiry" className="btn btn--primary">Request a quote</Link>
          <Link href="/contact-us" className="btn btn--ghost-light">Contact the team</Link>
        </div>
      </div>
    </section>
  );
}

export function Faq({ items }) {
  return (
    <div className="faq">
      {items.map(([question, answer]) => (
        <details key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}

export function Arrow() {
  return (
    <svg className="arrow" width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" focusable="false">
      <path d="M0 6h16M11 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
