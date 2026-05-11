// Adds thumbnail images to each blog index card and ensures internal links.
const fs = require('fs');
const file = './blog.html';
let html = fs.readFileSync(file, 'utf8');
const before = html.length;

// Match each blog index card and rewrite to include the featured image at top.
const cardPattern = /<a href="(?!https?)([^"]+\.html)" class="feature-card fade-in" style="text-decoration: none; display: block;[^"]*">([\s\S]*?)<\/a>/g;

let cardCount = 0;
html = html.replace(cardPattern, (full, href, inner) => {
  cardCount++;
  const slug = href.replace(/\.html$/, '');
  const titleMatch = inner.match(/<div class="feature-card__title">([^<]+)<\/div>/);
  const title = titleMatch ? titleMatch[1] : 'Article';
  const trimmed = inner.trim();
  return `<a href="${href}" class="feature-card fade-in" style="text-decoration: none; display: block; padding: 0; overflow: hidden;">
          <img src="blog-images/${slug}.jpg" alt="${title}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block;">
          <div style="padding: 28px 32px 32px;">
            ${trimmed}
          </div>
        </a>`;
});

fs.writeFileSync(file, html);
console.log(`Cards updated: ${cardCount}.  blog.html: ${before} → ${html.length} bytes`);
