"use client";

import { useState } from "react";
import SiteLink from "../SiteLink";
import { cssStyle } from "../../lib/presentation";

export default function ColorTrendsPage() {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (text, label) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedCode(label || text);
      setTimeout(() => setCopiedCode(null), 2400);
    }
  };

  const themes = [
    {
      id: "quietude",
      number: "01",
      title: "Quietude",
      subtitle: "A Timeless Embrace of Softness and Light",
      tagline: "Serene • Tactile • Chalky Neutrals",
      description:
        "Rooted in mindful minimalism, Quietude responds to modern sensory overload with cocooning warmth. Soft chalky whites, limestone veining, and muffled beiges create quiet architecture that breathes in harmony with natural daylight.",
      image: "/new-images/trends-quietude.webp",
      keyColor: {
        name: "Imperfect White",
        ncs: "NCS S 1010-G90Y",
        hex: "#EFECE1",
        textColor: "#292524",
      },
      swatches: [
        { name: "Elegant Grey", ncs: "NCS S 1002-R", hex: "#D8D7D5", dark: true },
        { name: "Golden Brown", ncs: "NCS S 2020-Y20R", hex: "#D3B386", dark: true },
        { name: "Marble Vein", ncs: "NCS S 3010-Y50R", hex: "#B39B8B", dark: true },
        { name: "Hush Blue", ncs: "NCS S 1001-B", hex: "#D6DBDD", dark: true },
        { name: "Quiet Beige", ncs: "NCS S 0603-Y20R", hex: "#EAE6DE", dark: true },
      ],
      themeColor: "#b45309",
      themeBg: "bg-amber-50/60",
      themeBorder: "border-amber-200/80",
      icon: (
        <svg className="w-5 h-5 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: "symbiosis",
      number: "02",
      title: "Symbiosis",
      subtitle: "Where Deep Blue Meets Luminous Light",
      tagline: "Oceanic • Radiant • High Contrast",
      description:
        "An evocative dialogue between marine twilight depths and luminous coastal warmth. Velvety deep cobalt and midnight navy envelope the space, dramatically counterbalanced by soft coral delight and glowing natural beige accents.",
      image: "/new-images/trends-symbiosis.webp",
      keyColor: {
        name: "Deep Blue",
        ncs: "NCS S 6030-R70B",
        hex: "#1B2D4A",
        textColor: "#FFFFFF",
      },
      swatches: [
        { name: "Shallow Blue", ncs: "NCS S 1015-R80B", hex: "#BDCEDE", dark: true },
        { name: "Natural Beige", ncs: "NCS S 0907-Y10R", hex: "#E7DEC8", dark: true },
        { name: "Human Pink", ncs: "NCS S 1015-Y60R", hex: "#ECC8BC", dark: true },
        { name: "Smart Blue", ncs: "NCS S 2040-R80B", hex: "#6E9CC2", dark: false },
        { name: "Coral Delight", ncs: "NCS S 2030-Y60R", hex: "#D99571", dark: false },
      ],
      themeColor: "#1d4ed8",
      themeBg: "bg-blue-50/60",
      themeBorder: "border-blue-200/80",
      icon: (
        <svg className="w-5 h-5 text-blue-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
    },
    {
      id: "homecoming",
      number: "03",
      title: "Homecoming",
      subtitle: "The Comfort of Heritage and Warmth",
      tagline: "Earthy • Organic • Roasted Clay",
      description:
        "A celebration of artisanal craft, tactile clay, and generational rootedness. Rich roasted hazelnut, warm pistachio, and deep berry brick red bring grounding geological honesty into contemporary architectural interiors.",
      image: "/new-images/trends-homecoming.webp",
      keyColor: {
        name: "Embracing Brown",
        ncs: "NCS S 3040-Y30R",
        hex: "#A46843",
        textColor: "#FFFFFF",
      },
      swatches: [
        { name: "Home Pistachio", ncs: "NCS S 4040-G80Y", hex: "#7B8045", dark: false },
        { name: "Warm Green", ncs: "NCS S 2040-G80Y", hex: "#A6A751", dark: false },
        { name: "Brick Red", ncs: "NCS S 3060-Y70R", hex: "#A44331", dark: false },
        { name: "Luxurious Red", ncs: "NCS S 4050-Y90R", hex: "#88252C", dark: false },
        { name: "Careful Purple", ncs: "NCS S 1505-R30B", hex: "#D2C9D0", dark: true },
      ],
      themeColor: "#b45309",
      themeBg: "bg-orange-50/60",
      themeBorder: "border-orange-200/80",
      icon: (
        <svg className="w-5 h-5 text-orange-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: "renegade",
      number: "04",
      title: "Renegade",
      subtitle: "A Bold Statement of Rebellion and Creativity",
      tagline: "Kinetic • Solar • Cyberpunk Energy",
      description:
        "Fearless modernism for creative spaces that refuse conformity. High-voltage volcanic red clashes with electric solar yellow, glowing amber, and vibrant studio blues to unleash bold sculptural self-expression.",
      image: "/new-images/trends-renegade.webp",
      keyColor: {
        name: "Red Eruption",
        ncs: "NCS S 0580-Y90R",
        hex: "#E63228",
        textColor: "#FFFFFF",
      },
      swatches: [
        { name: "Creative Yellow", ncs: "NCS S 0570-G80Y", hex: "#E8DD22", dark: true },
        { name: "Orange Flame", ncs: "NCS S 1070-Y60R", hex: "#EE5C26", dark: false },
        { name: "Warm Blue", ncs: "NCS S 1040-R70B", hex: "#8DA8DE", dark: false },
        { name: "Emotional Red", ncs: "NCS S 4050-R20B", hex: "#771D3A", dark: false },
        { name: "Earthy Heat", ncs: "NCS S 5010-Y70R", hex: "#745D56", dark: false },
      ],
      themeColor: "#dc2626",
      themeBg: "bg-rose-50/60",
      themeBorder: "border-rose-200/80",
      icon: (
        <svg className="w-5 h-5 text-rose-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafaf9] text-gray-900 font-manrope selection:bg-amber-100 selection:text-amber-900">
      {/* Toast Notification for Clipboard Copy */}
      {copiedCode && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gray-900 text-white text-sm font-semibold shadow-2xl border border-gray-700 animate-bounce">
          <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>Copied {copiedCode} to clipboard!</span>
        </div>
      )}

      {/* Hero Section with Architectural Collage Backdrop & Glassmorphic Card */}
      <section className="relative w-full overflow-hidden bg-slate-950 py-16 md:py-24 lg:py-28">
        {/* Background Architectural Collage */}
        <div className="absolute inset-0">
          <img
            alt="NCS Color Trends 2026 Architectural Living Spaces"
            className="w-full h-full object-cover opacity-35 filter brightness-75 scale-102 transform duration-1000"
            src="/new-images/trends-hero-clean.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12)_0%,transparent_70%)] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow Pill with SVG Icon */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6 shadow-md">
            <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <span>Aeropolish Global Color Forecast</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-white">NCS Edition</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-poppins text-white tracking-tight leading-tight mb-6 drop-shadow-md">
            NCS Color Trends{" "}
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              2026
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-10 drop-shadow">
            Immerse yourself in four evocative interior stories engineered with the scientific precision of the Natural Colour System (NCS). From tranquil tactile whites to electric neon expressions, discover how 2026 palettes define modern living.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <SiteLink
              href="/color-visualizer"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/30 px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:bg-white/25 hover:border-white/50 cursor-pointer shadow-md"
            >
              <svg className="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <span>Test in Color Visualizer</span>
            </SiteLink>
          </div>

          {/* Quick-Jump Theme Pills */}
          <div className="pt-6 border-t border-white/15 max-w-4xl mx-auto">
            <div className="text-xs uppercase tracking-widest text-gray-300 font-semibold mb-3">
              Explore The Four Trend Directions
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {themes.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 hover:border-white/30 text-white text-xs sm:text-sm font-semibold transition-all duration-200"
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.keyColor.hex }} />
                  <span>{t.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: The 4 Themes Detailed Showcase */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
          {themes.map((theme, idx) => (
            <article
              key={theme.id}
              id={theme.id}
              className="scroll-mt-24 rounded-3xl bg-white border border-gray-200/90 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              {/* Theme Header Bar */}
              <div className={`p-6 sm:p-8 md:p-10 border-b border-gray-100 ${theme.themeBg}`}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border shadow-sm text-xs font-bold tracking-wider uppercase text-gray-800">
                    {theme.icon}
                    <span>Theme {theme.number}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-600 font-medium">{theme.tagline}</span>
                  </div>

                  {/* Dominant Color Pill */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200/80 shadow-sm text-xs font-semibold">
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shadow-inner flex-shrink-0"
                      style={{ backgroundColor: theme.keyColor.hex }}
                    />
                    <span className="text-gray-700">Signature: <strong>{theme.keyColor.name}</strong></span>
                    <code className="text-[11px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono">
                      {theme.keyColor.ncs}
                    </code>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins text-gray-900 tracking-tight mb-2">
                  {theme.title}
                </h2>
                <p className="text-base sm:text-lg font-medium text-gray-700 mb-3">
                  {theme.subtitle}
                </p>
                <p className="text-sm sm:text-base text-gray-600 max-w-4xl leading-relaxed">
                  {theme.description}
                </p>
              </div>

              {/* Theme Visual Infographic Image */}
              <div className="p-4 sm:p-6 md:p-8 bg-gray-50/50">
                <div className="relative rounded-2xl overflow-hidden bg-white shadow-md border border-gray-200/80 group">
                  <img
                    alt={`${theme.title} - ${theme.subtitle} - NCS Color Trends 2026`}
                    loading="lazy"
                    width={1160}
                    height={660}
                    className="w-full h-auto object-contain transform group-hover:scale-101 transition-transform duration-700 ease-out"
                    src={theme.image}
                  />
                </div>
              </div>

              {/* Interactive Color Palette Swatches Bar */}
              <div className="p-6 sm:p-8 md:p-10 border-t border-gray-100 bg-white">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-poppins">
                      Curated NCS Color Harmony Palette
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Click any swatch to copy its exact NCS notation for paint tinting
                    </p>
                  </div>
                  <SiteLink
                    href={`/color-visualizer?theme=${encodeURIComponent(theme.title)}`}
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>Visualize Palette</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </SiteLink>
                </div>

                {/* 5 Swatches Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                  {theme.swatches.map((color, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => copyToClipboard(color.ncs, `${color.name} (${color.ncs})`)}
                      className="group relative flex flex-col p-3 rounded-2xl border border-gray-200/90 bg-white hover:border-gray-400 hover:shadow-lg transition-all duration-200 text-left cursor-pointer"
                      title="Click to copy NCS code"
                    >
                      {/* Color Preview Block */}
                      <div
                        className="w-full h-24 sm:h-28 rounded-xl shadow-inner border border-black/5 mb-3 relative overflow-hidden transition-transform group-hover:scale-102"
                        style={{ backgroundColor: color.hex }}
                      >
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md rounded-md px-1.5 py-0.5 text-[10px] text-white font-mono">
                          Copy
                        </div>
                      </div>

                      {/* Color Name */}
                      <div className="font-bold text-sm text-gray-900 font-poppins line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {color.name}
                      </div>

                      {/* NCS Code */}
                      <div className="text-xs font-mono font-medium text-gray-500 mt-0.5">
                        {color.ncs}
                      </div>

                      {/* Hex Tag */}
                      <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                        <span>{color.hex}</span>
                        <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Scientific NCS System & Tinting Assurance Section */}
      <section className="py-16 bg-gradient-to-b from-stone-100 to-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold tracking-wider uppercase mb-3">
              <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              <span>Scientific Color Standard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-3">
              Understanding the Natural Colour System (NCS)
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Unlike arbitrary commercial names, the NCS standard is a cross-industry universal colour language based on how human eyes perceive color, ensuring absolute consistency across paint batches, lighting, and materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 font-poppins mb-2">
                Pure Visual Notation
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                NCS codes (e.g. <em>S 1010-G90Y</em>) describe exact blackness, chromaticness, and hue, letting interior designers calibrate mood with scientific certainty.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 font-poppins mb-2">
                Aeropolish Precise Tinting
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                All 2026 NCS formulations are calibrated directly into Aeropolish computer tinting dispensers across all retail and contractor distribution centers.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 font-poppins mb-2">
                Light Reflectance Value (LRV)
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Each shade is formulated with high-solids emulsions to optimize ambient light distribution, lowering indoor artificial lighting requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Banner Section */}
      <section className="py-14 bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-poppins mb-4">
            Bring 2026 Color Trends into Your Home
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Order custom color samples or test your favorite shade live on interactive 3D room surfaces.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <SiteLink
              href="/our-colors"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 px-6 py-3 text-sm sm:text-base font-semibold text-white transition-all"
            >
              <svg className="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              <span>Explore All Our Colors</span>
            </SiteLink>

            <SiteLink
              href="/color-visualizer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 px-6 py-3 text-sm sm:text-base font-semibold text-white transition-all"
            >
              <svg className="w-5 h-5 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <span>Virtual Color Visualizer</span>
            </SiteLink>
          </div>
        </div>
      </section>
    </div>
  );
}
