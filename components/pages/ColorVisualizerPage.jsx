import { Fragment } from "react";
import SiteLink from "../SiteLink";
import site from "../../config/site";
import { cssStyle } from "../../lib/presentation";

export default function ColorVisualizerPage({
  sofas = [],
  counts = {},
  defaultColor = { hexCode: "#8F9293", dataColorname: "Neutral Grey" },
} = {}) {
  const currentSofa = sofas[0] || {
    hex: "#9CA3AF",
    desktop: "/desktop_grey-sofa.webp",
    mobile: "/mobile_grey-sofa-final-min.webp",
  };

  const panelStyle =
    "border-radius: 18px; border: 1px solid rgba(255, 255, 255, 0.6); background-color: rgba(255, 255, 255, 0.9); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); backdrop-filter: blur(16px)";
  
  const popupStyle =
    "border: 1px solid rgba(229, 231, 235, 0.8); background-color: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)";

  return (
    <div
      className="min-h-screen bg-slate-950 font-manrope selection:bg-amber-100 selection:text-amber-900"
      data-visualizer=""
      data-sofas={JSON.stringify(sofas)}
    >
      {/* Interactive Wall Container */}
      <div
        data-wall=""
        className="main-container w-full md:w-[99%] flex items-center justify-center relative md:rounded-[24px] overflow-hidden"
        style={cssStyle(
          `min-height: 95vh; padding-top: calc(60px + 2vh); margin: 1.5vh 1.5vh 3vh; background-color: ${defaultColor.hexCode}; transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)`,
        )}
      >
        {/* Ambient Evening Lighting Overlay (Toggled by data-ambience-toggle) */}
        <div
          data-ambient-overlay=""
          className="absolute inset-0 bg-gradient-to-t from-amber-950/60 via-amber-900/30 to-amber-800/10 pointer-events-none transition-opacity duration-700 opacity-0 z-10"
        />

        {/* Top Centered Header */}
        <div className="absolute top-[8%] md:top-[10%] left-1/2 transform -translate-x-1/2 z-30 text-center px-4 w-full max-w-2xl">
          {/* Eyebrow Badge with SVG Icon */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/25 text-amber-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 sm:mb-3 shadow-lg">
            <svg
              className="w-4 h-4 text-amber-300 animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
            <span>Aeropolish Virtual Studio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-white">3D Color Visualizer</span>
          </div>

          <h1
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-1.5 sm:mb-2 text-white font-poppins tracking-tight"
            style={cssStyle("text-shadow: rgba(0, 0, 0, 0.45) 0px 3px 8px")}
          >
            Color Visualizer
          </h1>
          <p
            className="text-xs sm:text-sm md:text-base lg:text-lg text-white/95 px-2 drop-shadow-md font-medium"
            style={cssStyle("text-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px")}
          >
            Visualize your home in colors — explore wall finishes and sofa furnishings in real-time.
          </p>
        </div>

        {/* Top-Right HUD Controls (Ambience Switcher & Finish Specs) */}
        <div className="absolute top-[70px] md:top-8 right-3 md:right-8 z-30 hidden sm:flex flex-col items-end gap-2">
          {/* Ambience Toggle */}
          <button
            type="button"
            data-ambience-toggle=""
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/25 text-white text-xs font-semibold shadow-lg transition-all hover:scale-105 cursor-pointer"
            title="Toggle Natural Daylight / Warm Evening Lighting"
          >
            <svg
              className="w-4 h-4 text-amber-300 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            <span data-ambience-label="">Natural Daylight 5000K</span>
          </button>

          {/* Quick Trends Link */}
          <SiteLink
            href="/color-trends"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 text-white text-xs font-medium shadow-md transition-all"
          >
            <svg className="w-3.5 h-3.5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>NCS Trends 2026</span>
          </SiteLink>
        </div>

        {/* 3D Room Photography & Sofa Layers */}
        <div className="absolute inset-0 z-20 flex items-end justify-center overflow-hidden pointer-events-none">
          <picture className="w-full h-full">
            <source
              data-sofa-mobile=""
              media="(max-width: 767px)"
              srcSet={currentSofa.mobile}
            />
            <img
              data-sofa-image=""
              src={currentSofa.desktop}
              alt="Aeropolish Living room with sofa visualizer"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              style={cssStyle("object-position: center")}
            />
          </picture>
          {/* Subtle realistic architectural shadows */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        </div>

        {/* Floating Interactive Control Dock */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:top-[42%] md:bottom-auto md:left-4 lg:left-8 z-40 flex flex-row md:flex-col px-2 md:px-0 color-visualizer-buttons w-[96vw] md:w-auto md:min-w-[420px] max-w-[500px]"
          style={cssStyle("gap: 1.5vh")}
        >
          {/* 1. Sofa Furnishing Picker */}
          <div className="flex-1 md:flex-none flex flex-col relative" data-picker="">
            <button
              type="button"
              data-picker-toggle=""
              aria-expanded="false"
              className="group flex items-center gap-2.5 md:gap-3.5 w-full py-3 px-3.5 md:py-4 md:px-5 min-h-12 md:h-[68px] text-sm md:text-base transition-all duration-200 hover:shadow-xl cursor-pointer"
              style={cssStyle(panelStyle)}
            >
              {/* Sofa SVG Icon */}
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gray-100 group-hover:bg-amber-50 flex items-center justify-center flex-shrink-0 text-gray-700 group-hover:text-amber-800 transition-colors shadow-inner">
                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 9V7a2 2 0 00-2-2H6a2 2 0 00-2 2v2m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2V9m16 0H4m0 6v3m16-3v3M4 11h16" />
                </svg>
              </div>

              {/* Swatch Color Dot */}
              <span
                data-sofa-dot=""
                className="flex-shrink-0 border-2 border-white rounded-full w-5 h-5 md:w-6 md:h-6 shadow-md transition-transform group-hover:scale-110"
                style={cssStyle(
                  `background-color: ${currentSofa.hex}; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25)`,
                )}
              />

              {/* Text Label */}
              <div className="flex-1 text-left">
                <div className="text-xs sm:text-sm font-bold font-poppins text-gray-900 tracking-wide uppercase leading-tight">
                  SOFA COLOR
                </div>
                <div className="text-[10px] text-gray-500 font-medium hidden sm:block">
                  Fabric furnishing
                </div>
              </div>

              {/* Hex Badge */}
              <span className="hidden md:flex items-center gap-1.5 flex-shrink-0 rounded-full bg-gray-100 border border-gray-200 py-1 px-3 shadow-inner">
                <span
                  data-sofa-hex=""
                  className="text-xs font-mono font-bold text-gray-800"
                >
                  {currentSofa.hex}
                </span>
              </span>

              {/* Chevron */}
              <svg
                data-chevron=""
                className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 text-gray-600 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Sofa Popup Drawer */}
            <div
              data-picker-popup=""
              className="color-popup hidden mt-2 z-50 overflow-y-auto max-h-[30vh] scrollbar-hide rounded-2xl p-4 w-full border border-gray-200/90 shadow-2xl"
              style={cssStyle(popupStyle)}
            >
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 font-poppins uppercase tracking-wider">
                  Select Sofa Fabric Tone
                </h3>
                <span className="text-[11px] text-gray-500 font-medium">{sofas.length} Furnishings</span>
              </div>
              <div className="flex flex-wrap gap-3 justify-center py-1">
                {sofas.map((sofa, i) => (
                  <button
                    key={i}
                    type="button"
                    data-sofa={i}
                    title={`Sofa ${i + 1} - ${sofa.hex}`}
                    className={`color-dot w-8 h-8 md:w-9 md:h-9 rounded-full transition-all duration-300 border-2 border-white shadow-md hover:scale-110 cursor-pointer ${
                      i === 0 ? "is-active ring-2 ring-blue-600" : "opacity-70 hover:opacity-100"
                    }`}
                    style={cssStyle(`background-color: ${sofa.hex}`)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 2. Aeropolish Wall Tone Picker */}
          <div className="flex-1 md:flex-none flex flex-col relative" data-picker="">
            <button
              type="button"
              data-picker-toggle=""
              aria-expanded="false"
              className="group flex items-center gap-2.5 md:gap-3.5 w-full py-3 px-3.5 md:py-4 md:px-5 min-h-12 md:h-[68px] text-sm md:text-base transition-all duration-200 hover:shadow-xl cursor-pointer"
              style={cssStyle(panelStyle)}
            >
              {/* Paint Roller SVG Icon */}
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-700 transition-colors shadow-inner">
                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>

              {/* Swatch Color Dot */}
              <span
                data-wall-dot=""
                className="flex-shrink-0 border-2 border-white rounded-full w-5 h-5 md:w-6 md:h-6 shadow-md transition-transform group-hover:scale-110"
                style={cssStyle(
                  `background-color: ${defaultColor.hexCode}; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25)`,
                )}
              />

              {/* Text Label */}
              <div className="flex-1 text-left min-w-0">
                <div className="text-xs sm:text-sm font-bold font-poppins text-gray-900 tracking-wide uppercase leading-tight">
                  AEROPOLISH COLOR
                </div>
                <div className="text-[10px] text-gray-500 font-medium hidden sm:block">
                  Interior emulsion tone
                </div>
              </div>

              {/* Wall Color Name Pill */}
              <span className="hidden md:flex items-center gap-1.5 flex-shrink-0 rounded-full bg-blue-50/80 border border-blue-200/80 py-1 px-3 shadow-inner max-w-[130px] truncate">
                <span
                  data-wall-name=""
                  className="text-xs font-bold text-blue-950 truncate"
                >
                  {defaultColor.dataColorname}
                </span>
              </span>

              {/* Chevron */}
              <svg
                data-chevron=""
                className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 text-gray-600 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Wall Color Popup Drawer */}
            <div
              data-picker-popup=""
              className="color-popup hidden mt-2 z-50 overflow-y-auto max-h-[38vh] scrollbar-hide rounded-2xl p-4 w-full border border-gray-200/90 shadow-2xl"
              style={cssStyle(popupStyle)}
            >
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-gray-100">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 font-poppins uppercase tracking-wider">
                  Pick a Color Family
                </h3>
                <span className="text-[11px] text-gray-500 font-medium">10 Palettes</span>
              </div>

              {/* Color Family Dots */}
              <div className="flex flex-wrap gap-2 justify-center mb-3">
                {site.colorFamilies.map((family, index0) => (
                  <button
                    key={index0}
                    type="button"
                    data-family={family.type}
                    title={`${family.label} (${counts[family.type] || 0} colors)`}
                    className="color-dot w-7 h-7 md:w-8 md:h-8 rounded-full transition-all duration-200 border-2 border-white shadow-md hover:scale-110 opacity-70 hover:opacity-100 cursor-pointer"
                    style={cssStyle(`background-color: ${family.swatch}`)}
                  />
                ))}
              </div>

              {/* Selected Family Header */}
              <div
                data-family-title=""
                className="hidden text-center text-xs font-bold text-gray-800 uppercase tracking-wider mb-2 border-t border-gray-100 pt-2"
              />

              {/* Color Swatches Grid */}
              <div
                data-family-colors=""
                className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 gap-1.5 max-h-[180px] overflow-y-auto pr-1"
              />
            </div>
          </div>

          {/* Quick Actions Row */}
          <div className="hidden md:flex items-center justify-between gap-2 pt-1 px-1">
            {/* Copy Wall Color Code */}
            <button
              type="button"
              data-copy-wall=""
              title="Copy current color code to clipboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-md transition-all hover:scale-102 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span data-copy-label="">Copy color code</span>
            </button>

            {/* Shuffle Inspiration */}
            <button
              type="button"
              data-shuffle-wall=""
              title="Shuffle a random designer color shade"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/25 text-white text-xs font-semibold shadow-md transition-all hover:scale-102 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Shuffle Color</span>
            </button>

            {/* Tinting Centers */}
            <SiteLink
              href="/tinting-center"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/25 text-white text-xs font-semibold shadow-md transition-all hover:scale-102"
              title="Find an Aeropolish Tinting Center to order this shade"
            >
              <svg className="w-3.5 h-3.5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Find Store</span>
            </SiteLink>
          </div>
        </div>

        {/* Bottom Floating Harmony Pill (Desktop) */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-30 hidden md:inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-950/75 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-xs sm:text-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
          <span className="text-gray-300">Live Preview:</span>
          <strong data-active-color-name="" className="text-white font-bold font-poppins">
            {defaultColor.dataColorname}
          </strong>
          <code data-active-color-hex="" className="text-xs bg-white/10 px-2 py-0.5 rounded text-amber-300 font-mono">
            {defaultColor.hexCode}
          </code>
          <span className="text-gray-400">•</span>
          <SiteLink
            href="/our-colors"
            className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 transition-colors"
          >
            Explore All 150+ Shades →
          </SiteLink>
        </div>
      </div>
    </div>
  );
}
