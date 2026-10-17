import about from "../../config/about";
import PageBanner from "../PageBanner";
import SiteLink from "../SiteLink";

const Paragraphs = ({ items }) =>
  items.map((text, index) => (
    <p key={index} className="text-[15px] leading-[1.9] text-gray-700 sm:text-[17px]">
      {text}
    </p>
  ));

// Outline icons (24x24, currentColor strokes).
const ICONS = {
  building: (
    <>
      <path d="M4 21V7l8-4 8 4v14" />
      <path d="M9 21v-5h6v5M8 10h.01M12 10h.01M16 10h.01M8 13.5h.01M12 13.5h.01M16 13.5h.01" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
      <path d="M12 3V1M12 23v-2M3 12H1M23 12h-2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.3 2.9 7.6 7 9.5 4.1-1.9 7-5.2 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4.5" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21V10l6 3.5V10l6 3.5V6h3v15H3Z" />
      <path d="M7 17h.01M11 17h.01M15 17h.01" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 2c3.5 2.2 5 5.8 5 9.5L14.5 15h-5L7 11.5C7 7.8 8.5 4.2 12 2Z" />
      <circle cx="12" cy="9" r="1.6" />
      <path d="m7 12-3 3 3 .5M17 12l3 3-3 .5M10 19c0 1.5.8 2.5 2 3 1.2-.5 2-1.5 2-3" />
    </>
  ),
};

function SectionIcon({ name }) {
  if (!ICONS[name]) return null;
  return (
    <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6f1fa] text-[#512178]">
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {ICONS[name]}
      </svg>
    </span>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900 font-manrope">
      {/* Banner */}
      <div className="px-3 pt-4 sm:px-4">
        <PageBanner
          as="h1"
          tall
          image="/new-images/careers.svg"
          title="About Aeropolish"
          tagline="From Industrial Coatings to Everyday Paints."
        />
      </div>

      {/* Intro */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="max-w-xl text-lg leading-relaxed text-gray-700">{about.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <SiteLink
              href="/interior-paints"
              className="inline-flex min-h-[48px] items-center rounded-xl bg-[#512178] px-6 text-sm font-bold text-white transition-colors hover:bg-[#431b64]"
            >
              See our products
            </SiteLink>
            <SiteLink
              href="/client"
              className="inline-flex min-h-[48px] items-center rounded-xl border border-[#512178]/30 bg-white px-6 text-sm font-bold text-[#512178] transition-colors hover:border-[#512178]"
            >
              Talk to us
            </SiteLink>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-[460px] items-end justify-center gap-5 rounded-3xl bg-gradient-to-b from-[#f8f4fc] to-[#efe7f6] p-6 sm:p-8 sm:gap-7 relative">
          <div className="product-3d-wrapper">
            <img
              src="/new-images/about-industrial-tin.png"
              alt="Aeropolish industrial quick drying paint, 20 litre drum"
              className="float-product-1 w-full h-auto object-contain select-none cursor-pointer"
              width="900"
              height="1000"
              loading="lazy"
            />
            <div className="product-ground-shadow float-shadow-1" />
          </div>
          <div className="product-3d-wrapper">
            <img
              src="/new-images/about-interior-bucket.png"
              alt="Aeropolish premium interior paint, 20 litre bucket"
              className="float-product-2 w-full h-auto object-contain select-none cursor-pointer"
              width="900"
              height="1000"
              loading="lazy"
            />
            <div className="product-ground-shadow float-shadow-2" />
          </div>
        </div>
      </section>

      {/* Long-form sections */}
      {about.sections.map((section, index) => (
        <section key={section.title} className={index ? "border-t border-gray-200" : ""}>
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[320px_1fr] lg:gap-16 lg:py-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionIcon name={section.icon} />
              <h2 className="font-poppins text-2xl font-bold text-[#2a1442] sm:text-3xl">{section.title}</h2>
            </div>
            <div className="max-w-3xl space-y-6">
              <Paragraphs items={section.paragraphs} />
              {section.title === "Who we are" ? (
                <div className="pt-2">
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-500">What we make</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {about.categories.map((name) => (
                      <li
                        key={name}
                        className="rounded-lg border border-[#512178]/20 bg-[#f6f1fa] px-3.5 py-2 text-sm font-semibold text-[#512178]"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {section.slogan ? (
                <p className="pt-2 font-poppins text-xl font-bold text-[#512178] sm:text-2xl">{section.slogan}</p>
              ) : null}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
