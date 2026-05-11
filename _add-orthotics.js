const fs = require('fs');
const re = /(\s*<a href="plantar-fasciitis\.html" class="nav__dropdown-item">Plantar Fasciitis<\/a>\r?\n)(\s*<a href="gut-health\.html" class="nav__dropdown-item">Gut Health<\/a>)/;
const files = fs.readdirSync('.').filter((f) => f.endsWith('.html'));
let changed = 0, skipped = 0;
for (const f of files) {
  const before = fs.readFileSync(f, 'utf8');
  if (before.includes('orthotics.html')) { skipped++; continue; }
  if (!re.test(before)) { skipped++; console.log(`  no match: ${f}`); continue; }
  const after = before.replace(re, (m, p1, p2) => {
    // Detect line ending used in p1
    const eol = p1.endsWith('\r\n') ? '\r\n' : '\n';
    return `${p1}          <a href="orthotics.html" class="nav__dropdown-item">Orthotics</a>${eol}${p2}`;
  });
  fs.writeFileSync(f, after);
  changed++;
}
console.log(`\nUpdated ${changed} files, skipped ${skipped}.`);
