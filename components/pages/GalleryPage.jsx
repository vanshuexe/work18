"use client";

import { useCallback, useEffect, useState } from "react";

const Arrow = ({ dir }) => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} />
  </svg>
);

export default function GalleryPage({ gallery }) {
  const [open, setOpen] = useState(null); // { section, index }

  const images = open ? gallery.sections[open.section].images : [];
  const move = useCallback(
    (step) =>
      setOpen((current) => {
        if (!current) return current;
        const list = gallery.sections[current.section].images;
        return { section: current.section, index: (current.index + step + list.length) % list.length };
      }),
    [gallery],
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, move]);

  const current = open ? images[open.index] : null;

  return (
    <div className="bg-white font-manrope text-gray-900">
      <div className="px-3 pt-4 sm:px-4">
        <div className="mx-auto flex min-h-[200px] w-full max-w-[1500px] items-center justify-center rounded-xl bg-gradient-to-r from-[#2a1442] via-[#512178] to-[#1f66d6] md:min-h-[260px]">
          <div className="px-4 py-10 text-center text-white">
            <h1 className="font-poppins text-3xl font-bold md:text-4xl lg:text-5xl">{gallery.title}</h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm opacity-90 sm:text-base lg:text-lg">{gallery.tagline}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        {gallery.sections.map((section, sectionIndex) => (
          <section key={section.title} className={sectionIndex ? "mt-14" : ""}>
            <h2 className="font-poppins text-2xl font-bold text-[#2a1442] sm:text-3xl">
              {section.title}
              <span className="mt-3 block h-1 w-14 rounded bg-[#f47422]" />
            </h2>
            <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {section.images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setOpen({ section: sectionIndex, index })}
                  aria-label={`Open photo: ${image.alt}`}
                  className="group mb-4 block w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading={sectionIndex === 0 && index < 2 ? "eager" : "lazy"}
                    className="block h-auto w-full transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {current ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setOpen(null)}
        >
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[88vh] max-w-full rounded-lg object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30"
          >
            &times;
          </button>
          {images.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(event) => {
                  event.stopPropagation();
                  move(-1);
                }}
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"
              >
                <Arrow dir="left" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(event) => {
                  event.stopPropagation();
                  move(1);
                }}
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"
              >
                <Arrow dir="right" />
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
