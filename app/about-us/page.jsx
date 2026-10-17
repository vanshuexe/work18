import Link from 'next/link';
import FamilyTiles from '../../components/catalog/FamilyTiles';
import { Arrow, CtaBand, PageHero, Photo, SectionHead } from '../../components/ui/blocks';
import { customers, site } from '../../lib/site';

export const metadata = {
  title: 'About us — engineering goods manufacturer since 1964',
  description:
    'Harison Cycle Industries has manufactured engineering goods in Ludhiana since 1964 — bicycle carriers and stands, agriculture parts and formed wire products.',
  alternates: { canonical: '/about-us' },
};

const timeline = [
  [String(site.founded), 'Light engineering begins', 'The company is founded by the late S. Bahadur Singh Matharoo, with the blessings of his father, the late S. Hari Singh Matharoo, and starts manufacturing engineering goods.'],
  ['Growth', 'Carriers, stands and accessories', 'Expertise in wire, tube and sheet metal grows into a broad range of bicycle carriers, stands and accessories under the Harisons and Bahadur brands, supplied to cycle manufacturers and assemblers.'],
  ['Wire', 'Formed-wire products', 'CNC wire forming opens the way to custom formed-wire products such as display racks and water-filter stands, made to the buyer’s requirement.'],
  ['Today', 'Bicycle and agriculture parts', 'Our two product ranges are bicycle parts — carriers, stands and accessories — and agriculture parts for combines, reapers and balers, sold under the Harison India name.'],
];

export default function About() {
  return (
    <>
      <PageHero
        crumbs={[['Company', '/about-us'], ['Our story']]}
        title="Engineering goods, made in Ludhiana since 1964."
        lead="One stop for durable bicycle parts and agriculture parts at reasonable rates — made by a family-founded company with six decades in light engineering."
      />

      <section className="section">
        <div className="container split split--top">
          <div className="split-copy">
            <p className="kicker"><span className="mono">01</span>Who we are</p>
            <h2>A light-engineering company.</h2>
            <p>
              Harison is associated with the light engineering industry and has been manufacturing engineering goods
              since {site.founded}. Our unit spreads across {site.area} in Ludhiana, the industrial hub of Punjab and a
              centre of India’s bicycle industry.
            </p>
            <p>
              We make products from wire, tube, M.S. round, channels, angles and sheet metal: bicycle carriers and
              stands, accessories, agriculture parts, display racks and CNC-formed wire products — as per the buyer’s
              requirement, for domestic and export markets.
            </p>
            <p>
              We are one of the established manufacturers of bicycle carriers, stands and accessories under the brand
              names Harisons and Bahadur, with more than 60 models of carriers and stands.
            </p>
          </div>
          <div className="split-media">
            <Photo src="/images/recreated/infrastructure/new2.png" alt="Inside the Harison manufacturing plant" ratio="4 / 4.2" sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section section--bone">
        <div className="container">
          <div className="facts-light">
            <div><strong>{site.founded}</strong><span>Manufacturing engineering goods since</span></div>
            <div><strong>{site.area}</strong><span>Unit area, Ludhiana</span></div>
            <div><strong>60+</strong><span>Models of carriers and stands</span></div>
            <div><strong>2</strong><span>Product ranges: bicycle and agriculture</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead index="02" label="History" title="How the range grew." />
          <ul className="timeline">
            {timeline.map(([when, title, text]) => (
              <li key={when}>
                <strong>{when}</strong>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container split split--top">
          <div className="split-copy">
            <p className="kicker"><span className="mono">03</span>Customers</p>
            <h2>Trusted by cycle makers.</h2>
            <p>
              We supply major OEMs in India as well as other manufacturers, assemblers and traders in India and abroad.
              Customers include {customers.slice(0, -1).join(', ')} and {customers.at(-1)}.
            </p>
          </div>
          <div className="split-media">
            <Photo src="/images/recreated/infrastructure/press-shop.png" alt="The press shop at Harison" ratio="4 / 3" sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead index="04" label="What we make" title="Our product range." align="split">
            <Link href="/products" className="text-link">All products <Arrow /></Link>
          </SectionHead>
          <FamilyTiles />
        </div>
      </section>

      <CtaBand title="Work with a manufacturer you can visit." text="We would be glad to show you the plant and talk through your requirement. Get in touch to arrange a visit or request a quotation." />
    </>
  );
}
