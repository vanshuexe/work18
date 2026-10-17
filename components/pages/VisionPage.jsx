import content from "../../config/company";
import SiteLink from "../SiteLink";

const vision = content.company.find((section) => section.title === "Our Vision");

// The foundations named in the vision statement itself.
const foundations = ["Quality", "Technology", "Innovation", "Manufacturing excellence", "Long-term customer relationships"];

export default function VisionPage() {
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
        <p className="mt-4 font-poppins text-xl font-semibold leading-relaxed text-[#2a1442] sm:text-2xl">{statement}</p>
      </section>

      <section className="border-t border-gray-200">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[320px_1fr] lg:gap-16">
          <h2 className="font-poppins text-2xl font-bold text-[#2a1442] sm:text-3xl">What it rests on</h2>
          <div>
            <p className="text-[15px] leading-[1.8] text-gray-700 sm:text-base">{foundation}</p>
            <ol className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
              {foundations.map((item, index) => (
                <li key={item} className="flex items-baseline gap-5 py-3.5">
                  <span className="w-6 font-poppins text-sm font-bold text-[#f47422]">{index + 1}</span>
                  <span className="text-base font-semibold text-gray-900">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[320px_1fr] lg:gap-16">
          <h2 className="font-poppins text-2xl font-bold text-[#2a1442] sm:text-3xl">From India to the world</h2>
          <p className="text-[15px] leading-[1.8] text-gray-700 sm:text-base">{reach}</p>
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
