const fs = require('fs');

// === Update Extremities nav item to a submenu ===
const oldRe = /(\s*)<a href="extremities\.html" class="nav__dropdown-item">Extremities<\/a>/;

function newBlock(indent, eol) {
  return [
    `${indent}<div class="nav__dropdown-submenu">`,
    `${indent}  <a href="extremities.html" class="nav__dropdown-item nav__dropdown-item--has-submenu">Extremities</a>`,
    `${indent}  <div class="nav__dropdown-submenu-menu">`,
    `${indent}    <a href="arm-and-leg-pain.html" class="nav__dropdown-item">Arm and Leg Pain</a>`,
    `${indent}    <a href="carpal-tunnel.html" class="nav__dropdown-item">Carpal Tunnel</a>`,
    `${indent}    <a href="knee-pain.html" class="nav__dropdown-item">Knee Pain</a>`,
    `${indent}    <a href="shoulder-pain.html" class="nav__dropdown-item">Shoulder Pain</a>`,
    `${indent}    <a href="plantar-fasciitis.html" class="nav__dropdown-item">Plantar Fasciitis</a>`,
    `${indent}  </div>`,
    `${indent}</div>`,
  ].join(eol);
}

const files = fs.readdirSync('.').filter((f) => f.endsWith('.html'));
let changed = 0, skipped = 0;
for (const f of files) {
  const before = fs.readFileSync(f, 'utf8');
  if (before.includes('arm-and-leg-pain.html')) { skipped++; continue; }
  if (!oldRe.test(before)) { skipped++; console.log(`  no match: ${f}`); continue; }
  // Detect line ending
  const eol = /\r\n/.test(before) ? '\r\n' : '\n';
  const after = before.replace(oldRe, (m, indent) => {
    // indent captured includes the leading whitespace/newline from before the <a>
    // Use the indent content after the last newline as the per-line indent
    const lastEolIdx = Math.max(indent.lastIndexOf('\n'), indent.lastIndexOf('\r'));
    const lineIndent = indent.slice(lastEolIdx + 1);
    return `${indent}${newBlock('', eol).split('\n').join(eol).split(eol).map((line, i) => i === 0 ? line : lineIndent + line).join(eol)}`;
  });
  fs.writeFileSync(f, after);
  changed++;
}
console.log(`\nNav updated: ${changed} files, skipped ${skipped}.`);

// === Generate 4 stub pages (plantar-fasciitis already exists) ===
const stubs = [
  { slug: 'arm-and-leg-pain', title: 'Arm and Leg Pain',  label: 'Extremity Condition', tagline: "When the pain is in your arm or leg — but the cause is somewhere else entirely." },
  { slug: 'carpal-tunnel',     title: 'Carpal Tunnel',    label: 'Extremity Condition', tagline: "The numbness, tingling, and weakness in your hand that won't shake out." },
  { slug: 'knee-pain',         title: 'Knee Pain',        label: 'Extremity Condition', tagline: "When the knee hurts — and the real cause is up the chain at the hip or down at the foot." },
  { slug: 'shoulder-pain',     title: 'Shoulder Pain',    label: 'Extremity Condition', tagline: "Rotator cuff. Frozen shoulder. The desk-job ache that won't leave. How chiropractic addresses each one." },
];

const NAV = `
  <nav class="nav">
    <a href="/" class="nav__logo">
      <img src="logo.png" alt="Family Tree Chiropractic logo" style="width: 44px; height: 44px; object-fit: contain; border-radius: 50%;">
      <div class="nav__logo-text"><span class="nav__logo-name">Family Tree</span><span class="nav__logo-sub">Chiropractic</span><span class="nav__logo-tag">Lancaster Neuropathy</span></div>
    </a>
    <div class="nav__links">
      <a href="/" class="nav__link">Home</a>
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
          <div class="nav__dropdown-submenu">
            <a href="extremities.html" class="nav__dropdown-item nav__dropdown-item--has-submenu">Extremities</a>
            <div class="nav__dropdown-submenu-menu">
              <a href="arm-and-leg-pain.html" class="nav__dropdown-item">Arm and Leg Pain</a>
              <a href="carpal-tunnel.html" class="nav__dropdown-item">Carpal Tunnel</a>
              <a href="knee-pain.html" class="nav__dropdown-item">Knee Pain</a>
              <a href="shoulder-pain.html" class="nav__dropdown-item">Shoulder Pain</a>
              <a href="plantar-fasciitis.html" class="nav__dropdown-item">Plantar Fasciitis</a>
            </div>
          </div>
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
          <a href="/" class="nav__logo" style="margin-bottom: 8px;">
            <img src="logo.png" alt="Family Tree Chiropractic logo" style="width: 44px; height: 44px; object-fit: contain; border-radius: 50%;">
            <div class="nav__logo-text"><span class="nav__logo-name">Family Tree</span><span class="nav__logo-sub">Chiropractic</span><span class="nav__logo-tag">Lancaster Neuropathy</span></div>
          </a>
          <p>We help people with chronic pain find the root cause and heal at the source — drug-free, non-surgical, and built for the life beyond the symptom.</p>
        </div>
        <div><div class="footer__heading">Services</div><a href="neuropathy.html" class="footer__link">Neuropathy</a><a href="chiropractic-care.html" class="footer__link">Chiropractic Care</a><a href="cold-laser-therapy.html" class="footer__link">Cold Laser Therapy</a><a href="decompression.html" class="footer__link">Decompression</a><a href="pulsewave.html" class="footer__link">PulseWave Therapy</a></div>
        <div><div class="footer__heading">More</div><a href="dot-exams.html" class="footer__link">DOT Exams</a><a href="accident-injury.html" class="footer__link">Accident Injury</a><a href="plantar-fasciitis.html" class="footer__link">Plantar Fasciitis</a><a href="gut-health.html" class="footer__link">Gut Health</a><a href="hipaa-notice.html" class="footer__link">HIPAA Notice</a><a href="nondiscrimination-notice.html" class="footer__link">Nondiscrimination Notice</a></div>
        <div><div class="footer__heading">Contact</div><a href="tel:7177382555" class="footer__link">Call: 717-738-2555</a><span class="footer__link">904 Dawn Ave<br>Ephrata, PA 17522</span><span class="footer__link">Mon&ndash;Thu: 9:00am&ndash;12:00pm<br>3:00pm&ndash;7:00pm<br>Fri: CDL Exams Only 9:00am&ndash;2:00pm<br>Sat: CDL Exams Only 9:00am&ndash;2:00pm<br>Sun: Closed</span></div>
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
  <link rel="stylesheet" href="styles.css?v=seo-ephrata-v1">
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
        <p><em>Placeholder copy — flesh out with: the typical patient story, what causes the condition, how Family Tree approaches it, what a first visit looks like, and what realistic outcomes are.</em></p>
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

  <script src="main.js?v=seo-ephrata-v1"></script>
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
