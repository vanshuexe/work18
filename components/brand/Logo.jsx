import Image from 'next/image';
import Link from 'next/link';

// Harison Cycle Industries logo: the original artwork at its true proportions (836 × 926).
export default function Logo({ inverse = false, priority = false }) {
  return (
    <Link href="/" className={`logo${inverse ? ' logo--inverse' : ''}`} aria-label="Harison Cycle Industries — home">
      <Image src="/images/brand/harison-cycle-industries.png" alt="Harison Cycle Industries" width={836} height={926} priority={priority} className="logo-img" />
    </Link>
  );
}

// Harison India logo (agriculture parts), shown at the top right of the header.
export function IndiaLogo({ className = '' }) {
  return (
    <Link href="/agriculture-parts" className={`india-logo ${className}`} aria-label="Harison India — agriculture parts">
      <Image src="/images/brand/harison-india-logo.png" alt="Harison India" width={744} height={227} className="india-logo-img" />
    </Link>
  );
}
