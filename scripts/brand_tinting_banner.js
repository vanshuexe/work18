const sharp = require('sharp');
const path = require('path');

const svgFullOverlay = Buffer.from(`
<svg width="3693" height="817" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="purpleGlow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#4a187a" />
      <stop offset="100%" stop-color="#351059" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Big right illuminated fascia sign -->
  <g transform="translate(2863, 178)">
    <rect x="0" y="0" width="246" height="68" rx="14" fill="url(#purpleGlow)" stroke="#ffffff" stroke-width="3" filter="url(#shadow)" />
    <text x="123" y="44" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">AEROPOLISH</text>
  </g>

  <!-- Small left fascia sign -->
  <g transform="translate(2602, 247)">
    <rect x="0" y="0" width="126" height="44" rx="10" fill="url(#purpleGlow)" stroke="#ffffff" stroke-width="2.5" filter="url(#shadow)" />
    <text x="63" y="29" font-family="Arial, Helvetica, sans-serif" font-size="13.5" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.8">AEROPOLISH</text>
  </g>

  <!-- Poster tiny badge -->
  <rect x="2751" y="328" width="50" height="18" rx="4" fill="#4a187a" />
  <text x="2776" y="341" font-family="Arial, sans-serif" font-size="6.5" font-weight="bold" fill="#ffffff" text-anchor="middle">AEROPOLISH</text>
</svg>
`);

sharp('public/new-images/tinting-centers-original.webp')
  .composite([{ input: svgFullOverlay, top: 0, left: 0 }])
  .webp({ quality: 90 })
  .toFile('public/new-images/tinting-centers-aeropolish.webp')
  .then(() => console.log('Successfully generated public/new-images/tinting-centers-aeropolish.webp'))
  .catch(err => console.error(err));
