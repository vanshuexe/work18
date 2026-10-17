const sharp = require('sharp');

// Test overlay on contact-preview.jpg (1200x1200)
const svgOverlay = Buffer.from(`
<svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#4a187a" />
      <stop offset="100%" stop-color="#351059" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Left building sign -->
  <g transform="translate(62, 555)">
    <rect x="0" y="0" width="118" height="32" rx="7" fill="url(#badgeGrad)" stroke="#ffffff" stroke-width="2" filter="url(#shadow)" />
    <text x="59" y="21" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">AEROPOLISH</text>
  </g>

  <!-- Right building sign -->
  <g transform="translate(1045, 555)">
    <rect x="0" y="0" width="115" height="32" rx="7" fill="url(#badgeGrad)" stroke="#ffffff" stroke-width="2" filter="url(#shadow)" />
    <text x="57" y="21" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">AEROPOLISH</text>
  </g>
</svg>
`);

sharp('public/new-images/contact-preview.jpg')
  .composite([{ input: svgOverlay, top: 0, left: 0 }])
  .toFile('public/new-images/contact-test-result.jpg')
  .then(() => console.log('Saved contact test result'));
