"use client";

import { useEffect, useRef, useState } from "react";
import objects from "../config/ral-objects";

const hexToRgb = (hex) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${src}`));
    image.src = src;
  });

// Soften the mask edge with two cheap box-blur passes so the paint does not end in a jagged line.
function feather(alpha, width, height) {
  const tmp = new Float32Array(alpha.length);
  for (let pass = 0; pass < 2; pass++) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = y * width + x;
        tmp[i] = (alpha[i - (x > 0 ? 1 : 0)] + alpha[i] + alpha[i + (x < width - 1 ? 1 : 0)]) / 3;
      }
    }
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = y * width + x;
        alpha[i] = (tmp[i - (y > 0 ? width : 0)] + tmp[i] + tmp[i + (y < height - 1 ? width : 0)]) / 3;
      }
    }
  }
}

// Paints the steel of the chosen photo in a RAL colour while keeping the photo's lighting, texture
// and reflections, so it reads as a coated 3D object rather than a flat fill.
export default function RalPreview({ colour, onReset }) {
  const canvasRef = useRef(null);
  const state = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [objectKey, setObjectKey] = useState(objects[0].key);
  const object = objects.find((item) => item.key === objectKey) || objects[0];

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    setFailed(false);
    state.current = null;
    (async () => {
      try {
        const { width, height } = object;
        const [image, maskImage] = await Promise.all([loadImage(object.image), object.mask ? loadImage(object.mask) : null]);
        if (cancelled) return;
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(image, 0, 0, width, height);
        const base = ctx.getImageData(0, 0, width, height);

        // Which pixels get painted.
        const mask = document.createElement("canvas");
        mask.width = width;
        mask.height = height;
        const mctx = mask.getContext("2d", { willReadFrequently: true });
        if (maskImage) {
          mctx.drawImage(maskImage, 0, 0, width, height);
        } else {
          mctx.fillStyle = "#fff";
          mctx.beginPath();
          object.polygon.forEach(([x, y], index) => (index ? mctx.lineTo(x, y) : mctx.moveTo(x, y)));
          mctx.closePath();
          mctx.fill();
        }
        const raw = mctx.getImageData(0, 0, width, height).data;
        const alpha = new Float32Array(width * height);
        for (let i = 0; i < alpha.length; i++) alpha[i] = raw[i * 4] / 255;
        feather(alpha, width, height);

        // Brightness of every pixel relative to the median brightness of the painted area.
        const luma = new Float32Array(width * height);
        const histogram = new Uint32Array(256);
        let count = 0;
        for (let i = 0; i < luma.length; i++) {
          const l = 0.299 * base.data[i * 4] + 0.587 * base.data[i * 4 + 1] + 0.114 * base.data[i * 4 + 2];
          luma[i] = l;
          if (alpha[i] > 0.9) {
            histogram[Math.round(l)]++;
            count++;
          }
        }
        let acc = 0;
        let median = 128;
        for (let v = 0; v < 256; v++) {
          acc += histogram[v];
          if (acc >= count / 2) {
            median = Math.max(v, 40);
            break;
          }
        }
        const shade = new Float32Array(luma.length);
        for (let i = 0; i < luma.length; i++) shade[i] = luma[i] / median;

        state.current = { ctx, base, alpha, shade, width, height };
        setReady(true);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [object]);

  useEffect(() => {
    const s = state.current;
    if (!ready || !s) return;
    const { ctx, base, alpha, shade, width, height } = s;
    const out = ctx.createImageData(width, height);
    const src = base.data;
    const dst = out.data;
    const target = colour ? hexToRgb(colour.hex) : null;
    for (let i = 0; i < alpha.length; i++) {
      const o = i * 4;
      const a = target ? alpha[i] : 0;
      if (a <= 0.003) {
        dst[o] = src[o];
        dst[o + 1] = src[o + 1];
        dst[o + 2] = src[o + 2];
        dst[o + 3] = 255;
        continue;
      }
      const sh = shade[i];
      // Body shading around the true colour: an average pixel shows the exact RAL colour, darker
      // areas go a little darker and brighter ones a little lighter. Kept gentle so the colour reads true.
      const body = Math.min(1.12, Math.max(0.4, 1 + (sh - 1) * 0.55));
      // Only a faint sheen on the brightest reflections, so the steel does not look chrome-plated.
      const spec = Math.min(0.14, Math.max(0, sh - 1.35) * 0.16);
      for (let c = 0; c < 3; c++) {
        const painted = target[c] * body;
        const lit = painted + (255 - painted) * spec;
        const v = Math.max(0, Math.min(255, lit));
        dst[o + c] = src[o + c] * (1 - a) + v * a;
      }
      dst[o + 3] = 255;
    }
    ctx.putImageData(out, 0, 0);
  }, [colour, ready]);

  return (
    <figure className="overflow-hidden rounded-2xl border border-gray-200 bg-[#e8ecf1] shadow-sm">
      <div className="flex flex-wrap gap-2 bg-white px-4 py-3" role="group" aria-label="Choose what to preview">
        {objects.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setObjectKey(item.key)}
            aria-pressed={item.key === object.key}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              item.key === object.key ? "border-[#512178] bg-[#512178] text-white" : "border-gray-300 bg-white text-gray-700 hover:border-[#512178]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="relative">
        <canvas ref={canvasRef} role="img" aria-label={object.alt} className="block h-auto w-full" style={{ aspectRatio: `${object.width} / ${object.height}` }} />
        {!ready ? (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">{failed ? "Could not load the preview." : "Loading preview…"}</p>
        ) : null}
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3">
        {colour ? (
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 flex-shrink-0 rounded-lg border border-black/10" style={{ backgroundColor: colour.hex }} />
            <div className="leading-tight">
              <p className="font-poppins text-sm font-bold text-gray-900">RAL {colour.code}</p>
              <p className="text-xs text-gray-600">{colour.name}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600">Choose a RAL colour to see it on {object.target}.</p>
        )}
        {colour ? (
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-gray-300 px-3.5 py-1.5 text-xs font-semibold text-gray-700 hover:border-[#512178]"
          >
            Show bare steel
          </button>
        ) : null}
      </figcaption>
    </figure>
  );
}
