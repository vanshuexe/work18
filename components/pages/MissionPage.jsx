import content from "../../config/company";
import PageBanner from "../PageBanner";
import SiteLink from "../SiteLink";

const mission = content.company.find((section) => section.title === "Our Mission");

export default function MissionPage() {
  const paragraphs = mission.paragraphs;
  const tagline = paragraphs[0];
  const lead = paragraphs[1];
  const start = paragraphs.indexOf("We are committed to:");
  const end = paragraphs.indexOf("Our Mission is simple:");
  const commitments = paragraphs.slice(start + 1, end);
  const promise = paragraphs[end + 1];

  return (
    <div className="bg-white font-manrope text-gray-900">
      <div className="px-3 pt-4 sm:px-4">
        <PageBanner as="h1" tall image="/new-images/industrial-paints.svg" title="Our Mission" tagline={tagline} />
      </div>

      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="font-poppins text-xl font-semibold leading-relaxed text-[#2a1442] sm:text-2xl">{lead}</p>
      </section>

      <section className="border-t border-gray-200">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[320px_1fr] lg:gap-16">
          <h2 className="font-poppins text-2xl font-bold text-[#2a1442] sm:text-3xl">We are committed to</h2>
          <ol className="divide-y divide-gray-200 border-y border-gray-200">
            {commitments.map((item, index) => (
              <li key={item} className="flex items-baseline gap-5 py-4">
                <span className="w-6 flex-shrink-0 font-poppins text-sm font-bold text-[#f47422]">{index + 1}</span>
                <span className="text-[15px] leading-relaxed text-gray-800 sm:text-base">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-gray-200">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[320px_1fr] lg:gap-16">
          <h2 className="font-poppins text-2xl font-bold text-[#2a1442] sm:text-3xl">In one line</h2>
          <p className="border-l-4 border-[#f47422] pl-5 font-poppins text-lg font-semibold leading-relaxed text-[#2a1442] sm:text-xl">
            {promise}
          </p>
        </div>
      </section>

      <nav className="border-t border-gray-200 bg-[#f6f1fa]" aria-label="Related pages">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <SiteLink href="/our-vision" className="text-sm font-bold text-[#512178] hover:underline">
            ← Our Vision
          </SiteLink>
          <SiteLink href="/about-us" className="text-sm font-bold text-[#512178] hover:underline">
            About Aeropolish →
          </SiteLink>
        </div>
      </nav>
    </div>
  );
}
