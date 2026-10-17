import { writeFileSync, mkdirSync } from "node:fs";
const out = "public/new-images";
mkdirSync(out, { recursive: true });
const palettes = {
  "interior-paints": ["#4f2777", "#c084fc", "#f47422"],
  "exterior-paints": ["#0f766e", "#38bdf8", "#4f2777"],
  "industrial-paints": ["#1e293b", "#475569", "#f47422"],
  "inks": ["#be185d", "#4f2777", "#06b6d4"],
  "alkyd": ["#b45309", "#f47422", "#4f2777"],
  "tinting-1": ["#4f2777", "#f47422", "#fde68a"],
  "tinting-2": ["#0e7490", "#4f2777", "#f9a8d4"],
  "tinting-3": ["#15803d", "#4f2777", "#fbbf24"],
  "careers": ["#312e81", "#4f2777", "#f47422"],
  "hero-1": ["#0b1d4d", "#4f2777", "#f47422"],
  "hero-2": ["#0f172a", "#7c3aed", "#f59e0b"],
  "hero-3": ["#052e2b", "#4f2777", "#38bdf8"],
  "hero-4": ["#3b0764", "#be185d", "#f47422"],
  "hero-5": ["#111827", "#4f2777", "#22d3ee"],
};
const W = 1850, H = 529;
for (const [name, [a, b, c]] of Object.entries(palettes)) {
  let waves = "";
  for (let i = 0; i < 6; i++) {
    const y = 140 + i * 60, amp = 60 + i * 12, col = [b, c, b, c, a, b][i];
    waves += `<path d="M0 ${y} C ${W * 0.25} ${y - amp}, ${W * 0.5} ${y + amp}, ${W * 0.75} ${y - amp / 2} S ${W} ${y} ${W} ${y} V ${H} H0 Z" fill="${col}" opacity="${0.22 + i * 0.07}"/>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/>${waves}</svg>`;
  writeFileSync(`${out}/${name}.svg`, svg);
}
