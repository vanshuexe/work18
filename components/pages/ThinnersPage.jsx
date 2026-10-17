import SiteLink from "../SiteLink";

const Check = () => (
  <svg className="mt-1 h-4 w-4 flex-shrink-0 text-[#512178]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12 5 5 9-10" />
  </svg>
);

export default function ThinnersPage({ thinners } = {}) {
  return (
    <div className="bg-gray-50 font-manrope text-gray-900">
      <div className="px-3 pt-4 sm:px-4">
        <div className="mx-auto flex min-h-[200px] w-full max-w-[1500px] items-center justify-center rounded-xl bg-gradient-to-r from-[#2a1442] via-[#512178] to-[#8a1c3a] md:min-h-[260px]">
          <div className="px-4 py-10 text-center text-white">
            <h1 className="font-poppins text-3xl font-bold md:text-4xl lg:text-5xl">{thinners.title}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm opacity-90 sm:text-base lg:text-lg">{thinners.tagline}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
        {thinners.products.map((product) => (
          <article key={product.name} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
              <div className="flex items-center justify-center bg-gradient-to-br from-[#f6f1fa] to-white p-6 sm:p-10">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  width="1200"
                  height="1321"
                  className="h-auto w-full max-w-[380px] object-contain"
                />
              </div>
              <div className="p-6 sm:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f47422]">{product.subtitle}</p>
                <h2 className="mt-2 font-poppins text-3xl font-bold text-[#2a1442] sm:text-4xl">{product.name}</h2>

                <h3 className="mt-6 font-poppins text-sm font-bold uppercase tracking-wide text-[#512178]">Product Description</h3>
                <p className="mt-2 text-[15px] leading-[1.8] text-gray-700 sm:text-base">{product.description}</p>

                <h3 className="mt-6 font-poppins text-sm font-bold uppercase tracking-wide text-[#512178]">Applications</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {product.applications.map((item) => (
                    <li key={item} className="rounded-full border border-[#e6d9f0] bg-[#f6f1fa] px-3.5 py-1.5 text-sm font-medium text-[#2a1442]">
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-6 font-poppins text-sm font-bold uppercase tracking-wide text-[#512178]">Key Features</h3>
                <ul className="mt-3 space-y-2">
                  {product.features.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-gray-700">
                      <Check />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {product.note ? (
                  <p className="mt-6 rounded-lg border-l-4 border-[#f47422] bg-[#fff7f0] px-4 py-3 text-sm leading-relaxed text-gray-700">
                    <strong className="font-bold text-[#2a1442]">Technical note:</strong> {product.note}
                  </p>
                ) : null}

                <div className="mt-8">
                  <SiteLink
                    href="/#contact"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-black bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gray-100"
                  >
                    Interested?
                  </SiteLink>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
