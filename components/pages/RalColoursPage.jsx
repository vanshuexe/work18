"use client";

import { useMemo, useState } from "react";
import PageBanner from "../PageBanner";

const groups = [
  { key: "all", label: "All" },
  { key: "1", label: "Yellow & Beige" },
  { key: "2", label: "Orange" },
  { key: "3", label: "Red" },
  { key: "4", label: "Violet" },
  { key: "5", label: "Blue" },
  { key: "6", label: "Green" },
  { key: "7", label: "Grey" },
  { key: "8", label: "Brown" },
  { key: "9", label: "White & Black" },
];

export default function RalColoursPage({ colours }) {
  const [group, setGroup] = useState("all");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^ral\s*/, "");
    return colours.filter(
      (c) =>
        (group === "all" || c.code.startsWith(group)) &&
        (!q || c.code.includes(q) || c.name.toLowerCase().includes(q) || c.hex.toLowerCase().includes(q)),
    );
  }, [colours, group, query]);

  const copy = async (colour) => {
    const text = `RAL ${colour.code}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); the code stays selectable on screen.
    }
    setCopied(colour.code);
    setTimeout(() => setCopied((current) => (current === colour.code ? "" : current)), 1500);
  };

  return (
    <div className="bg-white font-manrope text-gray-900">
      <div className="px-3 pt-4 sm:px-4">
        <PageBanner
          as="h1"
          image="/new-images/interior-paints.svg"
          title="RAL Colours"
          tagline="RAL Classic colour reference. Tap a colour to copy its code."
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by code or name, e.g. 5015 or Sky blue"
            aria-label="Search RAL colours"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base focus:border-[#512178] focus:outline-none lg:max-w-md"
          />
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-hide lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0" role="group" aria-label="Colour family">
            {groups.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setGroup(item.key)}
                aria-pressed={group === item.key}
                className={`min-h-[44px] flex-shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors ${
                  group === item.key
                    ? "border-[#512178] bg-[#512178] text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-[#512178]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-5 text-sm text-gray-500" aria-live="polite">
          {visible.length} {visible.length === 1 ? "colour" : "colours"}
        </p>

        {visible.length ? (
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {visible.map((colour) => (
              <li key={colour.code}>
                <button
                  type="button"
                  onClick={() => copy(colour)}
                  className="group block w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-left transition-shadow hover:shadow-md focus-visible:shadow-md"
                  aria-label={`Copy RAL ${colour.code}, ${colour.name}`}
                >
                  <span className="relative block h-24 sm:h-28" style={{ backgroundColor: colour.hex }}>
                    {copied === colour.code && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-bold text-white">
                        Copied
                      </span>
                    )}
                  </span>
                  <span className="block px-3 pb-3 pt-2.5">
                    <span className="block text-sm font-bold text-gray-900">RAL {colour.code}</span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-gray-600">{colour.name}</span>
                    <span className="mt-1 block text-xs uppercase text-gray-400">{colour.hex}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-16 text-center text-gray-500">No colours match your search.</p>
        )}

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-gray-500">
          Colours shown are for guidance only. The displayed colour depends on your screen, and pearl or metallic colours cannot be
          shown accurately. The finished colour may differ from what you see here.
        </p>
      </div>
    </div>
  );
}
