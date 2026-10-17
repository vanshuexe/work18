const sharp = require('sharp');
const path = require('path');

const svgOverlay = Buffer.from(`
<svg width="268" height="284" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3d215d" />
      <stop offset="100%" stop-color="#4e2c77" />
    </linearGradient>
  </defs>
  <!-- Rounded rectangle precisely covering the old brand badge -->
  <rect x="91" y="85" width="87" height="25" rx="5" fill="url(#badgeGrad)" stroke="#b28bd8" stroke-width="1.5" />
  <text x="134" y="101" font-family="Arial, Helvetica, sans-serif" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.8">AEROPOLISH</text>
</svg>
`);

sharp(path.join(__dirname, '../public/Metal.png'))
  .composite([{ input: svgOverlay, top: 0, left: 0 }])
  .toFile(path.join(__dirname, '../public/new-images/metal-aeropolish.png'))
  .then(() => console.log('Successfully generated public/new-images/metal-aeropolish.png'))
  .catch(err => console.error(err));
