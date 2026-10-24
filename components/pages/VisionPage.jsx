import SiteLink from "../SiteLink";
import SectionHeading, { bodyText } from "../SectionHeading";
import Rich, { mark } from "../Rich";

// The foundations named in the vision statement itself.
const foundations = ["Quality", "Technology", "Innovation", "Manufacturing excellence", "Long-term customer relationships"];

export default function VisionPage({ company }) {
  const vision = company.company.find((section) => section.title === "Our Vision");
  const [tagline, statement, foundation, reach] = vision.paragraphs;

  return (
    <div className="bg-white font-manrope text-gray-900">
      <div className="px-3 pt-4 sm:px-4">
        <h1 className="sr-only">Our Vision</h1>
        <img
          src="/new-images/our-vision-banner.webp"
          alt="Our Vision: from India to the world. Global expansion, strong partnerships, innovative solutions, diverse industries, quality without compromise and a sustainable tomorrow."
          width="1983"
          height="793"
          className="mx-auto block h-auto w-full max-w-[1500px] rounded-xl bg-white"
        />
      </div>

      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f47422]">{tagline}</p>
        <p className="mt-4 font-poppins text-xl font-semibold leading-relaxed text-[#2a1442] sm:text-2xl">
          <Rich text={mark(statement, { orange: ["globally trusted Indian coatings company"], bold: ["industrial, infrastructure, engineering, construction and decorative"] })} />
        </p>
      </section>

      <section className="border-t border-gray-200">
        <div className="mx-auto grid max-w-4xl gap-6 px-5 py-12 sm:px-8 sm:py-16">
          <SectionHeading icon="foundation" title="What it rests on" />
          <div>
            <p className={bodyText}>
              <Rich text={mark(foundation, { bold: ["quality, technology, innovation, manufacturing excellence and long-term customer relationships"] })} />
            </p>
            <ol className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
              {foundations.map((item, index) => (
                <li key={item} className="flex items-baseline gap-5 py-3.5">
                  <span className="w-6 font-poppins text-sm font-bold text-[#f47422]">{index + 1}</span>
                  <span className="text-base font-semibold text-gray-900 sm:text-[17px]">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200">
        <div className="mx-auto grid max-w-4xl gap-6 px-5 py-12 sm:px-8 sm:py-16">
          <SectionHeading icon="globe" title="From India to the world" />
          <p className={bodyText}>
            <Rich text={mark(reach, { orange: ["respected and dependable name in the global paints and coatings industry"] })} />
          </p>
        </div>
      </section>

      <nav className="border-t border-gray-200 bg-[#f6f1fa]" aria-label="Related pages">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <SiteLink href="/about-us" className="text-sm font-bold text-[#512178] hover:underline">
            ← About Aeropolish
          </SiteLink>
          <SiteLink href="/our-mission" className="text-sm font-bold text-[#512178] hover:underline">
            Our Mission →
          </SiteLink>
        </div>
      </nav>
    </div>
  );
}
