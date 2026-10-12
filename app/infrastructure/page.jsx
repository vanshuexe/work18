import Link from 'next/link';
import { CtaBand, PageHero, SectionHead } from '../../components/ui/blocks';
import Gallery from '../../components/ui/Gallery';
import { plant } from '../../lib/plant';
import { site } from '../../lib/site';

export const metadata = {
  title: 'Infrastructure — plant and equipment',
  description: `A ${site.area} plant in Ludhiana with wire straightening, power presses, welding, coating and packing under one roof.`,
  alternates: { canonical: '/infrastructure' },
};

const order = ['powerPress', 'pressLine', 'pressShop', 'wireStraightening', 'tubeBending', 'formedParts', 'welding', 'powderCoating', 'curingOven', 'coatedParts'];
const gallery = order.map((key) => plant[key]).map((item) => ({ src: item.src, alt: item.alt, caption: item.caption }));

export default function Infrastructure() {
  return (
    <>
      <PageHero
        crumbs={[['Company', '/about-us'], ['Infrastructure']]}
        title="A plant built to make parts end to end."
        lead={`${site.area} in Ludhiana with machinery, equipment and testing facilities under one roof — so forming, welding, finishing and packing happen in the same place.`}
        image={{ src: plant.powerPress.src, alt: plant.powerPress.alt }}
      />

      <section className="section">
        <div className="container split split--top">
          <div className="split-copy">
            <p className="kicker"><span className="mono">01</span>Manufacturing facilities</p>
            <h2>All in-house, all under one roof.</h2>
            <p>
              The plant is well equipped with machinery, equipment and testing facilities, and every product is
              manufactured under one roof. Raw material is bought in bulk from trusted sources and is checked before
              production.
            </p>
            <p>
              Manufacturing is planned in advance so that orders ship on time, with stringent checks from the first
              operation to final delivery — and attention to keeping rejection low, which saves time and material.
            </p>
            <Link href="/quality" className="text-link">Our quality approach</Link>
          </div>
          <ul className="tick-list" style={{ maxWidth: 'none' }}>
            <li>Wire straightening and CNC wire forming</li>
            <li>Press shop with power and hydraulic presses</li>
            <li>Projection welding and butt welding</li>
            <li>Shot blasting, black and powder coating, electric curing furnace</li>
            <li>Tool room for tooling, jigs and fixtures</li>
            <li>Bubble and carton packing for dispatch</li>
          </ul>
        </div>
      </section>

      <section className="section section--bone">
        <div className="container">
          <SectionHead index="02" label="On the shop floor" title="The plant at work." align="split">
            <p>Photographs from our press shop, wire and tube lines, welding section, coating booth and curing oven. Select a photo to enlarge it.</p>
          </SectionHead>
          <Gallery items={gallery} columns={3} ratio="4 / 5" />
        </div>
      </section>

      <CtaBand title="See the plant for yourself." text="Visits can be arranged in Ludhiana. Contact us to plan a time." />
    </>
  );
}
