import Image from 'next/image';
import Link from 'next/link';
import { categories, families } from '../../lib/catalog';
import { Arrow } from '../ui/blocks';

const countFor = (family) => family.countLabel || `${family.categories.reduce((sum, key) => sum + categories[key].items.length, 0)} products`;

export default function FamilyTiles({ items = families }) {
  return (
    <ul className="family-tiles">
      {items.map((family) => (
        <li key={family.slug}>
          <Link href={`/${family.slug}`} className="family-tile">
            <span className={`family-tile-image${family.photo ? ' family-tile-image--photo' : ''}`}>
              <Image src={family.image} alt="" fill sizes="(max-width: 700px) 50vw, 25vw" />
            </span>
            <span className="family-tile-body">
              <span className="mono">{family.number}</span>
              <h3>{family.title}</h3>
              <p>{family.blurb}</p>
              <span className="family-tile-foot">
                <span>{countFor(family)}</span>
                <Arrow />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
