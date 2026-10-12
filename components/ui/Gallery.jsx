'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import Dialog from './Dialog';

// items: [{ src, alt, caption, ratio? }]
export default function Gallery({ items, columns = 3, ratio = '4 / 3' }) {
  const [index, setIndex] = useState(null);
  const open = index !== null;
  const step = useCallback((delta) => setIndex((value) => (value + delta + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, step]);

  const current = open ? items[index] : null;

  return (
    <>
      <ul className="gallery" style={{ '--cols': columns }}>
        {items.map((item, i) => (
          <li key={item.src}>
            <button type="button" className="gallery-item" onClick={() => setIndex(i)} aria-label={`Enlarge: ${item.caption || item.alt}`}>
              <span className="gallery-frame" style={{ aspectRatio: ratio }}>
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
              </span>
              {item.caption && (
                <span className="gallery-caption">
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  {item.caption}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <Dialog open={open} onClose={() => setIndex(null)} label={current ? current.caption || current.alt : 'Image'} className="dialog--media">
        {current && (
          <div className="lightbox">
            <button type="button" className="dialog-close" onClick={() => setIndex(null)} aria-label="Close">Close ×</button>
            <div className="lightbox-stage">
              <Image src={current.src} alt={current.alt} fill sizes="90vw" priority />
            </div>
            <div className="lightbox-bar">
              <span>{current.caption || current.alt}</span>
              {items.length > 1 && (
                <span className="lightbox-nav">
                  <button type="button" onClick={() => step(-1)} aria-label="Previous image">← Prev</button>
                  <span className="mono">{index + 1} / {items.length}</span>
                  <button type="button" onClick={() => step(1)} aria-label="Next image">Next →</button>
                </span>
              )}
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
