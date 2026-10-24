"use client";

import { useEffect, useRef, useState } from "react";
import tank from "../config/ral-tank";

const hexToRgb = (hex) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

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

// Paints the steel shell of the vessel in a chosen colour while keeping the photo's lighting,
// weld seams, rivets and reflections, so it reads as a coated 3D object rather than a flat fill.
export default function RalTankPreview({ colour, onReset }) {
  const canvasRef = useRef(null);
  const state = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (cancelled) return;
      const { width, height } = tank;
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(image, 0, 0, width, height);
      const base = ctx.getImageData(0, 0, width, height);

      // Outline mask.
      const mask = document.createElement("canvas");
      mask.width = width;
      mask.height = height;
      const mctx = mask.getContext("2d");
      mctx.fillStyle = "#fff";
      mctx.beginPath();
      tank.polygon.forEach(([x, y], index) => (index ? mctx.lineTo(x, y) : mctx.moveTo(x, y)));
      mctx.closePath();
      mctx.fill();
      const raw = mctx.getImageData(0, 0, width, height).data;
      const alpha = new Float32Array(width * height);
      for (let i = 0; i < alpha.length; i++) alpha[i] = raw[i * 4] / 255;
      feather(alpha, width, height);

      // Brightness of every pixel relative to the median brightness of the shell.
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
    };
    image.src = tank.image;
    return () => {
      cancelled = true;
    };
  }, []);

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
      // Body shading: darker areas darken the paint, brighter ones lift it a little.
      const body = Math.min(1.35, Math.max(0.12, 0.2 + 0.8 * sh));
      // Glossy highlights: bright reflections push the paint toward white.
      const spec = Math.min(0.85, Math.max(0, sh - 1.15) * 0.7);
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
      <div className="relative">
        <canvas ref={canvasRef} role="img" aria-label={tank.alt} className="block h-auto w-full" style={{ aspectRatio: `${tank.width} / ${tank.height}` }} />
        {!ready ? <p className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">Loading preview…</p> : null}
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
          <p className="text-sm text-gray-600">Choose a RAL colour to see it on the vessel.</p>
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
