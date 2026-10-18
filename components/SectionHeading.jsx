// Shared heading for long-form text sections (About, Vision, Mission): an icon badge above a large title.
// Icons are 24x24 outlines drawn with currentColor strokes.
const ICONS = {
  building: (
    <>
      <path d="M4 21V7l8-4 8 4v14" />
      <path d="M9 21v-5h6v5M8 10h.01M12 10h.01M16 10h.01M8 13.5h.01M12 13.5h.01M16 13.5h.01" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
      <path d="M12 3V1M12 23v-2M3 12H1M23 12h-2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.3 2.9 7.6 7 9.5 4.1-1.9 7-5.2 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4.5" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21V10l6 3.5V10l6 3.5V6h3v15H3Z" />
      <path d="M7 17h.01M11 17h.01M15 17h.01" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 2c3.5 2.2 5 5.8 5 9.5L14.5 15h-5L7 11.5C7 7.8 8.5 4.2 12 2Z" />
      <circle cx="12" cy="9" r="1.6" />
      <path d="m7 12-3 3 3 .5M17 12l3 3-3 .5M10 19c0 1.5.8 2.5 2 3 1.2-.5 2-1.5 2-3" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z" />
    </>
  ),
  foundation: (
    <>
      <path d="M3 8h18M3 8l9-4.5L21 8" />
      <path d="M5 8v9.5M19 8v9.5M3 17.5h18M3 21h18M9 11v6M15 11v6" />
    </>
  ),
  checklist: (
    <>
      <path d="m4 6 1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17" />
      <path d="M12 6.5h8M12 12.5h8M12 18.5h8" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="m6.3 6.3 2.4 2.4M15.3 15.3l2.4 2.4M6.3 17.7l2.4-2.4M15.3 8.7l2.4-2.4" />
    </>
  ),
};

export function SectionIcon({ name }) {
  if (!ICONS[name]) return null;
  return (
    <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6f1fa] text-[#512178]">
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {ICONS[name]}
      </svg>
    </span>
  );
}

export default function SectionHeading({ icon, title }) {
  return (
    <div>
      <SectionIcon name={icon} />
      <h2 className="font-poppins text-2xl font-bold text-[#f47422] sm:text-3xl">{title}</h2>
    </div>
  );
}

// Body copy shared by the long-form sections.
export const bodyText = "text-[15px] leading-[1.9] text-gray-700 sm:text-[17px]";
