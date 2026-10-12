import Link from 'next/link';

// Monogram redrawn as vector from the Harison mark: an open ring, an orange H and a dot.
export function Mark({ size = 44, ring = 'var(--navy)', accent = 'var(--orange)' }) {
  return (
    <svg className="mark" width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path d="M69 13 A41 41 0 1 0 71 86" fill="none" stroke={ring} strokeWidth="9" />
      <path d="M31 17h11v66H31z" fill={accent} />
      <path d="M58 30h11v56H58z" fill={accent} />
      <path d="M42 45h16v10H42z" fill={accent} />
      <circle cx="82" cy="45" r="5.5" fill={accent} />
    </svg>
  );
}

export default function Logo({ inverse = false }) {
  return (
    <Link href="/" className={`logo${inverse ? ' logo--inverse' : ''}`} aria-label="Harison Cycle Industries — home">
      <Mark ring={inverse ? '#fff' : 'var(--navy)'} />
      <span className="logo-text">
        <strong>HARISON</strong>
        <small>Cycle Industries</small>
      </span>
    </Link>
  );
}
