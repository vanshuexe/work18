'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// slides: [{ src, alt, title, text, contain? }]
export default function HeroSlider({ slides, interval = 6000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => setIndex((value) => (value + 1) % slides.length), interval);
    return () => clearInterval(timer);
  }, [paused, slides.length, interval]);

  const go = (next) => setIndex((next + slides.length) % slides.length);

  return (
    <div
      className="slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured products"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`slider-slide${i === index ? ' is-active' : ''}${slide.contain ? ' slider-slide--contain' : ''}`}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${slides.length}`}
          aria-hidden={i !== index}
        >
          <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 900px) 100vw, 48vw" priority={i === 0} />
        </div>
      ))}
      <div className="slider-caption" aria-live="polite">
        <span>
          <strong>{slides[index].title}</strong>
          <br />
          {slides[index].text}
        </span>
        <span className="slider-controls">
          <span className="slider-dots">
            {slides.map((slide, i) => (
              <button type="button" key={slide.src} aria-label={`Show slide ${i + 1}`} aria-current={i === index} onClick={() => go(i)} />
            ))}
          </span>
          <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)}>←</button>
          <button type="button" aria-label="Next slide" onClick={() => go(index + 1)}>→</button>
        </span>
      </div>
    </div>
  );
}
