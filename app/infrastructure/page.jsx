import Link from 'next/link';
import { CtaBand, PageHero, SectionHead } from '../../components/ui/blocks';
import Gallery from '../../components/ui/Gallery';
import { plant } from '../../lib/plant';
import { site } from '../../lib/site';

export const metadata = {
  title: 'Infrastructure — plant and equipment',
  description: `A ${site.area} plant in Ludhiana with wire straightening, tube bending, power presses, welding, coating and packing under one roof.`,
  alternates: { canonical: '/infrastructure' },
};

const ai = (file, caption, alt) => ({ src: `/images/recreated/infrastructure/${file}.png`, alt, caption: `${caption} · illustration` });
const real = (key) => ({ src: plant[key].src, alt: plant[key].alt, caption: plant[key].caption });

const stages = [
  {
    title: 'The plant',
    paragraphs: [
      `Harison works from a ${site.area} plant in Ludhiana, laid out so that material moves in one direction: raw wire and tube arrive at one end, and packed cartons leave from the other. Keeping every step under one roof means fewer handovers, less handling damage and one team that can see a part through from the first cut to the final check.`,
      'The floor is organised by operation — wire and tube preparation, pressing, welding, finishing and packing — with racks and crates between each stage so parts are never left on the ground. Order planning is done in advance, so machines, tooling and finish are ready before a batch is released.',
    ],
    items: [
      ai('new1', 'Factory view', 'Illustration of the Harison factory building in the evening'),
      ai('new2', 'Inside the plant', 'Illustration of the inside of the Harison plant'),
      ai('new3', 'Production floor', 'Illustration of the Harison production floor'),
    ],
  },
  {
    title: 'Wire & tube preparation',
    paragraphs: [
      'Most of our parts start as coiled wire or straight tube. Wire is straightened and cut to length on a straightening machine, then formed on wire-forming machines; tube is bent on a bending machine to the shape of the carrier, stand or frame.',
      'Preparing the material properly is what makes the later steps repeatable. Straight, consistent wire forms to the same shape every time, and consistent tube bends fit the welding fixtures without forcing — which is why we check material when it arrives and again at this stage.',
    ],
    items: [
      real('wireStraightening'),
      real('tubeBending'),
      ai('cnc-wire-forming', 'CNC wire forming', 'Illustration of a CNC wire-forming machine'),
    ],
  },
  {
    title: 'Pressing',
    paragraphs: [
      'Power presses and a hydraulic press cut, punch and form flat and tube sections — the brackets, ends, flattened legs and mounting holes that turn a bent tube into a finished part. Press tools are matched to each part, and operators are positioned on each press so that the work can be checked as it is made.',
      'Because pressing is done in our own shop, a change to a hole position, an end shape or a bend radius can be made, tried and approved quickly, without waiting on an outside supplier.',
    ],
    items: [
      real('powerPress'),
      real('pressLine'),
      real('pressShop'),
      ai('hydraulic-press', 'Hydraulic press', 'Illustration of a hydraulic press'),
    ],
  },
  {
    title: 'Welding & assembly',
    paragraphs: [
      'Formed parts are joined by projection welding and butt welding, as well as manual welding for assemblies that need it. Fixtures hold each part in position so that carriers, stands and wire forms come out square and identical from one piece to the next.',
      'Welded assemblies are inspected before they move on to finishing. Weld position, alignment and overall dimensions are checked against the requirement, so problems are caught while the part can still be corrected.',
    ],
    items: [
      real('welding'),
      real('formedParts'),
      ai('projection-welding', 'Projection welding', 'Illustration of a projection welding machine'),
      ai('butt-welding', 'Butt welding', 'Illustration of a butt welding machine'),
    ],
  },
  {
    title: 'Surface finishing',
    paragraphs: [
      'Finishing protects a part and gives it its final appearance. Parts are shot blasted to a clean surface, then coated — powder coated in black or the colour the order calls for — and cured in an electric oven so the coating hardens evenly.',
      'Agriculture parts can be zinc plated or powder coated in any colour. Coated parts are racked straight from the oven, so that the finish is not marked before it has fully set.',
    ],
    items: [
      real('powderCoating'),
      real('curingOven'),
      real('coatedParts'),
      ai('short-blasting', 'Shot blasting', 'Illustration of a shot blasting cabinet'),
    ],
  },
  {
    title: 'Tool room, quality & packing',
    paragraphs: [
      'A tool room supports the plant with press tools, jigs and fixtures, and with the changes needed when a customer sends a new drawing or sample. Raw material is bought in bulk from trusted sources and checked before it is used; finished parts are inspected before they are packed.',
      'Packing is done to the order. Parts are wrapped, bubble packed and cartoned so that they arrive undamaged, whether they are going across Punjab or overseas.',
    ],
    items: [
      ai('tool-room', 'Tool room', 'Illustration of the Harison tool room'),
      ai('bubble-packing', 'Bubble packing', 'Illustration of parts being bubble packed'),
      ai('packing', 'Carton packing', 'Illustration of parts being packed in cartons'),
    ],
  },
];

export default function Infrastructure() {
  return (
    <>
      <PageHero
        crumbs={[['Company', '/about-us'], ['Infrastructure']]}
        title="A plant built to make parts end to end."
        lead={`${site.area} in Ludhiana with machinery, equipment and testing facilities under one roof — so forming, welding, finishing and packing happen in the same place.`}
        image={{ src: '/images/recreated/infrastructure/new1.png', alt: 'Illustration of the Harison factory building in the evening' }}
      />

      <section className="section">
        <div className="container split split--top">
          <div className="split-copy">
            <p className="kicker"><span className="mono">01</span>Manufacturing facilities</p>
            <h2>All in-house, all under one roof.</h2>
            <p>
              The plant is equipped with machinery, equipment and testing facilities, and every product is made under
              one roof. Raw material is bought in bulk from trusted sources and is checked before production.
            </p>
            <p>
              Manufacturing is planned in advance so that orders ship on time, with checks from the first operation to
              final delivery — and attention to keeping rejection low, which saves time and material.
            </p>
            <Link href="/quality" className="text-link">Our quality approach</Link>
          </div>
          <ul className="tick-list" style={{ maxWidth: 'none' }}>
            <li>Wire straightening and CNC wire forming</li>
            <li>Tube bending and a press shop with power and hydraulic presses</li>
            <li>Projection welding, butt welding and manual welding</li>
            <li>Shot blasting, powder coating and an electric curing oven</li>
            <li>Tool room for press tools, jigs and fixtures</li>
            <li>Bubble and carton packing for dispatch</li>
          </ul>
        </div>
      </section>

      {stages.map((stage, index) => (
        <section key={stage.title} className={`section section--tight${index % 2 === 0 ? ' section--bone' : ''}`}>
          <div className="container">
            <SectionHead index={String(index + 2).padStart(2, '0')} title={stage.title} />
            <div className="stage-copy">
              {stage.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Gallery items={stage.items} columns={stage.items.length === 4 ? 4 : 3} ratio="4 / 3" />
          </div>
        </section>
      ))}

      <section className="section section--tight">
        <div className="container">
          <p className="note">
            Photographs show our own plant. Images marked “illustration” are representative pictures of the process.
          </p>
        </div>
      </section>

      <CtaBand title="See the plant for yourself." text="Visits can be arranged in Ludhiana. Contact us to plan a time." />
    </>
  );
}
