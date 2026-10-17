const sharp = require('sharp');

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s, l];
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360 / 360;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

async function createCleanRecolor(targetHue, satBoost = 1.1, lightFactor = 1.0) {
  const { data, info } = await sharp('public/new-images/ink-original.webp')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const output = Buffer.from(data);
  for (let i = 0; i < output.length; i += info.channels) {
    const a = output[i + 3];
    if (a < 30) continue;
    const r = output[i], g = output[i+1], b = output[i+2];
    const [h, s, l] = rgbToHsl(r, g, b);

    // Is this a purple/violet part?
    // Purple has hue generally 220..330, or (b > g && r > g)
    // Avoid pure white/greys (s < 0.05) and very bright pure whites (l > 0.95)
    const isPurpleHue = (h >= 220 && h <= 340);
    const hasPurpleTint = (b > g + 4 && r > g + 2);
    
    if ((isPurpleHue || hasPurpleTint) && s > 0.05 && l < 0.93) {
      const hueOffset = (h >= 220 && h <= 340) ? (h - 280) * 0.4 : 0;
      const newHue = targetHue + hueOffset;
      const newSat = Math.min(1.0, s * satBoost);
      const newLight = Math.min(1.0, l * lightFactor);
      const [nr, ng, nb] = hslToRgb(newHue, newSat, newLight);
      output[i] = nr;
      output[i+1] = ng;
      output[i+2] = nb;
    }
  }

  return { buffer: output, width: info.width, height: info.height, channels: info.channels };
}

async function test() {
  const cyan = await createCleanRecolor(205, 1.25, 1.0);
  await sharp(cyan.buffer, { raw: { width: cyan.width, height: cyan.height, channels: cyan.channels } })
    .resize(1000, 992)
    .toFile('scratch/clean-cyan.png');
  console.log('Saved scratch/clean-cyan.png');
}

test().catch(console.error);
