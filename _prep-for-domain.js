/*
 * _prep-for-domain.js
 *
 * One-shot build step that prepares the static site for launch on a real
 * domain. It is idempotent — safe to re-run after editing pages.
 *
 *   node _prep-for-domain.js
 *
 * For every *.html page it injects (once, right after the styles.css link):
 *   - <link rel="canonical">           the page's absolute URL
 *   - favicon + apple-touch-icon       wired to logo.png
 *   - Open Graph + Twitter card tags   reusing the page's own <title>/description
 *
 * It then (re)generates sitemap.xml and robots.txt from the page list.
 *
 * Change DOMAIN here if the site ever moves again.
 */
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://ephratachiropractic.com';
const SITE_NAME = 'Family Tree Chiropractic';
const OG_IMAGE = `${DOMAIN}/logo.png`;

// Pages that are not part of the public sitemap / shouldn't get tags.
const EXCLUDE = new Set(['404.html']);

const htmlFiles = fs
  .readdirSync('.')
  .filter((f) => f.endsWith('.html') && !EXCLUDE.has(f))
  .sort();

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—');
}

function attrEscape(s) {
  // Safe for use inside a double-quoted HTML attribute value.
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function canonicalFor(file) {
  return file === 'index.html' ? `${DOMAIN}/` : `${DOMAIN}/${file}`;
}

let injected = 0;
let skipped = 0;

// Old domain referenced in footers / contact copy before the move.
const OLD_DOMAIN_HOST = 'familytreechiro.com';
const NEW_DOMAIN_HOST = 'ephratachiropractic.com';

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');

  // Always retarget any leftover references to the old domain, even on pages
  // that already have canonical tags from a previous run.
  if (html.includes(OLD_DOMAIN_HOST)) {
    html = html.split(OLD_DOMAIN_HOST).join(NEW_DOMAIN_HOST);
    fs.writeFileSync(file, html);
  }

  if (html.includes('rel="canonical"')) {
    skipped++;
    continue;
  }

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const descMatch = html.match(/<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/?>/i);

  const title = titleMatch ? decodeEntities(titleMatch[1].trim()) : SITE_NAME;
  const desc = descMatch ? decodeEntities(descMatch[1].trim()) : '';
  const url = canonicalFor(file);

  const ogTitle = attrEscape(title);
  const ogDesc = attrEscape(desc);

  const block = `  <link rel="canonical" href="${url}">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <meta name="theme-color" content="#173A2E">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:title" content="${ogTitle}">
  <meta property="og:description" content="${ogDesc}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${OG_IMAGE}">
  <meta property="og:image:alt" content="${SITE_NAME}">
  <meta property="og:locale" content="en_US">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${ogTitle}">
  <meta name="twitter:description" content="${ogDesc}">
  <meta name="twitter:image" content="${OG_IMAGE}">`;

  // Insert immediately after the stylesheet link that closes the visible head.
  const anchor = '<link rel="stylesheet" href="styles.css">';
  if (!html.includes(anchor)) {
    console.warn(`  ! ${file}: no styles.css anchor found, injecting before </head>`);
    html = html.replace(/<\/head>/i, `${block}\n</head>`);
  } else {
    html = html.replace(anchor, `${anchor}\n${block}`);
  }

  fs.writeFileSync(file, html);
  injected++;
}

console.log(`Meta injection: ${injected} pages updated, ${skipped} already had tags.`);

// ---- sitemap.xml ----------------------------------------------------------
const urls = htmlFiles
  .map((file) => {
    const stat = fs.statSync(file);
    const lastmod = stat.mtime.toISOString().slice(0, 10);
    const loc = canonicalFor(file);
    const priority = file === 'index.html' ? '1.0' : '0.7';
    const changefreq = file === 'index.html' ? 'weekly' : 'monthly';
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
fs.writeFileSync('sitemap.xml', sitemap);
console.log(`sitemap.xml: ${htmlFiles.length} URLs.`);

// ---- robots.txt -----------------------------------------------------------
const robots = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;
fs.writeFileSync('robots.txt', robots);
console.log('robots.txt written.');
