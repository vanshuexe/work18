import SiteLink from "../SiteLink";

// Outline icons (24x24, drawn with currentColor strokes).
const ICONS = {
  drop: <path d="M12 3s6 6.2 6 10.5a6 6 0 0 1-12 0C6 9.2 12 3 12 3Z" />,
  rain: (
    <>
      <path d="M7 15a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 7.5a3.8 3.8 0 0 1-.5 7.5H7Z" />
      <path d="m8 18-1 2.5M12 18l-1 2.5M16 18l-1 2.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.3 2.9 7.6 7 9.5 4.1-1.9 7-5.2 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4.5" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
      <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
    </>
  ),
  roller: (
    <>
      <rect x="3" y="3" width="15" height="6" rx="2" />
      <path d="M18 6h2.5v5H12v3.5" />
      <rect x="10.5" y="14.5" width="3" height="6.5" rx="1" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-7.5 9 7.5" />
      <path d="M5.5 9.5V20h13V9.5M10 20v-5.5h4V20" />
    </>
  ),
  bath: (
    <>
      <path d="M3 12h18v2.5a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V12Z" />
      <path d="M5.5 12V6.5A2.5 2.5 0 0 1 8 4h.5A2.5 2.5 0 0 1 11 6.5M7 19.5 6 21.5M17 19.5l1 2" />
    </>
  ),
  wall: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 9.3h18M3 14.7h18M9 4v5.3M15 9.3v5.4M9 14.7V20" />
    </>
  ),
  foundation: (
    <>
      <path d="M3 8h18M3 8l9-4.5L21 8" />
      <path d="M5 8v9.5M19 8v9.5M3 17.5h18M3 21h18M9 11v6M15 11v6" />
    </>
  ),
  block: (
    <>
      <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7Z" />
      <path d="m4 8.5 8 4.5 8-4.5M12 13v7" />
    </>
  ),
  waves: <path d="M2.5 8c2.2 0 2.2 2 4.5 2s2.3-2 4.5-2 2.3 2 4.5 2 2.3-2 4.5-2M2.5 13c2.2 0 2.2 2 4.5 2s2.3-2 4.5-2 2.3 2 4.5 2 2.3-2 4.5-2M2.5 18c2.2 0 2.2 2 4.5 2s2.3-2 4.5-2 2.3 2 4.5 2 2.3-2 4.5-2" />,
};

function Icon({ name, className = "h-6 w-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

export default function WaterproofingPage({ content } = {}) {
  return (
    <div className="bg-white font-manrope text-gray-900">
      <div className="px-3 pt-4 sm:px-4">
        <div className="mx-auto flex min-h-[220px] w-full max-w-[1500px] items-center justify-center rounded-xl bg-gradient-to-r from-[#04204f] via-[#062f74] to-[#1f66d6] md:min-h-[280px]">
          <div className="px-4 py-10 text-center text-white">
            <h1 className="mx-auto max-w-3xl font-poppins text-3xl font-bold md:text-4xl lg:text-5xl">{content.title}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-base font-semibold text-[#ffb27a] sm:text-lg lg:text-xl">{content.tagline}</p>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-14">
          <div>
            {content.intro.map((paragraph, index) => (
              <p key={index} className={`text-[15px] leading-[1.8] text-gray-700 sm:text-base ${index ? "mt-4" : ""}`}>
                {paragraph}
              </p>
            ))}
            <div className="mt-8">
              <SiteLink
                href="/#contact"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#f47422] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#d75b0b]"
              >
                Enquire now
              </SiteLink>
            </div>
          </div>
          <figure className="rounded-2xl border border-gray-200 bg-gradient-to-br from-[#eef3fb] to-white p-6 text-center shadow-sm sm:p-8">
            <img
              src={content.featured.image}
              alt={content.featured.imageAlt}
              width="1277"
              height="1231"
              className="mx-auto h-auto w-full max-w-[340px] object-contain"
            />
            <figcaption className="mt-5">
              <p className="font-poppins text-lg font-bold text-[#062f74]">{content.featured.name}</p>
              <p className="mt-1 text-sm text-gray-600">{content.featured.text}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <h2 className="text-center font-poppins text-2xl font-bold text-[#062f74] sm:text-3xl">Key Features &amp; Benefits</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.features.map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-200 border-t-4 border-t-[#1f66d6] bg-white p-6 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef3fb] text-[#1f66d6]">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-poppins text-lg font-bold text-[#062f74]">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
          <h2 className="text-center font-poppins text-2xl font-bold text-[#062f74] sm:text-3xl">Applications</h2>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {content.applications.map((item) => (
              <li key={item.label} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] leading-relaxed text-gray-700">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#eef3fb] text-[#1f66d6]">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#04204f] via-[#062f74] to-[#1f66d6] text-white">
        <div className="mx-auto max-w-4xl px-5 py-14 text-center sm:px-8 sm:py-20">
          <h2 className="font-poppins text-2xl font-bold sm:text-3xl">Why Choose Aeropolish?</h2>
          <p className="mt-4 text-[15px] leading-[1.8] text-white/90 sm:text-base">{content.why}</p>
          <p className="mt-8 font-poppins text-lg font-semibold text-[#ffb27a] sm:text-xl">{content.closing}</p>
        </div>
      </section>

      <p className="mx-auto max-w-4xl px-5 py-8 text-center text-xs leading-relaxed text-gray-500 sm:px-8 sm:text-sm">
        <strong className="font-bold text-gray-700">Note:</strong> {content.note}
      </p>
    </div>
  );
}
