// Wrap the Chiropractic Care dropdown item in a submenu with "Chiropractic for Kids".
const fs = require('fs');
const path = require('path');

const oldLine = '          <a href="chiropractic-care.html" class="nav__dropdown-item">Chiropractic Care</a>';
const newBlock = `          <div class="nav__dropdown-submenu">
            <a href="chiropractic-care.html" class="nav__dropdown-item nav__dropdown-item--has-submenu">Chiropractic Care</a>
            <div class="nav__dropdown-submenu-menu">
              <a href="chiropractic-for-kids.html" class="nav__dropdown-item">Chiropractic for Kids</a>
            </div>
          </div>`;

const files = fs.readdirSync('.').filter((f) => f.endsWith('.html'));
let changed = 0, unchanged = 0;
for (const f of files) {
  const before = fs.readFileSync(f, 'utf8');
  if (!before.includes(oldLine)) {
    unchanged++;
    continue;
  }
  if (before.includes('chiropractic-for-kids.html')) {
    unchanged++;
    continue;
  }
  const after = before.replace(oldLine, newBlock);
  fs.writeFileSync(f, after);
  changed++;
  console.log(`  ✓ ${f}`);
}
console.log(`\nUpdated ${changed} files, skipped ${unchanged}.`);
