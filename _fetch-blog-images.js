// Downloads the featured image for each blog post URL.
const fs = require('fs');
const https = require('https');
const path = require('path');

const slugs = [
  'why-choose-chiropractic-care',
  'bulging-discs',
  'chiropractors-helps-auto-accident-patients',
  'chiropractic-care-for-back-pain',
  'chiropractic-clinic-discusses-different-types-headaches',
  'why-injuries-respond-to-chiropractic-care',
  'herniated-discs',
  'proper-child-backpacks',
  'kids-see-chiropractor',
  'the-value-of-health',
  'chiropractic-treatment-for-car-accidents',
  'sciatic-pain-helped-chiropractor',
  'the-best-time-to-see-a-chiropractor',
  'poor-posture-can-be-improved-by-chiropractors',
  'migraine-tips-from-a-chiropractic-clinic',
  'time-to-improve-your-health',
  '3-common-conditions-chiropractors-help',
  '3-tips-from-your-chiropractor',
  '5-reasons-to-choose-a-chiropractor',
  'are-you-looking-for-a-chiropractor',
  'back-pain-tips-city-chiropractor',
  'car-accident-tips-from-a-chiropractor',
  'chiropractor-talks-about-headaches',
  'chiropractors-have-extensive-schooling',
  'athletes-improve-with-chiropractic-care',
  'chiropractic-clinic-describes-stretching',
];

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(get(res.headers.location));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

function getText(url) {
  return get(url).then((b) => b.toString('utf8'));
}

async function findFeaturedImage(slug) {
  const html = await getText(`https://www.ephratachiropractorfamilytree.com/${slug}/`);
  // Look for the first image hosted on inceptionimages
  const matches = html.match(/https:\/\/[^"' ]*inceptionimages[^"' ]*\.(?:jpg|jpeg|png|webp)/g);
  if (!matches || matches.length === 0) return null;
  // Filter out small / favicon-ish, return the first which is typically the featured image
  return matches[0];
}

async function downloadImage(url, destPath) {
  const buf = await get(url);
  fs.writeFileSync(destPath, buf);
  return buf.length;
}

(async () => {
  if (!fs.existsSync('./blog-images')) fs.mkdirSync('./blog-images');
  const results = {};
  for (const slug of slugs) {
    try {
      const imgUrl = await findFeaturedImage(slug);
      if (!imgUrl) {
        console.log(`  ✗ ${slug}: no image found`);
        results[slug] = null;
        continue;
      }
      const ext = path.extname(new URL(imgUrl).pathname) || '.jpg';
      const dest = `./blog-images/${slug}${ext}`;
      const size = await downloadImage(imgUrl, dest);
      console.log(`  ✓ ${slug} → ${dest} (${size} bytes)`);
      results[slug] = `blog-images/${slug}${ext}`;
    } catch (err) {
      console.log(`  ✗ ${slug}: ${err.message}`);
      results[slug] = null;
    }
  }
  fs.writeFileSync('./_blog-images.json', JSON.stringify(results, null, 2));
  console.log(`\nManifest written to _blog-images.json`);
})();
