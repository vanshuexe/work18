import Link from 'next/link';
import { Arrow, CtaBand, Faq, PageHero, Photo, SectionHead } from '../../components/ui/blocks';
import { plant } from '../../lib/plant';

export const metadata = {
  title: 'Services — custom wire, tube & sheet metal manufacturing',
  description:
    'Wire forming, pressing, welding, powder coating and packing under one roof in Ludhiana. OEM and custom manufacturing of bicycle, agriculture and wire components.',
  alternates: { canonical: '/services' },
};

const services = [
  {
    title: 'Wire forming',
    text: 'Wire is straightened and formed on CNC wire-forming machines. It is how we make carriers, baskets, display racks, filter stands and other formed-wire products to a buyer’s shape.',
    tags: ['Wire straightening', 'CNC wire forming', 'Display racks', 'Filter stands'],
    image: 'wireStraightening',
  },
  {
    title: 'Pressing & sheet metal',
    text: 'A press shop with hydraulic presses cuts and forms sheet metal, channels and angles into brackets, stands, plates and machine parts.',
    tags: ['Press shop', 'Hydraulic press', 'Sheet metal', 'Tube sections'],
    image: 'powerPress',
  },
  {
    title: 'Welding & assembly',
    text: 'Projection welding and butt welding join formed parts into rigid, repeatable assemblies, from a single carrier frame to a full stand.',
    tags: ['Projection welding', 'Butt welding', 'Fixtures'],
    image: 'welding',
  },
  {
    title: 'Surface finishing',
    text: 'Parts are shot blasted for a clean surface, then powder coated or black coated and cured in an electric furnace. Black powder coat is standard; other colours and BCP finishes are available on selected models.',
    tags: ['Shot blasting', 'Powder coating', 'Black coating', 'Electric furnace'],
    image: 'powderCoating',
  },
  {
    title: 'Tooling & development',
    text: 'A tool room supports new parts, jigs and fixtures. Send a drawing or a sample and we will tell you what is practical, with samples where required.',
    tags: ['Tool room', 'Jigs & fixtures', 'Sample development'],
  },
  {
    title: 'Packing & dispatch',
    text: 'Components are packed to the order — bubble packing and cartons for protection in transit — for domestic delivery and export consignments.',
    tags: ['Bubble packing', 'Carton packing', 'Export packing'],
  },
];

const workflow = [
  ['Enquiry', 'You send a product code, drawing, sample or specification.'],
  ['Review', 'We check the part against our tooling and capabilities and agree the details.'],
  ['Sample or tooling', 'For new parts, tooling and a sample are made for your approval.'],
  ['Production', 'Parts are formed, welded and finished in our plant to the agreed schedule.'],
  ['Inspection', 'Checks during and after production against your requirement.'],
  ['Delivery', 'Packed and dispatched within India or overseas.'],
];

const faqs = [
  ['What do you need to give me a quotation?', 'For catalogue parts, the product code (or vehicle model), quantity and finish. For custom parts, a drawing or a sample, the material and finish you want, and your expected quantities.'],
  ['Do you make parts to a customer’s drawing?', 'Yes. Customer-specific wire, tube and sheet-metal components are a regular part of our work. Send a drawing or a physical sample and we will advise.'],
  ['Which markets do you supply?', 'Domestic and export. We supply cycle manufacturers, assemblers, distributors and traders in India and overseas.'],
  ['What finishes are available?', 'Black powder coating is standard on most products. Selected models are available with a BCP finish, in blue or in other powder-coat colours — see the finish listed on each product.'],
  ['Can I get a sample first?', 'Samples and trial quantities can be discussed when you enquire. Tell us what you want to evaluate.'],
  ['Can I visit the factory?', 'We are happy to host visitors at our Ludhiana units. Contact us to arrange a time.'],
];

export default function Services() {
  return (
    <>
      <PageHero
        crumbs={[['Services']]}
        title="Make it, finish it, pack it."
        lead="Beyond our catalogue, Harison manufactures wire, tube and sheet-metal components to customer requirements — formed, welded, coated and packed in one plant."
        image={{ src: plant.wireStraightening.src, alt: plant.wireStraightening.alt }}
      >
        <Link href="/enquiry?type=Custom%20%2F%20OEM%20manufacturing" className="btn btn--primary">Discuss a requirement</Link>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead index="01" label="What we do" title="Six processes, all in-house." align="split">
            <p>Keeping the work under one roof means one team accountable for a part from raw material to packed carton.</p>
          </SectionHead>
          <div className="service-rows">
            {services.map((service, index) => (
              <article className="service-row" key={service.title}>
                <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                <h3>{service.title}</h3>
                <div>
                  <p>{service.text}</p>
                  <ul>
                    {service.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                {service.image && <Photo src={plant[service.image].src} alt={plant[service.image].alt} ratio="4 / 3" sizes="(max-width: 900px) 100vw, 300px" />}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <SectionHead index="02" label="How an order works" title="From first message to delivery." />
          <ol className="steps">
            {workflow.map(([title, text], index) => (
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
            <p className="kicker"><span className="mono">03</span>Who we work with</p>
            <h2>Built for buyers.</h2>
            <p>
              Our customers are bicycle manufacturers, assemblers, distributors and traders, and makers and dealers of agricultural machinery. We work to a buyer’s requirement for the component, the material, the
              finish and the application.
            </p>
            <Link href="/about-us" className="text-link">About Harison <Arrow /></Link>
          </div>
          <ul className="tick-list" style={{ maxWidth: 'none' }}>
            <li>Cycle OEMs and assemblers</li>
            <li>Distributors and traders, domestic and export</li>
            <li>Makers and dealers of agricultural machinery</li>
            <li>Buyers of custom wire, tube and sheet-metal forms</li>
          </ul>
        </div>
      </section>

      <section className="section section--bone">
        <div className="container split split--top">
          <div className="split-copy">
            <p className="kicker"><span className="mono">04</span>Questions</p>
            <h2>Before you enquire.</h2>
            <p>Straight answers to what buyers usually ask first. Anything else, <Link href="/contact-us" className="text-link">talk to us</Link>.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand title="Ready to talk specifications?" text="Send a drawing, sample or product code and we will reply with what is possible, and at what price and lead time." />
    </>
  );
}
