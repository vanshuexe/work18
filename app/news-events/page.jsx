import Image from 'next/image';
import { CtaBand, PageHero, SectionHead } from '../../components/ui/blocks';
import { recognition } from '../../lib/site';

export const metadata = {
  title: 'News & events — exhibitions and recognition',
  description: 'Harison at AGRI EXPO 2026, our exhibition archive since 2011, and awards and approvals.',
  alternates: { canonical: '/news-events' },
};

const archive = [2025, 2024, 2016, 2015, 2014, 2011];

export default function News() {
  return (
    <>
      <PageHero
        crumbs={[['Company', '/about-us'], ['News & events']]}
        title="Exhibitions, awards and company news."
        lead="Where you can meet the Harison team, and a record of the recognition we have received."
      />

      <section className="section">
        <div className="container news-feature">
          <div className="photo" style={{ aspectRatio: '4 / 4.4', maxWidth: 560 }}>
            <Image src="/images/events/agri-expo-2026.jpeg" alt="Harison India stall A-22A at AGRI EXPO 2026" fill sizes="(max-width: 900px) 100vw, 40vw" priority />
          </div>
          <div className="split-copy">
            <p className="kicker"><span className="mono">2026</span>Latest</p>
            <h2>AGRI EXPO 2026</h2>
            <p>
              Harison India exhibited at AGRI EXPO 2026, stall A-22A, showing combine, reaper and baler parts
              from our agriculture range. It continues a run of exhibitions that goes back more than a decade.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--bone">
        <div className="container">
          <SectionHead index="01" label="Archive" title="Previous exhibitions." align="split"><p>We have exhibited in 2025, 2024, 2016, 2015, 2014 and 2011.</p></SectionHead>
          <ul className="year-grid">
            {archive.map((year) => (
              <li key={year}>
                <strong>{year}</strong>
                <span>Exhibition</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container split split--top">
          <div className="split-copy">
            <p className="kicker"><span className="mono">02</span>Recognition</p>
            <h2>Awards &amp; approvals.</h2>
            <p>Recognition from industry bodies and from customers who audit their suppliers.</p>
          </div>
          <ul className="tick-list" style={{ maxWidth: 'none' }}>
            {recognition.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Want to meet us at the next event?" text="Get in touch and we will share our upcoming exhibition plans, or arrange a visit to the plant." />
    </>
  );
}
