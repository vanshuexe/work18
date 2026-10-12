import Link from 'next/link';
import { categories, getFamily } from '../../lib/catalog';
import { CtaBand, PageHero } from '../ui/blocks';
import ProductBrowser from './ProductBrowser';

export default function CollectionPage({ slug }) {
  const category = categories[slug];
  const family = category.family ? getFamily(category.family) : null;
  const siblings = family ? family.categories.map((key) => categories[key]) : [];
  const crumbs = family ? [[family.title, `/${family.slug}`], [category.title]] : [['Products', '/products'], [category.title]];

  return (
    <>
      <PageHero crumbs={crumbs} title={category.title} lead={category.lead} />
      <section className="section">
        <div className="container catalog-layout">
          <aside className="catalog-aside">
            {siblings.length > 1 && (
              <nav aria-label={`${family.title} categories`} className="side-nav">
                <h2 className="side-nav-title">{family.title}</h2>
                <ul>
                  {siblings.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/${item.slug}`} aria-current={item.slug === slug ? 'page' : undefined}>
                        {item.title}
                        <span className="mono">{item.items.length}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <div className="aside-note">
              {category.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="aside-card">
              <h3>Need a specific part?</h3>
              <p>Send a product code, sample or drawing.</p>
              <Link href={`/enquiry?type=${encodeURIComponent(category.enquiry)}`} className="btn btn--dark">Start an enquiry</Link>
            </div>
          </aside>
          <ProductBrowser items={category.items} enquiryType={category.enquiry} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function collectionMetadata(slug) {
  const category = categories[slug];
  return {
    title: category.title,
    description: `${category.lead} Manufactured by Harison Cycle Industries, Ludhiana.`,
    alternates: { canonical: `/${slug}` },
  };
}
