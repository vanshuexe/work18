import content from "../config/company";

// Pillars with dedicated SVG icons and brand color schemes
const pillars = [
  {
    label: "Quality First",
    bg: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    icon: (
      <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Fast Delivery",
    bg: "bg-amber-50 text-amber-800 border-amber-200/80",
    icon: (
      <svg className="w-4 h-4 text-amber-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Trusted Partners",
    bg: "bg-blue-50 text-blue-800 border-blue-200/80",
    icon: (
      <svg className="w-4 h-4 text-blue-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Performance",
    bg: "bg-purple-50 text-purple-800 border-purple-200/80",
    icon: (
      <svg className="w-4 h-4 text-purple-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

// Stats with metrics, subtitles and high-contrast SVG icons
const stats = [
  {
    value: "10+",
    label: "Years Experience",
    sub: "Industry Mastery",
    border: "border-amber-500/30",
    bg: "from-amber-500/15 to-orange-500/5",
    text: "text-amber-300",
    icon: (
      <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    value: "500+",
    label: "Product Range",
    sub: "Custom Formulations",
    border: "border-orange-500/30",
    bg: "from-orange-500/15 to-rose-500/5",
    text: "text-orange-300",
    icon: (
      <svg className="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </svg>
    ),
  },
  {
    value: "20+",
    label: "States Covered",
    sub: "Pan-India Reach",
    border: "border-sky-500/30",
    bg: "from-sky-500/15 to-blue-500/5",
    text: "text-sky-300",
    icon: (
      <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    sub: "Quality Trust",
    border: "border-emerald-500/30",
    bg: "from-emerald-500/15 to-teal-500/5",
    text: "text-emerald-300",
    icon: (
      <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const growthAreas = [
  "Manufacturing Expansion",
  "Technology & R&D",
  "Working Capital",
  "Market Expansion",
  "Brand & Distribution",
  "Global Expansion",
];

function getGrowthAreaIcon(area) {
  switch (area) {
    case "Manufacturing Expansion":
      return (
        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 20h20M5 20V8l5 4V8l5 4V4l5 4v12" />
        </svg>
      );
    case "Technology & R&D":
      return (
        <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
          <path d="M8.5 2h7M7 16h10" />
        </svg>
      );
    case "Working Capital":
      return (
        <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "Market Expansion":
      return (
        <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "Brand & Distribution":
      return (
        <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
      );
    case "Global Expansion":
      return (
        <svg className="w-5 h-5 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3M22 2l-7.5 7.5M14 8l5 5" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      );
  }
}

function getSectionIcon(title) {
  switch (title) {
    case "About Us":
      return (
        <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18M3 7v14M21 7v14M6 7V3h12v4M9 11h2M9 15h2M13 11h2M13 15h2" />
        </svg>
      );
    case "Our Approach":
      return (
        <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case "Quality & Consistency":
      return (
        <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "Serving Multiple Industries":
      return (
        <svg className="w-5 h-5 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 20h20M5 20V8l5 4V8l5 4V4l5 4v12" />
        </svg>
      );
    case "Our Future":
      return (
        <svg className="w-5 h-5 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case "Our Vision":
      return (
        <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        </svg>
      );
    case "Our Mission":
      return (
        <svg className="w-5 h-5 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
  }
}

export default function CompanyContent({ kind = "company" }) {
  const sections = content[kind];

  // FULL VIEW (Used on /about-us and /investor)
  return (
    <div className="company-content">
      {sections.map((section, index) => {
        const isFirst = index === 0 && kind === "company";
        const sectionIcon = getSectionIcon(section.title);

        return (
          <section className="company-section" key={section.title}>
            <div className="company-section-header">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200/80 text-purple-700 mt-1 shadow-xs hidden sm:flex items-center justify-center">
                  {sectionIcon}
                </div>
                <div>
                  <span className="company-eyebrow">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10" style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {String(index + 1).padStart(2, "0")} / AEROPOLISH
                  </span>
                  <h2 className="company-section-title">{section.title}</h2>
                </div>
              </div>

              {isFirst && (
                <div className="company-pillars">
                  {pillars.map((p) => (
                    <div className={`company-pillar ${p.bg}`} key={p.label}>
                      {p.icon}
                      <span className="company-pillar-label">{p.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="company-divider" />

            <div className={`company-body ${isFirst ? "" : "no-stats"}`}>
              <div className="company-paragraphs">
                {section.paragraphs.map((paragraph, i) => {
                  const area = growthAreas.find((label) => paragraph.startsWith(label));
                  if (area) {
                    const areaIcon = getGrowthAreaIcon(area);
                    return (
                      <div className="growth-area flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80" key={i}>
                        <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                          {areaIcon}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-gray-900">{area}</h3>
                          <p className="text-sm text-gray-600 mt-1">{paragraph.slice(area.length)}</p>
                        </div>
                      </div>
                    );
                  }

                  // Short bullet point detection (e.g. "Consistent product performance")
                  const isShortBullet = paragraph.length < 50 && !paragraph.endsWith(".");

                  if (isShortBullet) {
                    return (
                      <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-purple-50/70 border border-purple-200/60 text-gray-800 text-sm font-semibold" key={i}>
                        <svg className="w-4 h-4 text-purple-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{paragraph}</span>
                      </div>
                    );
                  }

                  return (
                    <div className="company-para-row" key={i}>
                      <span className="company-para-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </span>
                      <p className="company-para">{paragraph}</p>
                    </div>
                  );
                })}
              </div>

              {isFirst && (
                <div className="company-stats grid grid-cols-2 gap-3">
                  {stats.map((s) => (
                    <div className="company-stat" key={s.label}>
                      <div className="flex justify-center mb-1">{s.icon}</div>
                      <span className="company-stat-value">{s.value}</span>
                      <span className="company-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
