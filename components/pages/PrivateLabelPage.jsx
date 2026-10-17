import SiteLink from "../SiteLink";

// Content comes from the "Private label for website" document.
const partners = [
  { title: "Importers & International Buyers", text: "Develop your own paint brand for domestic and international markets." },
  { title: "Retail Chains & Dealer Networks", text: "Expand your product portfolio with paints carrying your brand identity." },
  { title: "Wholesalers & Distributors", text: "Build a differentiated product offering for your customer network." },
  { title: "Existing Paint Brands", text: "Expand your range without establishing your own manufacturing facility." },
  { title: "Investors & Entrepreneurs", text: "Explore opportunities to establish and grow a paint brand." },
];

const offers = [
  {
    title: "Product Selection",
    text: "Choose from our available range of industrial coatings, synthetic enamels, primers, protective coatings, decorative paints and other suitable products.",
  },
  {
    title: "Custom Branding & Packaging",
    text: "Develop your brand identity through customised labels, product names and packaging options, subject to technical and production requirements.",
  },
  {
    title: "Product & Colour Options",
    text: "Explore available formulations, colours, finishes and product specifications to suit your target market.",
  },
  {
    title: "Manufacturing Support",
    text: "Benefit from our manufacturing capabilities, product knowledge and quality-focused processes.",
  },
  {
    title: "Portfolio Expansion",
    text: "Explore suitable product additions and formulation improvements as your business and market requirements evolve.",
  },
];

const ctaClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-bold uppercase tracking-wide transition-colors";

export default function PrivateLabelPage() {
  return (
    <div className="bg-white font-manrope text-gray-900">
      <div className="px-3 pt-4 sm:px-4">
        <img
          src="/new-images/private-label-banner.webp"
          alt="Aeropolish private label paint manufacturing: your brand, our manufacturing expertise"
          width="2000"
          height="752"
          className="mx-auto block h-auto w-full max-w-[1500px] rounded-xl"
        />
      </div>

      <section className="mx-auto max-w-4xl px-5 py-12 text-center sm:px-8 sm:py-16">
        <h1 className="font-poppins text-3xl font-bold text-[#0b2a6b] sm:text-4xl lg:text-5xl">
          Private Label Paint <span className="text-[#f47422]">Manufacturing</span>
        </h1>
        <p className="mt-3 font-poppins text-lg font-semibold text-[#2a1442] sm:text-xl">
          Your Brand. <span className="text-[#f47422]">Our Manufacturing Expertise.</span>
        </p>
        <p className="mt-6 text-base leading-[1.8] text-gray-700 sm:text-lg">
          Have a vision for your own paint brand? Aeropolish helps turn your ideas into market-ready paint and coating
          products under your own brand name.
        </p>
        <p className="mt-4 text-[15px] leading-[1.8] text-gray-600 sm:text-base">
          Whether you are an importer, distributor, wholesaler, retail chain, established manufacturer or entrepreneur
          looking to enter the paint industry, we offer private-label manufacturing solutions designed around your
          business goals.
        </p>
        <p className="mt-4 text-[15px] leading-[1.8] text-gray-600 sm:text-base">
          From product selection and colour customisation to packaging and brand labelling, we help you build a paint
          portfolio that reflects your identity and market requirements.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <SiteLink href="/client" className={`${ctaClass} bg-[#f47422] text-white hover:bg-[#d75b0b]`}>
            Enquire about private label →
          </SiteLink>
          <SiteLink href="/#contact" className={`${ctaClass} bg-[#0b2a6b] text-white hover:bg-[#081f50]`}>
            Contact our team →
          </SiteLink>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <h2 className="text-center font-poppins text-2xl font-bold text-[#2a1442] sm:text-3xl">
            Who Can Partner With Us?
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {partners.map((item, index) => (
              <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6f1fa] font-poppins text-sm font-bold text-[#512178]">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-poppins text-base font-bold leading-snug text-[#2a1442]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <h2 className="text-center font-poppins text-2xl font-bold text-[#2a1442] sm:text-3xl">What We Offer</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-200 border-t-4 border-t-[#f47422] bg-white p-6 shadow-sm">
                <h3 className="font-poppins text-lg font-bold text-[#2a1442]">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#0b2a6b] via-[#1b2f78] to-[#512178] text-white">
        <div className="mx-auto max-w-4xl px-5 py-14 text-center sm:px-8 sm:py-20">
          <h2 className="font-poppins text-2xl font-bold sm:text-3xl lg:text-4xl">Build Your Paint Brand With Aeropolish</h2>
          <p className="mt-4 text-base leading-[1.8] text-white/90 sm:text-lg">
            You bring the brand vision. We bring manufacturing expertise and product development support.
          </p>
          <p className="mt-4 text-[15px] leading-[1.8] text-white/80 sm:text-base">
            Our objective is to help businesses enter, expand and compete in the paint market with products tailored to
            their commercial needs.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Private-label projects may require minimum order quantities, consistent purchasing volumes and mutually agreed
            product specifications.
          </p>
          <h3 className="mt-10 font-poppins text-xl font-bold">Ready to launch your own paint brand?</h3>
          <p className="mt-2 text-[15px] text-white/85 sm:text-base">
            Let&apos;s discuss your product range, packaging requirements, target market and manufacturing volumes.
          </p>
          <div className="mt-8">
            <SiteLink href="/client" className={`${ctaClass} bg-[#f47422] text-white hover:bg-[#d75b0b]`}>
              Enquire about private label →
            </SiteLink>
          </div>
        </div>
      </section>
    </div>
  );
}
