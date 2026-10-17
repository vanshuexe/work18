import Image from 'next/image';
import { CtaBand, PageHero } from '../../components/ui/blocks';

export const metadata = {
  title: 'News & events — AGRI EXPO 2026',
  description: 'Harison India at AGRI EXPO 2026, stall A-22A — combine, reaper and baler parts.',
  alternates: { canonical: '/news-events' },
};

export default function News() {
  return (
    <>
      <PageHero
        crumbs={[['Company', '/about-us'], ['News & events']]}
        title="Company news and events."
        lead="Where you can meet the Harison team in person."
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
              from our agriculture range. Visitors to the stall could see the range of spring tines and wire-formed parts and talk to the team about their machines and requirements.
            </p>
          </div>
        </div>
      </section>

      <CtaBand title="Want to meet us?" text="Get in touch to arrange a visit to the plant, or to ask where we will be exhibiting next." />
    </>
  );
}
