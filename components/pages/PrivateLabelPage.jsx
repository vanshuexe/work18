import SiteLink from "../SiteLink";

const ctaClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-bold uppercase tracking-wide transition-colors";

export default function PrivateLabelPage({ content }) {
  const c = content;
  return (
    <div className="bg-white font-manrope text-gray-900">
      <div className="px-3 pt-4 sm:px-4">
        <img
          src={c.banner.image}
          alt={c.banner.alt}
          width={c.banner.width}
          height={c.banner.height}
          className="mx-auto block h-auto w-full max-w-[1500px] rounded-xl"
        />
      </div>

      <section className="mx-auto max-w-4xl px-5 py-12 text-center sm:px-8 sm:py-16">
        <h1 className="font-poppins text-3xl font-bold text-[#0b2a6b] sm:text-4xl lg:text-5xl">
          {c.title} <span className="text-[#f47422]">{c.titleAccent}</span>
        </h1>
        <p className="mt-3 font-poppins text-lg font-semibold text-[#0b2a6b] sm:text-xl">
          {c.subtitle} <span className="text-[#f47422]">{c.subtitleAccent}</span>
        </p>
        <p className="mt-6 text-base font-bold leading-[1.8] text-[#0b2a6b] sm:text-lg">
          <span className="text-[#f47422]">{c.introQuestion}</span> {c.introRest}
        </p>
        {c.introParagraphs.map((text, index) => (
          <p key={index} className="mt-4 text-[15px] leading-[1.8] text-[#0b2a6b] sm:text-base">
            {text}
          </p>
        ))}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <SiteLink href={c.buttons.primaryLink} className={`${ctaClass} bg-[#f47422] text-white hover:bg-[#d75b0b]`}>
            {c.buttons.primary}
          </SiteLink>
          <SiteLink href={c.buttons.secondaryLink} className={`${ctaClass} bg-[#0b2a6b] text-white hover:bg-[#081f50]`}>
            {c.buttons.secondary}
          </SiteLink>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <h2 className="text-center font-poppins text-2xl font-bold text-[#f47422] sm:text-3xl">{c.partnersTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {c.partners.map((item, index) => (
              <div key={index} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6f1fa] font-poppins text-sm font-bold text-[#512178]">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-poppins text-base font-bold leading-snug text-[#0b2a6b]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#0b2a6b]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <h2 className="text-center font-poppins text-2xl font-bold text-[#f47422] sm:text-3xl">{c.offersTitle}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.offers.map((item, index) => (
              <div key={index} className="rounded-2xl border border-gray-200 border-t-4 border-t-[#f47422] bg-white p-6 shadow-sm">
                <h3 className="font-poppins text-lg font-normal text-[#0b2a6b]">{item.title}</h3>
                <p className="mt-2 text-[15px] font-normal leading-relaxed text-[#0b2a6b]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#0b2a6b] via-[#1b2f78] to-[#512178] text-white">
        <div className="mx-auto max-w-4xl px-5 py-14 text-center sm:px-8 sm:py-20">
          <h2 className="font-poppins text-2xl font-bold sm:text-3xl lg:text-4xl">{c.closing.title}</h2>
          <p className="mt-4 text-base leading-[1.8] text-white/90 sm:text-lg">{c.closing.lead}</p>
          <p className="mt-4 text-[15px] leading-[1.8] text-white/80 sm:text-base">{c.closing.paragraph}</p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">{c.closing.note}</p>
          <h3 className="mt-10 font-poppins text-xl font-bold">{c.closing.ctaTitle}</h3>
          <p className="mt-2 text-[15px] text-white/85 sm:text-base">{c.closing.ctaText}</p>
          <div className="mt-8">
            <SiteLink href={c.closing.buttonLink} className={`${ctaClass} bg-[#f47422] text-white hover:bg-[#d75b0b]`}>
              {c.closing.button}
            </SiteLink>
          </div>
        </div>
      </section>
    </div>
  );
}
