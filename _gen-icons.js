/*
 * _gen-icons.js — generate lightweight favicons from logo.png using sharp.
 *
 *   node _gen-icons.js
 *
 * Produces:
 *   favicon.png           32x32  (referenced by <link rel="icon">)
 *   favicon-16.png        16x16
 *   apple-touch-icon.png  180x180 (iOS home-screen)
 *
 * logo.png itself stays the og:image (full-size is better for social cards).
 */
const sharp = require('sharp');

const SRC = 'logo.png';

async function main() {
  await sharp(SRC).resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile('favicon.png');
  await sharp(SRC).resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile('favicon-16.png');
  await sharp(SRC).resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile('apple-touch-icon.png');
  console.log('Icons written: favicon.png (32), favicon-16.png (16), apple-touch-icon.png (180).');
}

main().catch((e) => {
  console.error('Icon generation failed:', e.message);
  process.exit(1);
});
