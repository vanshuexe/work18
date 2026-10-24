import PageBanner from "../PageBanner";
import SiteLink from "../SiteLink";
import SectionHeading, { bodyText } from "../SectionHeading";
import Rich from "../Rich";

const Paragraphs = ({ items }) =>
  items.map((item, index) => {
    if (typeof item === "string") {
      return (
        <p key={index} className={bodyText}>
          <Rich text={item} />
        </p>
      );
    }
    if (item.sub) {
      return (
        <p key={index} className="font-poppins text-lg font-bold text-[#f47422] sm:text-xl">
          {item.sub}
        </p>
      );
    }
    return (
      <ul key={index} className="space-y-2">
        {item.list.map((entry) => (
          <li key={entry} className="flex gap-3 text-[15px] font-bold leading-relaxed text-gray-900 sm:text-[17px]">
            <span className="mt-[11px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#f47422]" />
            <span>{entry}</span>
          </li>
        ))}
      </ul>
    );
  });

export default function AboutPage({ about }) {
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
          <div className="mx-auto grid max-w-4xl gap-6 px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
            <SectionHeading icon={section.icon} title={section.title} />
            <div className="space-y-6">
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
