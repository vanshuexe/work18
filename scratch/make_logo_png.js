const sharp = require('sharp');

const circleMask = Buffer.from(
  '<svg width="1080" height="1080"><circle cx="540" cy="540" r="536" fill="white"/></svg>'
);

sharp('public/aeropolish-logo.jpeg')
  .extract({ left: 0, top: 3, width: 1080, height: 1080 })
  .composite([{ input: circleMask, blend: 'dest-in' }])
  .png()
  .toFile('public/new-images/aeropolish-logo-circle.png')
  .then(() => console.log('Successfully created public/new-images/aeropolish-logo-circle.png'))
  .catch(err => console.error(err));
