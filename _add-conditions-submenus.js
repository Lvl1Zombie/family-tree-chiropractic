const fs = require('fs');

// === New Conditions dropdown markup ===
const oldConditionsRe = /(\s*<a href="neuropathy\.html" class="nav__dropdown-item">Neuropathy<\/a>\r?\n)\s*<a href="spine-related\.html" class="nav__dropdown-item">Spine Related<\/a>\r?\n\s*<a href="injuries\.html" class="nav__dropdown-item">Injuries<\/a>\r?\n\s*<a href="extremities\.html" class="nav__dropdown-item">Extremities<\/a>\r?\n\s*<a href="other-conditions\.html" class="nav__dropdown-item">Other Conditions<\/a>/;

function newConditionsBlock(eol) {
  return [
    `          <div class="nav__dropdown-submenu">`,
    `            <a href="spine-related.html" class="nav__dropdown-item nav__dropdown-item--has-submenu">Spine Related</a>`,
    `            <div class="nav__dropdown-submenu-menu">`,
    `              <a href="back-pain.html" class="nav__dropdown-item">Back Pain</a>`,
    `              <a href="headaches-and-migraines.html" class="nav__dropdown-item">Headaches and Migraines</a>`,
    `              <a href="low-back-pain.html" class="nav__dropdown-item">Low Back Pain</a>`,
    `              <a href="neck-pain.html" class="nav__dropdown-item">Neck Pain</a>`,
    `              <a href="sciatica.html" class="nav__dropdown-item">Sciatica</a>`,
    `              <a href="scoliosis.html" class="nav__dropdown-item">Scoliosis</a>`,
    `            </div>`,
    `          </div>`,
    `          <div class="nav__dropdown-submenu">`,
    `            <a href="injuries.html" class="nav__dropdown-item nav__dropdown-item--has-submenu">Injuries</a>`,
    `            <div class="nav__dropdown-submenu-menu">`,
    `              <a href="disc-injury.html" class="nav__dropdown-item">Disc Injury</a>`,
    `              <a href="whiplash.html" class="nav__dropdown-item">Whiplash</a>`,
    `              <a href="sports-injury.html" class="nav__dropdown-item">Sports Injury</a>`,
    `              <a href="work-injury.html" class="nav__dropdown-item">Work Injury</a>`,
    `            </div>`,
    `          </div>`,
    `          <a href="extremities.html" class="nav__dropdown-item">Extremities</a>`,
    `          <div class="nav__dropdown-submenu">`,
    `            <a href="other-conditions.html" class="nav__dropdown-item nav__dropdown-item--has-submenu">Other Conditions</a>`,
    `            <div class="nav__dropdown-submenu-menu">`,
    `              <a href="pregnancy.html" class="nav__dropdown-item">Pregnancy</a>`,
    `              <a href="vertigo.html" class="nav__dropdown-item">Vertigo</a>`,
    `            </div>`,
    `          </div>`,
  ].join(eol);
}

const files = fs.readdirSync('.').filter((f) => f.endsWith('.html'));
let changed = 0, skipped = 0;
for (const f of files) {
  const before = fs.readFileSync(f, 'utf8');
  if (before.includes('back-pain.html')) { skipped++; continue; }
  if (!oldConditionsRe.test(before)) { skipped++; console.log(`  no match: ${f}`); continue; }
  const after = before.replace(oldConditionsRe, (m, neuroLine) => {
    const eol = neuroLine.endsWith('\r\n') ? '\r\n' : '\n';
    return `${neuroLine}${newConditionsBlock(eol)}`;
  });
  fs.writeFileSync(f, after);
  changed++;
}
console.log(`\nNav updated: ${changed} files, skipped ${skipped}.`);

// === Generate 12 stub pages ===
const stubs = [
  { slug: 'back-pain',                title: 'Back Pain',                label: 'Spine-Related Condition', tagline: 'When your back has had enough of the workaround.' },
  { slug: 'headaches-and-migraines',  title: 'Headaches and Migraines',  label: 'Spine-Related Condition', tagline: 'When the headache lives in your neck — but shows up in your head.' },
  { slug: 'low-back-pain',            title: 'Low Back Pain',            label: 'Spine-Related Condition', tagline: 'The pain that makes you brace before standing up.' },
  { slug: 'neck-pain',                title: 'Neck Pain',                label: 'Spine-Related Condition', tagline: "When you turn your whole torso just to back out of the driveway." },
  { slug: 'sciatica',                 title: 'Sciatica',                 label: 'Spine-Related Condition', tagline: 'Sharp, shooting, traveling pain — and the nerve underneath all of it.' },
  { slug: 'scoliosis',                title: 'Scoliosis',                label: 'Spine-Related Condition', tagline: 'Curve management that protects everything above and below it.' },
  { slug: 'disc-injury',              title: 'Disc Injury',              label: 'Injury Care',             tagline: 'Herniated, bulging, or just plain stuck — disc pain has a path out.' },
  { slug: 'whiplash',                 title: 'Whiplash',                 label: 'Injury Care',             tagline: 'The injury that hides for days — and stays for years if untreated.' },
  { slug: 'sports-injury',            title: 'Sports Injury',            label: 'Injury Care',             tagline: 'Back in the game — without lying about how you really feel.' },
  { slug: 'work-injury',              title: 'Work Injury',              label: 'Injury Care',             tagline: 'The injury that started at work and follows you home every night.' },
  { slug: 'pregnancy',                title: 'Pregnancy',                label: 'Other Condition',         tagline: 'Gentle chiropractic care through every trimester.' },
  { slug: 'vertigo',                  title: 'Vertigo',                  label: 'Other Condition',         tagline: 'When the room won\'t hold still — and balance becomes a daily negotiation.' },
];

const NAV = `
  <nav class="nav">
    <a href="index.html" class="nav__logo">
      <img src="logo.png" alt="Family Tree Chiropractic logo" style="width: 44px; height: 44px; object-fit: contain; border-radius: 50%;">
      <div class="nav__logo-text"><span class="nav__logo-name">Family Tree</span><span class="nav__logo-sub">Chiropractic</span><span class="nav__logo-tag">Lancaster Neuropathy</span></div>
    </a>
    <div class="nav__links">
      <a href="index.html" class="nav__link">Home</a>
      <div class="nav__dropdown"><span class="nav__link nav__dropdown-toggle">About</span>
        <div class="nav__dropdown-menu">
          <a href="meet-the-doctors.html" class="nav__dropdown-item">Meet the Doctors</a>
          <a href="about-clinic.html" class="nav__dropdown-item">About Our Clinic</a>
          <a href="payment-options.html" class="nav__dropdown-item">Payment Options</a>
          <a href="testimonials.html" class="nav__dropdown-item">Testimonials</a>
          <a href="blog.html" class="nav__dropdown-item">Blog</a>
        </div>
      </div>
      <div class="nav__dropdown"><span class="nav__link nav__dropdown-toggle">Services</span>
        <div class="nav__dropdown-menu">
          <div class="nav__dropdown-submenu">
            <a href="chiropractic-care.html" class="nav__dropdown-item nav__dropdown-item--has-submenu">Chiropractic Care</a>
            <div class="nav__dropdown-submenu-menu">
              <a href="chiropractic-for-kids.html" class="nav__dropdown-item">Chiropractic for Kids</a>
            </div>
          </div>
          <a href="dot-exams.html" class="nav__dropdown-item">DOT Exams</a>
          <a href="cold-laser-therapy.html" class="nav__dropdown-item">Cold Laser Therapy</a>
          <a href="decompression.html" class="nav__dropdown-item">Spinal Decompression</a>
          <a href="pulsewave.html" class="nav__dropdown-item">PulseWave Therapy</a>
          <a href="plantar-fasciitis.html" class="nav__dropdown-item">Plantar Fasciitis</a>
          <a href="orthotics.html" class="nav__dropdown-item">Orthotics</a>
          <a href="gut-health.html" class="nav__dropdown-item">Gut Health</a>
          <a href="accident-injury.html" class="nav__dropdown-item">Accident Injury</a>
        </div>
      </div>
      <div class="nav__dropdown"><span class="nav__link nav__dropdown-toggle">Conditions</span>
        <div class="nav__dropdown-menu">
          <a href="neuropathy.html" class="nav__dropdown-item">Neuropathy</a>
          <div class="nav__dropdown-submenu">
            <a href="spine-related.html" class="nav__dropdown-item nav__dropdown-item--has-submenu">Spine Related</a>
            <div class="nav__dropdown-submenu-menu">
              <a href="back-pain.html" class="nav__dropdown-item">Back Pain</a>
              <a href="headaches-and-migraines.html" class="nav__dropdown-item">Headaches and Migraines</a>
              <a href="low-back-pain.html" class="nav__dropdown-item">Low Back Pain</a>
              <a href="neck-pain.html" class="nav__dropdown-item">Neck Pain</a>
              <a href="sciatica.html" class="nav__dropdown-item">Sciatica</a>
              <a href="scoliosis.html" class="nav__dropdown-item">Scoliosis</a>
            </div>
          </div>
          <div class="nav__dropdown-submenu">
            <a href="injuries.html" class="nav__dropdown-item nav__dropdown-item--has-submenu">Injuries</a>
            <div class="nav__dropdown-submenu-menu">
              <a href="disc-injury.html" class="nav__dropdown-item">Disc Injury</a>
              <a href="whiplash.html" class="nav__dropdown-item">Whiplash</a>
              <a href="sports-injury.html" class="nav__dropdown-item">Sports Injury</a>
              <a href="work-injury.html" class="nav__dropdown-item">Work Injury</a>
            </div>
          </div>
          <a href="extremities.html" class="nav__dropdown-item">Extremities</a>
          <div class="nav__dropdown-submenu">
            <a href="other-conditions.html" class="nav__dropdown-item nav__dropdown-item--has-submenu">Other Conditions</a>
            <div class="nav__dropdown-submenu-menu">
              <a href="pregnancy.html" class="nav__dropdown-item">Pregnancy</a>
              <a href="vertigo.html" class="nav__dropdown-item">Vertigo</a>
            </div>
          </div>
        </div>
      </div>
      <a href="reviews.html" class="nav__link">Review Us</a>
      <a href="contact.html" class="nav__link">Contact</a>
      <a href="tel:7177382555" class="btn btn--primary btn--nav">Book Now</a>
    </div>
    <button class="nav__toggle" aria-label="Toggle navigation"><span></span><span></span><span></span></button>
  </nav>`;

const FOOTER = `
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <a href="index.html" class="nav__logo" style="margin-bottom: 8px;">
            <img src="logo.png" alt="Family Tree Chiropractic logo" style="width: 44px; height: 44px; object-fit: contain; border-radius: 50%;">
            <div class="nav__logo-text"><span class="nav__logo-name">Family Tree</span><span class="nav__logo-sub">Chiropractic</span><span class="nav__logo-tag">Lancaster Neuropathy</span></div>
          </a>
          <p>We help people with chronic pain find the root cause and heal at the source — drug-free, non-surgical, and built for the life beyond the symptom.</p>
        </div>
        <div><div class="footer__heading">Services</div><a href="neuropathy.html" class="footer__link">Neuropathy</a><a href="chiropractic-care.html" class="footer__link">Chiropractic Care</a><a href="cold-laser-therapy.html" class="footer__link">Cold Laser Therapy</a><a href="decompression.html" class="footer__link">Decompression</a><a href="pulsewave.html" class="footer__link">PulseWave Therapy</a></div>
        <div><div class="footer__heading">More</div><a href="dot-exams.html" class="footer__link">DOT Exams</a><a href="accident-injury.html" class="footer__link">Accident Injury</a><a href="plantar-fasciitis.html" class="footer__link">Plantar Fasciitis</a><a href="gut-health.html" class="footer__link">Gut Health</a></div>
        <div><div class="footer__heading">Contact</div><a href="tel:7177382555" class="footer__link">Call: 717-738-2555</a><span class="footer__link">904 Dawn Ave.<br>Ephrata, PA 17522</span><span class="footer__link">Mon&ndash;Fri: 8am&ndash;6pm<br>Sat: 9am&ndash;1pm</span></div>
      </div>
      <div class="footer__bottom"><span>&copy; 2026 Family Tree Chiropractic. All rights reserved.</span><span>Designed with care.</span></div>
    </div>
  </footer>`;

const CALL_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;

function buildStub({ slug, title, label, tagline }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Family Tree Chiropractic</title>
  <meta name="description" content="${tagline} Drug-free, non-surgical care for ${title.toLowerCase()} at Family Tree Chiropractic in Ephrata, PA. Call 717-738-2555.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
${NAV}

  <section class="section section--dark" style="padding-top: clamp(140px, 18vh, 200px); padding-bottom: clamp(70px, 11vh, 110px);">
    <div class="container">
      <div class="section__header section__header--center fade-in" style="margin-bottom: 0;">
        <div class="label">${label}</div>
        <h1 style="color: var(--color-cream); margin-bottom: 24px;">${title}</h1>
        <p class="subtitle" style="margin: 0 auto 36px; color: rgba(245, 244, 238, 0.78);">${tagline}</p>
        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <a href="tel:7177382555" class="btn btn--call">
            ${CALL_SVG}
            Call 717-738-2555
          </a>
          <a href="contact.html" class="btn btn--white">Ask a Question</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--white">
    <div class="container">
      <div class="section__header fade-in">
        <div class="label">About ${title}</div>
        <h2>The condition. What we look for.<br>What we can do.</h2>
      </div>
      <div class="fade-in" style="max-width: 800px; margin: 0 auto;">
        <p><em>Placeholder copy — flesh out with: the typical patient story, what causes the condition, how Family Tree approaches it (which treatments apply), what a first visit looks like, and what realistic outcomes are.</em></p>
        <p>This is where you'd describe ${title.toLowerCase()} in plain English, why it often gets misdiagnosed or under-treated, and how chiropractic care addresses the underlying cause rather than the surface symptom.</p>
        <p>Add a check-list section below for symptoms, and a split section for "How we treat it" with the relevant treatment links (Chiropractic Care, Cold Laser, Decompression, etc.) when you're ready to flesh this out.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="cta-block fade-in">
        <h2>Ready to do something<br>about it?</h2>
        <p class="subtitle">Pick up the phone. Tell us what's going on. We'll be straight with you about whether we can help — and if yes, the next step is a $37 starting consultation.</p>
        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <a href="tel:7177382555" class="btn btn--call">
            ${CALL_SVG}
            Call 717-738-2555
          </a>
          <a href="contact.html" class="btn btn--white">Send a Message</a>
        </div>
      </div>
    </div>
  </section>
${FOOTER}

  <script src="main.js"></script>
</body>
</html>
`;
}

let stubsWritten = 0;
for (const stub of stubs) {
  fs.writeFileSync(`./${stub.slug}.html`, buildStub(stub));
  stubsWritten++;
  console.log(`  ✓ ${stub.slug}.html`);
}
console.log(`\nStub pages created: ${stubsWritten}.`);
