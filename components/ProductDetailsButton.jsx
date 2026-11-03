"use client";

import { useEffect, useRef, useState } from "react";

export default function ProductDetailsButton({ product }) {
  const [open, setOpen] = useState(false);
  const closeButton = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border-2 border-[#512178] px-3 py-2 text-sm font-medium text-[#512178] transition-colors hover:bg-[#512178] hover:text-white"
        aria-haspopup="dialog"
      >
        View details
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`product-details-title-${product._id}`}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              ref={closeButton}
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              aria-label="Close product details"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  d="m6 6 12 12M18 6 6 18"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <img
              src={product.imageLink}
              alt={product.productNameEn}
              className="mb-5 h-44 w-full rounded-xl bg-gray-50 object-contain p-3"
            />
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#512178]">
              {product.subcategoryEn}
              {product.productCode ? ` · ${product.productCode}` : ""}
            </p>
            <h2
              id={`product-details-title-${product._id}`}
              className="pr-8 text-2xl font-bold text-gray-900"
            >
              {product.productNameEn}
            </h2>
            {product.bioEn ? (
              <p className="mt-4 whitespace-pre-line text-sm leading-6 text-gray-700">
                {product.bioEn}
              </p>
            ) : (
              <p className="mt-4 text-sm text-gray-500">
                Product details will be available soon.
              </p>
            )}
            {product.tags?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#f6f1fa] px-3 py-1 text-xs font-medium text-[#512178]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </section>
        </div>
      ) : null}
    </>
  );
}
