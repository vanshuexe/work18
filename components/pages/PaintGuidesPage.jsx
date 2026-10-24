import PageBanner from "../PageBanner";

// The guide text lives in data/paint-guides.html (converted from the Paint Guides Word document).
export default function PaintGuidesPage({ html = "", title = "Paint Application Guides", tagline = "Prepare Right. Apply Right. Protect Longer." } = {}) {
  return (
    <div className="bg-white font-manrope text-gray-900">
      <div className="px-3 pt-4 sm:px-4">
        <PageBanner
          as="h1"
          tall
          image="/new-images/banner-interior.svg"
          title={title}
          tagline={tagline}
        />
      </div>

      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        <article className="guide-content" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="mt-12 border-t border-gray-200 pt-6">
          <a
            href="/docs/Paint-Guides.docx"
            download
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#512178] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#431b64]"
          >
            Download as Word document
          </a>
        </div>
      </section>
    </div>
  );
}
