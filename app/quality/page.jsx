import Link from 'next/link';
import { CtaBand, PageHero, Photo, SectionHead } from '../../components/ui/blocks';
import { plant } from '../../lib/plant';

export const metadata = {
  title: 'Quality — inspection, testing and objectives',
  description: 'How Harison Cycle Industries checks material, inspects components during and after production, and tests to customer requirements.',
  alternates: { canonical: '/quality' },
};

const stages = [
  ['Incoming material', 'Raw material is bought in bulk from trusted sources and is checked before it enters production.'],
  ['In-process checks', 'Components are inspected during manufacture, so variation is caught early rather than at the end of the line.'],
  ['Final inspection', 'Finished products are checked thoroughly before delivery, by inspectors with an eye for detail.'],
  ['Testing to requirement', 'Products are tested using accepted test procedures, and specific tests can be arranged to the client’s requirement.'],
];

const objectives = [
  ['Reduce internal rejection', 'Less scrap and rework means more consistent parts and steadier delivery.'],
  ['Minimise customer complaints', 'Catch problems at the source, and respond promptly to feedback.'],
  ['Enhance customer satisfaction', 'Supply parts that match the buyer’s requirement, every time.'],
  ['Meet delivery schedules', 'Plan production in advance so that orders go out on time.'],
];

export default function Quality() {
  return (
    <>
      <PageHero
        crumbs={[['Company', '/about-us'], ['Quality']]}
        title="Checked during production, and again before it leaves."
        lead="Our commitment is to supply products that match the customer’s requirement and to ensure their satisfaction — at an economical price and with consistent schedules."
      />

      <section className="section">
        <div className="container split split--top">
          <div className="split-copy">
            <p className="kicker"><span className="mono">01</span>Our approach</p>
            <h2>Quality is part of the process.</h2>
            <p>
              All products are checked thoroughly and repeatedly during and after production. Inspection is carried out
              by specialist staff, and a team of quality-checking personnel reviews and monitors each product against
              defined norms.
            </p>
            <p>
              We follow the principles of total quality management, with quality objectives and work plans for quality
              management. Monitoring and feedback feed back into the process so it keeps improving.
            </p>
            <Link href="/enquiry" className="btn btn--dark">Ask about specifications</Link>
          </div>
          <div className="split-media">
            <Photo src={plant.coatedParts.src} alt={plant.coatedParts.alt} ratio="4 / 3.4" sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <SectionHead index="02" label="Inspection & testing" title="Four checkpoints, start to finish." />
          <ol className="steps" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {stages.map(([title, text], index) => (
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
        <div className="container">
          <SectionHead index="03" label="Objectives" title="What we hold ourselves to." />
          <div className="cards-2">
            {objectives.map(([title, text], index) => (
              <article className="card" key={title}>
                <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--bone section--tight">
        <div className="container split">
          <div className="split-copy">
            <p className="kicker">Certification</p>
            <h2>ISO 9001 quality management.</h2>
          </div>
          <p>
            Harison states that it operates as an ISO 9001 certified company. If you need a copy of the current
            certificate for supplier approval, ask our team when you enquire.
          </p>
        </div>
      </section>

      <CtaBand title="Have a quality requirement?" text="Tell us the tests, tolerances or documentation you need and we will confirm what we can provide." />
    </>
  );
}
