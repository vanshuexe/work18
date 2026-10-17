const sharp = require('sharp');

const svgCropOverlay = Buffer.from(`
<svg width="800" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="purpleGlow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#4a187a" />
      <stop offset="100%" stop-color="#351059" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Big right sign -->
  <g transform="translate(355, 75)">
    <rect x="0" y="0" width="250" height="70" rx="14" fill="url(#purpleGlow)" stroke="#ffffff" stroke-width="3" filter="url(#shadow)" />
    <text x="125" y="45" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">AEROPOLISH</text>
  </g>

  <!-- Small left sign -->
  <g transform="translate(94, 143)">
    <rect x="0" y="0" width="132" height="46" rx="10" fill="url(#purpleGlow)" stroke="#ffffff" stroke-width="2.5" filter="url(#shadow)" />
    <text x="66" y="30" font-family="Arial, Helvetica, sans-serif" font-size="13.5" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.8">AEROPOLISH</text>
  </g>

  <!-- Poster tiny badge -->
  <rect x="273" y="228" width="48" height="18" rx="4" fill="#4a187a" />
  <text x="297" y="241" font-family="Arial, sans-serif" font-size="6.5" font-weight="bold" fill="#ffffff" text-anchor="middle">AEROPOLISH</text>
</svg>
`);

sharp('public/new-images/test-signs-crop.jpg')
  .composite([{ input: svgCropOverlay, top: 0, left: 0 }])
  .toFile('public/new-images/test-signs-crop-result.jpg')
  .then(() => console.log('Generated test crop result'));
