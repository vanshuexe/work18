'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import Dialog from '../ui/Dialog';

const wheelSizes = (size) => (size.match(/\d+/g) || []).filter((value) => Number(value) >= 12 && Number(value) <= 29);

function enquiryHref(item, type) {
  const label = item.code ? `${item.code} ${item.name}` : item.name;
  return `/enquiry?product=${encodeURIComponent(label)}&type=${encodeURIComponent(type)}`;
}

function Specs({ item }) {
  const rows = item.specs || [['Finish', item.finish], ['Wheel size', item.size], ['Note', item.note]].filter(([, value]) => value);
  if (!rows.length) return null;
  return (
    <dl className="specs">
      {rows.map(([term, value]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function ProductBrowser({ items, enquiryType, noun = 'products' }) {
  const [query, setQuery] = useState('');
  const [finish, setFinish] = useState('all');
  const [wheel, setWheel] = useState('all');
  const [group, setGroup] = useState('all');
  const [active, setActive] = useState(null);

  const finishes = useMemo(() => [...new Set(items.map((item) => item.finish).filter(Boolean))], [items]);
  const wheels = useMemo(
    () => [...new Set(items.flatMap((item) => wheelSizes(item.size)))].sort((a, b) => a - b),
    [items],
  );

  const groups = useMemo(() => [...new Set(items.map((item) => item.group).filter(Boolean))], [items]);

  const visible = items.filter((item) => {
    const haystack = `${item.code} ${item.name} ${item.size} ${item.finish} ${item.note} ${(item.specs || []).flat().join(' ')}`.toLowerCase();
    return (
      haystack.includes(query.trim().toLowerCase()) &&
      (finish === 'all' || item.finish === finish) &&
      (wheel === 'all' || wheelSizes(item.size).includes(wheel)) &&
      (group === 'all' || item.group === group)
    );
  });

  const filtered = query || finish !== 'all' || wheel !== 'all' || group !== 'all';
  const showTools = items.length > 6;
  const reset = () => {
    setQuery('');
    setFinish('all');
    setWheel('all');
    setGroup('all');
  };

  return (
    <div className="browser">
      {showTools && (
        <div className="browser-tools">
          <label className="field field--search">
            <span>Search</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Code, name or model" />
          </label>
          {finishes.length > 1 && (
            <label className="field">
              <span>Finish</span>
              <select value={finish} onChange={(event) => setFinish(event.target.value)}>
                <option value="all">All finishes</option>
                {finishes.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
          )}
          {groups.length > 1 && (
            <fieldset className="chips chips--wrap">
              <legend>Type</legend>
              <button type="button" aria-pressed={group === 'all'} onClick={() => setGroup('all')}>All</button>
              {groups.map((value) => (
                <button type="button" key={value} aria-pressed={group === value} onClick={() => setGroup(group === value ? 'all' : value)}>
                  {value}
                </button>
              ))}
            </fieldset>
          )}
          {wheels.length > 1 && (
            <fieldset className="chips">
              <legend>Wheel size</legend>
              <button type="button" aria-pressed={wheel === 'all'} onClick={() => setWheel('all')}>All</button>
              {wheels.map((value) => (
                <button type="button" key={value} aria-pressed={wheel === value} onClick={() => setWheel(wheel === value ? 'all' : value)}>
                  {value}″
                </button>
              ))}
            </fieldset>
          )}
        </div>
      )}

      <p className="browser-count" role="status" aria-live="polite">
        Showing <strong>{visible.length}</strong> of {items.length} {noun}
        {filtered && (
          <button type="button" className="text-button" onClick={reset}>Clear filters</button>
        )}
      </p>

      {visible.length === 0 ? (
        <div className="empty">
          <h3>No matching products</h3>
          <p>Try another name, code or wheel size — or send us the requirement and we will check our tooling.</p>
          <Link href="/enquiry" className="btn btn--primary">Send an enquiry</Link>
        </div>
      ) : (
        <ul className="product-grid">
          {visible.map((item) => (
            <li key={item.id} className="product-card">
              <button type="button" className="product-card-media" onClick={() => setActive(item)} aria-label={`View ${item.name}${item.code ? `, ${item.code}` : ''}`}>
                <span className="product-image">
                  <Image src={item.image} alt={`${item.name}${item.code ? ` — ${item.code}` : ''}`} fill sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 25vw" />
                </span>
                <span className="product-card-zoom" aria-hidden="true">Quick view</span>
              </button>
              <div className="product-card-body">
                {item.code && <span className="code">{item.code}</span>}
                <h3>{item.name}</h3>
                <Specs item={item} />
                <Link href={enquiryHref(item, enquiryType)} className="text-link">Enquire <span aria-hidden="true">→</span></Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={Boolean(active)} onClose={() => setActive(null)} label={active ? active.name : 'Product'} className="dialog--product">
        {active && (
          <div className="quickview">
            <button type="button" className="dialog-close" onClick={() => setActive(null)}>Close ×</button>
            <div className="quickview-media">
              <span className="product-image">
                <Image src={active.image} alt={`${active.name}${active.code ? ` — ${active.code}` : ''}`} fill sizes="(max-width: 800px) 90vw, 520px" priority />
              </span>
            </div>
            <div className="quickview-body">
              {active.code && <span className="code">{active.code}</span>}
              <h3>{active.name}</h3>
              <Specs item={active} />
              <p className="quickview-note">
                Share the quantity, finish and any special requirement and we will respond with availability and a quotation.
              </p>
              <Link href={enquiryHref(active, enquiryType)} className="btn btn--primary">Request a quote</Link>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
