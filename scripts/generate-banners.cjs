/* Draws the product-category banners (wall, roller, ladder, paint can and brush)
 * as shaded, 3D-style scenes into public/new-images/banner-<slug>.svg.
 *
 * Run:  node scripts/generate-banners.cjs
 */
const fs = require("fs");
const path = require("path");

const themes = {
  interior: { wallTop: "#f3edf8", wallBottom: "#d9c9ea", paint: "#7a3fa8", paintDark: "#3d1760", floor: "#c08d5d" },
  exterior: { decor: "siding", wallTop: "#f7e9e4", wallBottom: "#e8c5bd", paint: "#c0303f", paintDark: "#5e0f1c", floor: "#a8a29a" },
  industrial: { decor: "corrugated", wallTop: "#e6edf7", wallBottom: "#c3d3ec", paint: "#1f66d6", paintDark: "#04204f", floor: "#8b95a3" },
  ink: { wallTop: "#e9e6f8", wallBottom: "#cfc8ef", paint: "#5f43b8", paintDark: "#231d63", floor: "#9a93b5" },
};

function scene(t) {
  const W = 1600;
  const H = 560;
  const floorY = 470;
  const L = { bl: 1130, br: 1390, tl: 1200, tr: 1320, top: 90 };
  const railX = (side, y) => {
    const k = (floorY - y) / (floorY - L.top);
    return side === "l" ? L.bl + (L.tl - L.bl) * k : L.br + (L.tr - L.br) * k;
  };
  const rungs = [160, 240, 320, 400]
    .map((y) => {
      const x1 = railX("l", y);
      const w = railX("r", y) - x1;
      return `<rect x="${x1}" y="${y - 8}" width="${w}" height="16" rx="5" fill="url(#rung)" stroke="#8793a3" stroke-width="1.5"/><rect x="${x1 + 4}" y="${y - 6}" width="${w - 8}" height="3" rx="1.5" fill="#fff" opacity="0.8"/><rect x="${x1}" y="${y + 8}" width="${w}" height="7" fill="#000" opacity="0.12" filter="url(#soft2)"/>`;
    })
    .join("");
  const planks = Array.from({ length: 9 }, (_, i) => {
    const y = floorY + 6 + i * 10;
    return `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#000" stroke-opacity="0.22" stroke-width="1.5"/>`;
  }).join("");
  const seams = Array.from({ length: 22 }, (_, i) => {
    const y0 = floorY + 6 + (i % 8) * 10;
    const x = 60 + i * 74 + (i % 3) * 21;
    return `<line x1="${x}" y1="${y0}" x2="${x}" y2="${y0 + 10}" stroke="#000" stroke-opacity="0.2" stroke-width="1.5"/>`;
  }).join("");
  const splatter = [
    [905, 118, 7], [885, 96, 4], [930, 150, 5], [872, 330, 6], [902, 352, 3.5], [1480, 220, 6], [1510, 250, 4], [1450, 190, 3],
  ]
    .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${t.paint}"/><circle cx="${x - r * 0.3}" cy="${y - r * 0.3}" r="${r * 0.35}" fill="#fff" opacity="0.55"/>`)
    .join("");
  // Exterior: horizontal wall cladding. Industrial: corrugated sheet and a steel drum.
  const siding = Array.from({ length: 22 }, (_, i) => `<line x1="0" y1="${i * 22 + 12}" x2="${W}" y2="${i * 22 + 12}" stroke="#000" stroke-opacity="0.16" stroke-width="2"/><line x1="0" y1="${i * 22 + 14}" x2="${W}" y2="${i * 22 + 14}" stroke="#fff" stroke-opacity="0.35" stroke-width="1.5"/>`).join("");
  const corrugated = Array.from({ length: 80 }, (_, i) => `<rect x="${i * 20}" y="0" width="20" height="${floorY}" fill="url(#ridge)"/>`).join("");
  const drum = `<ellipse cx="1500" cy="${floorY + 12}" rx="80" ry="12" fill="url(#shadow)"/><g filter="url(#drop)"><rect x="1442" y="346" width="116" height="124" rx="10" fill="#5c6b7c"/><rect x="1442" y="346" width="116" height="124" rx="10" fill="url(#barrel)"/><rect x="1442" y="376" width="116" height="8" fill="#000" opacity="0.28"/><rect x="1442" y="430" width="116" height="8" fill="#000" opacity="0.28"/><rect x="1470" y="394" width="60" height="28" rx="3" fill="#f2b705"/><text x="1500" y="413" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="700" font-size="11" fill="#222">INDUSTRIAL</text><ellipse cx="1500" cy="346" rx="58" ry="10" fill="url(#metal)" stroke="#7f8a99" stroke-width="1.5"/></g>`;
  const wallDecor = t.decor === "siding" ? siding : t.decor === "corrugated" ? corrugated : "";
  const extra = t.decor === "corrugated" ? drum : "";
  const edge = "M860 0 C815 70 905 120 862 200 S815 320 868 392 S838 446 856 " + floorY;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 40 ${W} 470" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.wallTop}"/><stop offset="1" stop-color="${t.wallBottom}"/></linearGradient>
    <radialGradient id="light" cx="0.18" cy="0.2" r="0.9"><stop offset="0" stop-color="#fff" stop-opacity="0.55"/><stop offset="0.6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.22"/></radialGradient>
    <linearGradient id="fresh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${t.paintDark}"/><stop offset="0.3" stop-color="${t.paint}"/><stop offset="0.7" stop-color="${t.paint}"/><stop offset="1" stop-color="${t.paintDark}"/></linearGradient>
    <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="ridge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0.2"/><stop offset="0.45" stop-color="#fff" stop-opacity="0.28"/><stop offset="1" stop-color="#000" stop-opacity="0.05"/></linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.floor}"/><stop offset="1" stop-color="#5a4838"/></linearGradient>
    <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.38"/><stop offset="0.5" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="rail" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9aa5b4"/><stop offset="0.3" stop-color="#fbfdff"/><stop offset="0.7" stop-color="#cdd5df"/><stop offset="1" stop-color="#7d8998"/></linearGradient>
    <linearGradient id="rung" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfdff"/><stop offset="0.5" stop-color="#d4dbe4"/><stop offset="1" stop-color="#8f9aa9"/></linearGradient>
    <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7f8a99"/><stop offset="0.25" stop-color="#f7f9fb"/><stop offset="0.55" stop-color="#c9d1db"/><stop offset="1" stop-color="#6f7b8a"/></linearGradient>
    <linearGradient id="cyl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.55"/><stop offset="0.25" stop-color="#fff" stop-opacity="0.08"/><stop offset="0.7" stop-color="#000" stop-opacity="0.12"/><stop offset="1" stop-color="#000" stop-opacity="0.45"/></linearGradient>
    <linearGradient id="barrel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0.45"/><stop offset="0.22" stop-color="#fff" stop-opacity="0.28"/><stop offset="0.5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.5"/></linearGradient>
    <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1c58f"/><stop offset="0.45" stop-color="#d79a5b"/><stop offset="1" stop-color="#8e5a2b"/></linearGradient>
    <radialGradient id="pool" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff" stop-opacity="0.65"/><stop offset="0.5" stop-color="${t.paint}" stop-opacity="0"/><stop offset="1" stop-color="${t.paintDark}" stop-opacity="0.5"/></radialGradient>
    <radialGradient id="shadow"><stop offset="0" stop-color="#000" stop-opacity="0.5"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="4"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.45"/></feComponentTransfer></filter>
    <filter id="nap" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.6 0.9" numOctaves="2" seed="9"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.8"/></feComponentTransfer></filter>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14"/></filter>
    <filter id="soft2" x="-10%" y="-100%" width="120%" height="300%"><feGaussianBlur stdDeviation="2.5"/></filter>
    <filter id="drop" x="-30%" y="-30%" width="170%" height="170%"><feDropShadow dx="7" dy="12" stdDeviation="8" flood-color="#000" flood-opacity="0.35"/></filter>
    <clipPath id="paintClip"><path d="${edge} L${W} ${floorY} L${W} 0 Z"/></clipPath>
    <clipPath id="rollerClip"><rect x="640" y="190" width="190" height="52" rx="26"/></clipPath>
  </defs>

  <!-- wall: gradient, window light and plaster grain -->
  <rect width="${W}" height="${floorY}" fill="url(#wall)"/>
  <rect width="${W}" height="${floorY}" filter="url(#grain)" opacity="0.14" style="mix-blend-mode:multiply"/>
  ${wallDecor}
  <rect width="${W}" height="${floorY}" fill="url(#light)"/>
  <rect y="${floorY - 18}" width="${W}" height="18" fill="#fbfbfb"/>
  <rect y="${floorY - 18}" width="${W}" height="4" fill="#000" opacity="0.1"/>

  <!-- floor: wood planks with a gloss -->
  <rect y="${floorY}" width="${W}" height="${H - floorY}" fill="url(#floor)"/>
  ${planks}${seams}
  <rect y="${floorY}" width="${W}" height="${H - floorY}" fill="url(#gloss)"/>

  <!-- freshly painted area: glossy, with a thick wet edge -->
  <path d="${edge} L${W} ${floorY} L${W} 0 Z" fill="url(#fresh)"/>
  <g clip-path="url(#paintClip)">
    <rect x="800" width="800" height="${floorY}" fill="url(#sheen)"/>
    <path d="M1030 0 C1000 90 1060 170 1028 260 S1010 380 1040 ${floorY} L1100 ${floorY} C1075 380 1095 250 1070 170 S1085 60 1075 0 Z" fill="#fff" opacity="0.1" filter="url(#soft2)"/>
    <path d="${edge}" fill="none" stroke="#000" stroke-opacity="0.28" stroke-width="14" filter="url(#soft2)"/>
  </g>
  <path d="${edge}" fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="3"/>
  <path d="M868 6 C826 74 912 124 872 202 S826 322 878 394" fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="6" filter="url(#soft2)"/>
  ${splatter}

  <!-- ladder cast shadow on the wall -->
  <path d="M${L.bl + 70} ${floorY} L${L.tl + 80} ${L.top + 20} L${L.tr + 80} ${L.top + 20} L${L.br + 70} ${floorY} Z" fill="#000" opacity="0.22" filter="url(#soft)"/>

  <!-- ladder -->
  <ellipse cx="${(L.bl + L.br) / 2}" cy="${floorY + 18}" rx="210" ry="20" fill="url(#shadow)"/>
  <g filter="url(#drop)">
    <path d="M${L.bl + 10} ${floorY} L${L.tl + 10} ${L.top} L${L.tl + 36} ${L.top} L${L.bl + 38} ${floorY} Z" fill="#6c7786"/>
    <path d="M${L.br + 10} ${floorY} L${L.tr + 10} ${L.top} L${L.tr - 12} ${L.top} L${L.br - 14} ${floorY} Z" fill="#6c7786"/>
    <path d="M${L.bl} ${floorY} L${L.tl} ${L.top} L${L.tl + 24} ${L.top} L${L.bl + 28} ${floorY} Z" fill="url(#rail)" stroke="#8793a3" stroke-width="1.5"/>
    <path d="M${L.br} ${floorY} L${L.tr} ${L.top} L${L.tr - 22} ${L.top} L${L.br - 26} ${floorY} Z" fill="url(#rail)" stroke="#8793a3" stroke-width="1.5"/>
    ${rungs}
    <rect x="${L.tl - 10}" y="${L.top - 18}" width="${L.tr - L.tl + 20}" height="22" rx="7" fill="url(#rung)" stroke="#8793a3" stroke-width="1.5"/>
    <rect x="${L.tl - 4}" y="${L.top - 16}" width="${L.tr - L.tl + 8}" height="4" rx="2" fill="#fff" opacity="0.85"/>
  </g>
  <rect x="${L.bl - 6}" y="${floorY - 9}" width="40" height="14" rx="5" fill="#1f242d"/>
  <rect x="${L.br - 34}" y="${floorY - 9}" width="40" height="14" rx="5" fill="#1f242d"/>
  <!-- paint pot on the ladder top -->
  <g filter="url(#drop)">
    <rect x="${L.tl + 24}" y="${L.top - 60}" width="48" height="42" rx="6" fill="url(#metal)" stroke="#7f8a99" stroke-width="1.5"/>
    <rect x="${L.tl + 24}" y="${L.top - 44}" width="48" height="16" fill="${t.paint}"/>
    <rect x="${L.tl + 24}" y="${L.top - 44}" width="48" height="16" fill="url(#barrel)"/>
  </g>

  <!-- paint can -->
  <ellipse cx="1020" cy="${floorY + 14}" rx="96" ry="14" fill="url(#shadow)"/>
  <g filter="url(#drop)">
    <rect x="962" y="372" width="116" height="100" rx="8" fill="url(#metal)" stroke="#7f8a99" stroke-width="1.5"/>
    <rect x="962" y="404" width="116" height="38" fill="${t.paint}"/>
    <rect x="962" y="404" width="116" height="38" fill="url(#barrel)"/>
    <text x="1020" y="430" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="700" font-size="16" letter-spacing="0.5" fill="#fff">AEROPOLISH</text>
    <rect x="962" y="372" width="116" height="100" rx="8" fill="url(#barrel)" opacity="0.5"/>
    <ellipse cx="1020" cy="372" rx="58" ry="12" fill="url(#metal)" stroke="#7f8a99" stroke-width="1.5"/>
    <ellipse cx="1020" cy="373" rx="48" ry="8.5" fill="${t.paint}"/>
    <ellipse cx="1020" cy="373" rx="48" ry="8.5" fill="url(#pool)"/>
    <path d="M986 380 C984 398 994 406 990 424 C988 434 1001 434 999 416 C997 402 1005 392 1003 381 Z" fill="${t.paint}"/>
    <path d="M990 386 C989 398 994 404 992 414" fill="none" stroke="#fff" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round"/>
    <path d="M1048 380 C1046 392 1054 398 1050 412 C1048 419 1058 419 1058 410 C1058 396 1063 390 1061 381 Z" fill="${t.paint}"/>
  </g>

  ${extra}

  <!-- brush resting across the can -->
  <g transform="translate(70 -8) rotate(-24 1030 352)" filter="url(#drop)">
    <rect x="990" y="336" width="160" height="18" rx="9" fill="url(#wood)"/>
    <rect x="994" y="339" width="150" height="3.5" rx="1.75" fill="#fff" opacity="0.55"/>
    <rect x="936" y="331" width="62" height="28" rx="5" fill="url(#metal)" stroke="#7f8a99" stroke-width="1.5"/>
    <path d="M944 331 V359 M954 331 V359" stroke="#5f6b7a" stroke-opacity="0.55" stroke-width="1.5"/>
    <path d="M936 333 L888 337 C876 344 876 346 888 354 L936 358 Z" fill="${t.paint}"/>
    <path d="M936 335 L890 341 M936 341 L886 345 M936 347 L886 349 M936 353 L890 354" stroke="#fff" stroke-opacity="0.35" stroke-width="1.4"/>
    <path d="M936 333 L888 337 C876 344 876 346 888 354 L936 358 Z" fill="url(#cyl)"/>
  </g>

  <!-- roller painting the wall edge -->
  <g transform="translate(70 14) rotate(-24 735 216)" filter="url(#drop)">
    <rect x="727" y="278" width="16" height="150" rx="8" fill="url(#wood)"/>
    <rect x="727" y="300" width="16" height="9" fill="#2a2f3a" opacity="0.85"/>
    <rect x="727" y="318" width="16" height="9" fill="#2a2f3a" opacity="0.85"/>
    <rect x="729" y="282" width="3" height="140" rx="1.5" fill="#fff" opacity="0.45"/>
    <path d="M830 216 H856 V282 H735" fill="none" stroke="#5d6877" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M830 214 H854 V280 H735" fill="none" stroke="#dfe5ec" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>
    <rect x="640" y="190" width="190" height="52" rx="26" fill="${t.paint}"/>
    <g clip-path="url(#rollerClip)">
      <rect x="640" y="190" width="190" height="52" filter="url(#nap)" opacity="0.5" style="mix-blend-mode:multiply"/>
      <rect x="640" y="190" width="190" height="52" fill="url(#barrel)"/>
      <rect x="640" y="190" width="190" height="52" fill="url(#cyl)"/>
    </g>
    <ellipse cx="826" cy="216" rx="9" ry="22" fill="${t.paintDark}" opacity="0.65"/>
    <ellipse cx="644" cy="216" rx="6" ry="22" fill="#fff" opacity="0.18"/>
    <rect x="652" y="194" width="150" height="5" rx="2.5" fill="#fff" opacity="0.4"/>
  </g>
</svg>
`;
}

const outDir = path.join(__dirname, "..", "public", "new-images");
for (const [slug, theme] of Object.entries(themes)) {
  const file = path.join(outDir, `banner-${slug}.svg`);
  fs.writeFileSync(file, scene(theme));
  console.log("wrote " + path.relative(path.join(__dirname, ".."), file));
}
