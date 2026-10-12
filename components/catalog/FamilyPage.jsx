import Image from 'next/image';
import Link from 'next/link';
import { categories, getFamily } from '../../lib/catalog';
import { Arrow, CtaBand, PageHero, SectionHead } from '../ui/blocks';

export default function FamilyPage({ slug }) {
  const family = getFamily(slug);

  return (
    <>
      <PageHero crumbs={[['Products', '/products'], [family.title]]} title={family.title} lead={family.blurb} />
      <section className="section">
        <div className="container">
          <SectionHead index="01" label="Categories" title={`Browse ${family.title.toLowerCase()} by category.`} />
          <ul className="category-rows">
            {family.categories.map((key, index) => {
              const category = categories[key];
              const preview = category.items.slice(0, 4);
              return (
                <li key={key}>
                  <Link href={`/${category.slug}`} className="category-row">
                    <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                    <span className="category-row-copy">
                      <h3>{category.title}</h3>
                      <p>{category.lead}</p>
                      <span className="family-tile-foot">
                        <span>{category.items.length} products</span>
                        <Arrow />
                      </span>
                    </span>
                    <span className="category-row-previews" aria-hidden="true">
                      {preview.map((item) => (
                        <span className="product-image" key={item.id}>
                          <Image src={item.image} alt="" fill sizes="160px" />
                        </span>
                      ))}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function familyMetadata(slug) {
  const family = getFamily(slug);
  return { title: family.title, description: `${family.blurb} Manufactured by Harison Cycle Industries, Ludhiana.`, alternates: { canonical: `/${slug}` } };
}
