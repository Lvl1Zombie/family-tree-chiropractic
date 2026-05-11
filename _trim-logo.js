const sharp = require('sharp');
const fs = require('fs');

const out = './logo.png';
const backup = './logo.original.png';
const input = fs.existsSync(backup) ? backup : out;

(async () => {
  // Step 1: rectangular trim with an aggressive threshold to cut white borders
  const trimmed = await sharp(input).trim({ threshold: 50 }).toBuffer();
  const meta = await sharp(trimmed).metadata();

  // Step 2: build a circular mask, slightly inset so no white pixel survives
  const size = Math.min(meta.width, meta.height);
  const radius = size / 2 - 3;
  const cx = meta.width / 2;
  const cy = meta.height / 2;
  const mask = Buffer.from(
    `<svg width="${meta.width}" height="${meta.height}"><circle cx="${cx}" cy="${cy}" r="${radius}" fill="white"/></svg>`
  );

  // Step 3: dest-in composite keeps only pixels inside the circle, transparent outside
  await sharp(trimmed)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toFile(out + '.tmp');

  fs.renameSync(out + '.tmp', out);

  const final = await sharp(out).metadata();
  console.log(`Final: ${final.width}x${final.height} (circle radius ${radius})`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
