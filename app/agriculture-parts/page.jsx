import Link from 'next/link';
import ProductBrowser from '../../components/catalog/ProductBrowser';
import { CtaBand, Faq, PageHero, SectionHead } from '../../components/ui/blocks';
import { categories } from '../../lib/catalog';

export const metadata = {
  title: 'Agriculture parts — tines for combines, reapers & balers',
  description:
    'Spring tines and formed-wire parts for combine harvesters, reapers and balers, made by Harison India at the Harison plant in Ludhiana, Punjab.',
  alternates: { canonical: '/agriculture-parts' },
};

const category = categories['agriculture-parts'];

const types = [
  ['Double torsion tine', 'Two coil springs joined by a bridge, with a straight leg coming off each coil. The coils store and release energy, so the legs flex under load and spring back. This is the most common type — parts 01–05, 07, 08, 10–13, 18 and 19.'],
  ['Long-leg tine', 'The same double-coil design with much longer legs, for reaching further into the crop or windrow. Parts 14, 15 and 17.'],
  ['Single-coil / hooked', 'A single curved wire, with one coil or just an eye or hook at the top, for lighter pick-up and guiding duty. Parts 06 and 09.'],
  ['Wire form', 'A plain bent-wire part with no coils, made on CNC wire-forming machines. Part 16.'],
];

const measure = [
  ['Coils per side', 'Count the turns on one coil.'],
  ['Wire diameter', 'Measure the wire with a calliper.'],
  ['Coil inside diameter', 'The opening in the middle of a coil.'],
  ['Leg length', 'From the coil to the tip of each leg.'],
  ['Overall width', 'Across both coils.'],
  ['Bridge shape', 'Peaked, square, U-shaped or V-shaped — with or without an eye.'],
];

const send = [
  'Machine make and model (combine, reaper or baler)',
  'Part number, drawing or a physical sample',
  'Quantity — trial lot or regular requirement',
  'Material and finish you need',
];

const faqs = [
  ['Do you have a part number for each item?', 'Each photo carries a reference such as PART 07. Quote it together with your machine model, or send a sample or drawing, and we will match it. The details shown — coils, bridge, legs and finish — are read from the photograph, so confirm dimensions with us before ordering.'],
  ['Do you make parts to a sample or drawing?', 'Yes. Customer-specific wire and sheet-metal parts are a core part of our work, and the same plant makes our agriculture parts.'],
  ['What finishes are available?', 'Parts are shown in bright steel, zinc, gold-zinc, yellow, grey, brown and black finishes. Tell us the finish you need and we will confirm what we can supply.'],
  ['Who are these parts for?', 'Machine manufacturers, dealers and distributors of agricultural equipment. Tell us about your requirement when you enquire.'],
];

export default function Agriculture() {
  return (
    <>
      <PageHero
        crumbs={[['Products', '/products'], ['Agriculture parts']]}
        title="Tines and wire-formed parts for farm machinery."
        lead="Under the Harison India name we make double torsion spring tines, long-leg tines and wire forms for combine harvesters, reapers and balers — in the same plant, and to the same standards, as our bicycle range."
      >
        <Link href="/enquiry?type=Agriculture%20parts" className="btn btn--primary">Request a quote</Link>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead index="01" label="The range" title="Parts, as made." align="split">
            <p>{category.items.length} parts shown. Select one for a closer look, then ask for a quotation.</p>
          </SectionHead>
          <ProductBrowser items={category.items} enquiryType={category.enquiry} noun="parts" />
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <SectionHead index="02" label="Know your part" title="What each type is." align="split">
            <p>
              Tines are the springy fingers on the pick-up reels and rake bars of agricultural machines such as balers,
              rakes and combine pick-ups. Select the type below that matches your part.
            </p>
          </SectionHead>
          <ol className="steps steps--two">
            {types.map(([title, text], index) => (
              <li className="step" key={title}>
                <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container split split--top">
          <div className="split-copy">
            <p className="kicker"><span className="mono">03</span>Identifying your part</p>
            <h2>Six things to measure.</h2>
            <p>If you do not have a part number, these measurements let us match or make the part accurately. A physical sample is better still.</p>
          </div>
          <ul className="spec-list">
            {measure.map(([term, text]) => (
              <li key={term}>
                <strong>{term}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--bone">
        <div className="container split split--top">
          <div className="split-copy">
            <p className="kicker"><span className="mono">04</span>Enquiring</p>
            <h2>What to send us.</h2>
            <p>The more we know about the machine and the part, the faster we can come back with availability and a price.</p>
            <ul className="tick-list">
              {send.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href="/infrastructure" className="text-link">See how we make them</Link>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand title="Need an agriculture part made?" text="Send the machine model, part number or a sample and we will reply with availability, price and lead time." />
    </>
  );
}
