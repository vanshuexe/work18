const sharp = require('sharp');

const svgOverlay1600 = Buffer.from(`
<svg width="1600" height="1600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#4a187a" />
      <stop offset="100%" stop-color="#351059" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Left building sign -->
  <g transform="translate(82, 736)">
    <rect x="0" y="0" width="160" height="44" rx="10" fill="url(#badgeGrad)" stroke="#ffffff" stroke-width="2.5" filter="url(#shadow)" />
    <text x="80" y="28" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.8">AEROPOLISH</text>
  </g>

  <!-- Right building sign -->
  <g transform="translate(1393, 736)">
    <rect x="0" y="0" width="157" height="44" rx="10" fill="url(#badgeGrad)" stroke="#ffffff" stroke-width="2.5" filter="url(#shadow)" />
    <text x="78" y="28" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.8">AEROPOLISH</text>
  </g>
</svg>
`);

sharp('public/new-images/contact-original.webp')
  .resize(1600, 1600)
  .composite([{ input: svgOverlay1600, top: 0, left: 0 }])
  .webp({ quality: 85 })
  .toFile('public/new-images/contact-aeropolish.webp')
  .then(() => console.log('Successfully generated public/new-images/contact-aeropolish.webp'))
  .catch(err => console.error(err));
