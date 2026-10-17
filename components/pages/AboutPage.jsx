import content from "../../config/company";
import PageBanner from "../PageBanner";
import SiteLink from "../SiteLink";

const byTitle = (title) => content.company.find((section) => section.title === title);

// Splits a section's paragraphs into plain paragraphs and bullet lists.
// A paragraph ending in ":" introduces a list; short items end at the first full sentence,
// long items end at the next ":" line.
function parseBlocks(paragraphs) {
  const blocks = [];
  for (let i = 0; i < paragraphs.length; i++) {
    const text = paragraphs[i];
    blocks.push({ type: "p", text });
    if (!text.endsWith(":")) continue;
    const items = [];
    const short = paragraphs[i + 1] && paragraphs[i + 1].length < 50;
    while (i + 1 < paragraphs.length) {
      const next = paragraphs[i + 1];
      if (short ? next.length >= 50 : next.endsWith(":")) break;
      items.push(next);
      i++;
    }
    blocks.push({ type: "list", items, short });
  }
  return blocks;
}

function Blocks({ paragraphs }) {
  return parseBlocks(paragraphs).map((block, index) => {
    if (block.type === "list") {
      return (
        <ul
          key={index}
          className={`grid gap-x-8 gap-y-2.5 ${block.short ? "sm:grid-cols-2" : ""}`}
        >
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-gray-700">
              <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#f47422]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={index} className="text-[15px] sm:text-base leading-[1.8] text-gray-700">
        {block.text}
      </p>
    );
  });
}

const stories = ["Our Approach", "Quality & Consistency", "Serving Multiple Industries"];

export default function AboutPage() {
  const about = byTitle("About Us");
  const future = byTitle("Our Future");

  const slogan = future.paragraphs.find((p) => p.startsWith("From Industrial Coatings"));
  const categories = future.paragraphs
    .find((p) => p.includes("|"))
    .split("|")
    .map((c) => c.trim());
  const futureText = future.paragraphs.filter((p) => p !== slogan && !p.includes("|"));

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
          <p className="max-w-xl text-lg leading-relaxed text-gray-700">{about.paragraphs[0]}</p>
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

      {/* Who we are */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:gap-16">
          <h2 className="font-poppins text-2xl font-bold text-[#2a1442] sm:text-3xl lg:sticky lg:top-28 lg:self-start">
            Who we are
          </h2>
          <div className="space-y-5">
            <Blocks paragraphs={about.paragraphs.slice(1)} />
            <div className="pt-4">
              <p className="text-sm font-bold uppercase tracking-wider text-gray-500">What we make</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {categories.map((name) => (
                  <li
                    key={name}
                    className="rounded-lg border border-[#512178]/20 bg-[#f6f1fa] px-3.5 py-2 text-sm font-semibold text-[#512178]"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      {stories.map((title) => {
        const section = byTitle(title);
        return (
          <section key={title} className="border-t border-gray-200">
            <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[320px_1fr] lg:gap-16">
              <h2 className="font-poppins text-2xl font-bold text-[#2a1442] sm:text-3xl lg:sticky lg:top-28 lg:self-start">
                {title}
              </h2>
              <div className="space-y-5">
                <Blocks paragraphs={section.paragraphs} />
              </div>
            </div>
          </section>
        );
      })}

      {/* Future */}
      <section>
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[320px_1fr] lg:gap-16 lg:py-20">
          <h2 className="font-poppins text-2xl font-bold text-[#2a1442] sm:text-3xl lg:sticky lg:top-28 lg:self-start">
            Our future
          </h2>
          <div className="space-y-5">
            <Blocks paragraphs={futureText} />
            <p className="pt-2 font-poppins text-xl font-bold text-[#512178] sm:text-2xl">{slogan}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
