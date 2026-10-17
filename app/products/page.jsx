import Link from 'next/link';
import FamilyTiles from '../../components/catalog/FamilyTiles';
import { CtaBand, PageHero, SectionHead } from '../../components/ui/blocks';
import { categories } from '../../lib/catalog';

export const metadata = {
  title: 'Products',
  description: 'Bicycle carriers, stands and accessories, plus agriculture parts for combines, reapers and balers, from Harison Cycle Industries, Ludhiana.',
  alternates: { canonical: '/products' },
};

const steps = [
  ['Pick a range', 'Browse the bicycle catalogue by category and note the product code — or, for agriculture parts, the machine model and part number.'],
  ['Tell us what you need', 'Share quantity, wheel size and finish — or send a drawing or sample for a custom part.'],
  ['We confirm and quote', 'Our team replies with availability, price and lead time. Samples and trial lots can be discussed.'],
];

export default function Products() {
  const total = ['carriers', 'stands', 'accessories'].reduce((sum, key) => sum + categories[key].items.length, 0);
  return (
    <>
      <PageHero
        crumbs={[['Products']]}
        title="Products"
        lead={`Two product ranges — bicycle parts (${total} catalogue products) and agriculture parts (${categories['agriculture-parts'].items.length} photographed parts) for combines, reapers and balers — all made from wire, tube and sheet metal in our Ludhiana plant.`}
      />
      <section className="section">
        <div className="container">
          <SectionHead index="01" label="Ranges" title="Choose a range." />
          <FamilyTiles />
        </div>
      </section>
      <section className="section section--bone">
        <div className="container">
          <SectionHead index="02" label="Ordering" title="From catalogue to quotation." align="split">
            <p>
              Not seeing the part you need? Much of our work is made to a buyer’s drawing or sample. <Link href="/services" className="text-link">See custom manufacturing</Link>
            </p>
          </SectionHead>
          <ol className="steps steps--light">
            {steps.map(([title, text], index) => (
              <li className="step" key={title}>
                <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
