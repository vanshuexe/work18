import Image from 'next/image';
import Link from 'next/link';
import FamilyTiles from '../components/catalog/FamilyTiles';
import { Arrow, CtaBand, Photo, ProductImage, SectionHead } from '../components/ui/blocks';
import { featuredProducts } from '../lib/catalog';
import HeroSlider from '../components/sections/HeroSlider';
import { customers, site } from '../lib/site';

export const metadata = {
  title: { absolute: 'Harison Cycle Industries — Bicycle & agriculture parts manufacturer, Ludhiana' },
  alternates: { canonical: '/' },
};

const facts = [
  [String(site.founded), 'Manufacturing engineering goods since'],
  [site.area, 'Factory area in Ludhiana, Punjab'],
  ['60+', 'Models of carriers and stands'],
  ['India & export', 'Domestic and overseas customers'],
];

const slides = [
  { src: '/images/brand/original-cycle-hero.webp', alt: 'Rear carrier fitted on a bicycle against a dark blue background', title: 'Bicycle parts', text: 'Carriers, stands and accessories' },
  { src: '/images/events/agri-expo-2026.jpeg', alt: 'Harison India stall showing combine harvester, reaper and baler parts', title: 'Agriculture parts', text: 'Combine harvester, reaper and baler parts' },
  { src: '/images/agriculture/tine-12.webp', alt: 'Yellow double torsion spring tine', title: 'Agriculture parts', text: 'Spring tines and wire-formed parts', contain: true },
];

const process = [
  ['Wire straightening & CNC forming', 'Wire is straightened and formed on CNC machines to the shape of the component.'],
  ['Pressing', 'Hydraulic and power presses cut and form sheet and tube sections.'],
  ['Welding', 'Projection and butt welding join formed parts into rigid assemblies.'],
  ['Finishing', 'Shot blasting, then powder or black coating, cured in an electric furnace.'],
  ['Inspection', 'Material is checked on arrival and components are inspected during and after production.'],
  ['Packing & dispatch', 'Bubble wrap and cartons for transit — packed to the order, domestic or export.'],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>
              Bicycle &amp; agriculture parts, <em>made in Ludhiana.</em>
            </h1>
            <p className="lead">
              Harison Cycle Industries forms, welds, finishes and packs bicycle carriers, stands and accessories — and
              parts for combines, reapers and balers — from wire, tube and sheet metal, for buyers in India and overseas.
            </p>
            <div className="hero-actions">
              <Link href="/products" className="btn btn--primary">Explore products</Link>
              <Link href="/enquiry" className="btn btn--ghost-light">Request a quote</Link>
            </div>
          </div>
          <HeroSlider slides={slides} />
        </div>
        <div className="facts">
          <div className="container facts-grid">
            {facts.map(([value, label]) => (
              <div className="fact" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead index="01" label="Products" title="Two ranges, one factory." align="split">
            <p>Every component is made in-house. Choose a range to see what we make.</p>
          </SectionHead>
          <FamilyTiles />
        </div>
      </section>

      <section className="section section--bone">
        <div className="container">
          <SectionHead index="02" label="From the catalogue" title="Carriers, stands and accessories." align="split">
            <Link href="/carriers" className="text-link">View all carriers <Arrow /></Link>
          </SectionHead>
          <ul className="featured-grid">
            {featuredProducts.map((item) => (
              <li key={item.id}>
                <Link href={`/enquiry?product=${encodeURIComponent(`${item.code} ${item.name}`)}&type=Bicycle%20parts`} className="featured-card">
                  <ProductImage src={item.image} alt={`${item.name}, ${item.code}`} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  <span className="featured-card-body">
                    <span className="code">{item.code}</span>
                    <h3>{item.name}</h3>
                    <p>{[item.finish, item.size].filter(Boolean).join(' · ') || 'Bicycle accessory'}</p>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <SectionHead index="03" label="Capabilities" title="Formed, welded, finished and packed under one roof." align="split">
            <p>From raw wire and tube to a packed carton: the steps run in our own plant, with inspection throughout.</p>
          </SectionHead>
          <ol className="steps">
            {process.map(([title, text], index) => (
              <li className="step" key={title}>
                <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <p style={{ marginTop: 40 }}>
            <Link href="/services" className="btn btn--primary">Our services</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split-copy">
            <p className="kicker"><span className="mono">04</span>Our story</p>
            <h2>Light engineering, since {site.founded}.</h2>
            <p>
              Harison was founded by the late S. Bahadur Singh Matharoo, with the blessings of his father, the late
              S. Hari Singh Matharoo. What began as engineering goods manufacture is now a {site.area} operation in
              Ludhiana, one of India’s main centres for cycle and light engineering.
            </p>
            <ul className="tick-list">
              <li>Bicycle carriers, stands and accessories under the Harisons and Bahadur brands</li>
              <li>Agriculture parts for combines, reapers and balers under the Harison India name</li>
              <li>Wire products — display racks, filter stands and custom forms</li>
            </ul>
            <Link href="/about-us" className="text-link">Read our story <Arrow /></Link>
          </div>
          <div className="split-media">
            <Photo src="/images/recreated/infrastructure/new1.png" alt="Harison factory building in the evening" ratio="4 / 3.4" sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section section--tight section--bone">
        <div className="container">
          <p className="kicker">Supplied to cycle manufacturers including</p>
          <ul className="logos-row">
            {customers.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container news-feature">
          <Link href="/news-events" className="photo" style={{ aspectRatio: '4 / 4.4', maxWidth: 520 }} aria-label="News and events">
            <Image src="/images/events/agri-expo-2026.jpeg" alt="Harison India exhibition stall at AGRI EXPO 2026" fill sizes="(max-width: 900px) 100vw, 40vw" />
          </Link>
          <div className="split-copy">
            <p className="kicker"><span className="mono">05</span>News &amp; events</p>
            <h2>Meet us at the stall.</h2>
            <p>
              We exhibit regularly. Most recently, Harison India took a stand at AGRI EXPO 2026, showing combine,
              reaper and baler parts. Our exhibition archive goes back to 2011.
            </p>
            <Link href="/news-events" className="text-link">News &amp; events <Arrow /></Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
