// Regenerates the 16 condition stub pages with brand-voice body content.
const fs = require('fs');

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
          <a href="index.html" class="nav__logo" style="margin-bottom: 8px;">
            <img src="logo.png" alt="Family Tree Chiropractic logo" style="width: 44px; height: 44px; object-fit: contain; border-radius: 50%;">
            <div class="nav__logo-text"><span class="nav__logo-name">Family Tree</span><span class="nav__logo-sub">Chiropractic</span><span class="nav__logo-tag">Lancaster Neuropathy</span></div>
          </a>
          <p>We help people with chronic pain find the root cause and heal at the source — drug-free, non-surgical, and built for the life beyond the symptom.</p>
        </div>
        <div><div class="footer__heading">Services</div><a href="neuropathy.html" class="footer__link">Neuropathy</a><a href="chiropractic-care.html" class="footer__link">Chiropractic Care</a><a href="cold-laser-therapy.html" class="footer__link">Cold Laser Therapy</a><a href="decompression.html" class="footer__link">Decompression</a><a href="pulsewave.html" class="footer__link">PulseWave Therapy</a></div>
        <div><div class="footer__heading">More</div><a href="dot-exams.html" class="footer__link">DOT Exams</a><a href="accident-injury.html" class="footer__link">Accident Injury</a><a href="plantar-fasciitis.html" class="footer__link">Plantar Fasciitis</a><a href="gut-health.html" class="footer__link">Gut Health</a><a href="hipaa-notice.html" class="footer__link">HIPAA Notice</a><a href="nondiscrimination-notice.html" class="footer__link">Nondiscrimination Notice</a></div>
        <div><div class="footer__heading">Contact</div><a href="tel:7177382555" class="footer__link">Call: 717-738-2555</a><span class="footer__link">904 Dawn Ave.<br>Ephrata, PA 17522</span><span class="footer__link">Mon&ndash;Thu: 9:00am&ndash;12:00pm<br>3:00pm&ndash;7:00pm<br>Fri: CDL Exams Only 9:00am&ndash;2:00pm<br>Sat: CDL Exams Only 9:00am&ndash;2:00pm<br>Sun: Closed</span></div>
      </div>
      <div class="footer__bottom"><span>&copy; 2026 Family Tree Chiropractic. All rights reserved.</span><span>Designed with care.</span></div>
    </div>
  </footer>`;

const CALL_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;

function buildPage({ slug, title, label, tagline, sections }) {
  const sectionHtml = sections.map((s, i) => `
  <section class="section ${i % 2 === 0 ? 'section--white' : ''}">
    <div class="container">
      <div class="section__header fade-in">
        <div class="label">${s.label}</div>
        <h2>${s.heading}</h2>
      </div>
      <div class="fade-in" style="max-width: 800px; margin: 0 auto;">
${s.body}
      </div>
    </div>
  </section>`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} in Lancaster | Family Tree Chiropractic</title>
  <meta name="description" content="${tagline}">
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
${sectionHtml}

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

const pages = [
  {
    slug: 'back-pain',
    title: 'Back Pain',
    label: 'Spine-Related Condition',
    tagline: "Back pain can run your day — missed work, missed life, missed sleep. We find the source and treat it without drugs or surgery.",
    sections: [
      { label: 'What\'s Actually Going On', heading: 'Why your back hurts.',
        body: `        <p>Back pain shows up for a hundred reasons — poor posture, a muscle strain that won't release, an old injury that never fully healed, a herniated disc, arthritis, spinal stenosis. Lifestyle factors compound it: a job that keeps you seated, extra weight on the frame, the slow erosion of years of compensations.</p>
        <p>Most people manage it with hot packs, ibuprofen, and gritting their way through. That works until it doesn't. When the pain becomes constant, sharp, or starts traveling — into the hip, down the leg, into a tingling foot — the underlying cause is asking for real attention.</p>`
      },
      { label: 'What We Look For', heading: 'Real diagnosis, then real treatment.',
        body: `        <p>Pain is the signal, not the problem. Chiropractic care starts by finding where your spine has stopped moving cleanly — where joints have lost mobility, where alignment has drifted, where a nerve is being squeezed by something that shouldn't be touching it. We adjust those segments, restore the motion, and let your nervous system stop shouting.</p>
        <p>Most patients pair adjustments with a few specific stretches, ergonomic fixes for the desk or the driver's seat, and sometimes cold laser or decompression depending on what we see. The plan is built for your case, not a template.</p>
        <p>In the meantime: ice for the sharp days, heat for the stiff ones, and short walks instead of long sitting. None of that is a cure — but it keeps you in the game while we get to the root.</p>`
      },
    ],
  },
  {
    slug: 'headaches-and-migraines',
    title: 'Headaches and Migraines',
    label: 'Spine-Related Condition',
    tagline: "When the headache lives in your neck — but shows up in your head. Drug-free care that goes after the source.",
    sections: [
      { label: 'Why It Keeps Coming Back', heading: 'It\'s rarely just "a headache."',
        body: `        <p>If you've ever had a real migraine, you don't have to be told it counts. The aura. The light sensitivity. The nausea that empties your day. Even garden-variety tension headaches — the dull band across the temples by 3 p.m. — start to run your week if they show up often enough.</p>
        <p>Standard care reaches for a pill. That works for the moment. The problem is that most recurring headaches have a structural source: tight muscles at the base of the skull, vertebrae in the neck that aren't moving cleanly, nerves getting irritated by the soft tissue around them. Painkillers don't fix any of that — they just lower the volume.</p>`
      },
      { label: 'How We Approach It', heading: 'Find the source. Quiet it for good.',
        body: `        <p>Chiropractic care has been used to treat headaches for over a century. When the upper cervical spine is adjusted into proper position, the muscles release, the nerves stop firing alarm signals, and the headaches that "always come back" stop coming back.</p>
        <p>The first visit looks at posture, range of motion, and the specific vertebrae that aren't moving the way they should. From there we build a plan — usually a short series of adjustments, often paired with simple posture or workstation changes that address what's reinforcing the pattern in the first place.</p>
        <p>If your headaches are anything else — a sudden severe pain, confusion, falling, slurred speech — go to the hospital. Those are organic headaches and they need different care. For everything else, there's a better answer than the medicine cabinet.</p>`
      },
    ],
  },
  {
    slug: 'low-back-pain',
    title: 'Low Back Pain',
    label: 'Spine-Related Condition',
    tagline: "The most common reason adults visit a doctor. Also the most common condition chiropractors actually fix at the root.",
    sections: [
      { label: 'A Common Problem with an Uncommon Solution', heading: 'You are not alone — and you do have options.',
        body: `        <p>Roughly 80% of adults will deal with low back pain at some point in their lives. Significant chunks of the population are dealing with it right now. It costs the healthcare system billions and costs people their workdays, their hobbies, and their patience with their own body.</p>
        <p>The most common causes are predictable: herniated discs, recent strains, osteoarthritis, spondylolisthesis, spinal stenosis, the occasional fracture. Of those, the herniated disc tops the list. The good news: most cases respond well to non-invasive, non-surgical care — and respond fastest when treatment starts early instead of after years of working around it.</p>`
      },
      { label: 'Why Chiropractic Works on Low Back Pain', heading: 'Adjust the source, not the symptom.',
        body: `        <p>In most low-back cases, the problem starts when joints in the pelvis or lumbar spine drift out of clean alignment. Even small misalignments can press on the nerves that exit the spine, which inflames the surrounding tissue and sets off the cascade of pain you feel. Painkillers quiet the signal. They don't move the bone.</p>
        <p>Chiropractic adjustments do. By restoring the joint to its proper position, we take pressure off the irritated nerves, reduce the inflammation, and let your body recover the way it was built to. For most patients, that means real relief — without surgery, without long-term medication, without the side effects either of those carries.</p>`
      },
    ],
  },
  {
    slug: 'neck-pain',
    title: 'Neck Pain',
    label: 'Spine-Related Condition',
    tagline: "When you turn your whole torso just to back out of the driveway — and the painkillers stopped touching it months ago.",
    sections: [
      { label: 'What\'s Actually Hurting', heading: 'There are a handful of usual suspects.',
        body: `        <p>Neck pain comes from a short list of sources: a sudden injury (whiplash from a fender-bender or a hard fall), overuse and strain from repetitive movements or long hours at a desk, or age-related changes like arthritis in the cervical joints. Sometimes it's all three layered on top of each other.</p>
        <p>Whatever the cause, the discomfort makes the basics harder — reading, watching, working, sleeping on the side you used to sleep on. By the time most people come in, they've already tried the obvious things and they're tired of waiting it out.</p>`
      },
      { label: 'How Chiropractic Helps', heading: 'Restore motion. Relieve the pressure.',
        body: `        <p>Most neck pain involves misalignments in the cervical vertebrae and tension in the muscles that support them. Chiropractic adjustments restore proper motion and position to those joints. Once they're back where they should be, the muscles release, the nerves stop firing alarm signals, and the pain begins to back off.</p>
        <p>The first visit looks at your range of motion, the specific segments that aren't moving correctly, and any contributing factors at the desk, in the car, or in how you sleep. From there we build a plan and show you the exact stretches and posture corrections that keep the relief from undoing itself.</p>
        <p>If surgery and pain medication aren't where you want to land, you have a real alternative.</p>`
      },
    ],
  },
  {
    slug: 'sciatica',
    title: 'Sciatica',
    label: 'Spine-Related Condition',
    tagline: "Sharp, shooting, traveling pain — and the long nerve underneath all of it. Real relief without back surgery.",
    sections: [
      { label: 'What Sciatica Actually Is', heading: 'It isn\'t just "bad low back pain."',
        body: `        <p>The sciatic nerve runs from your lower spine, through your buttock, down the back of your leg. It's the longest and widest nerve in the body. When something compresses or irritates it, the result isn't subtle: sharp pain that travels, burning, tingling, numbness in the leg or foot — often on just one side. Sometimes it shows up after one specific moment (you bent down to grab a pen). Often it builds over years and the pen was just the last straw.</p>
        <p>Patients describe sciatica in extremes. Mild ache one week. Unbearable, lights-out pain the next. It comes and goes — and if it isn't addressed at the source, it tends to come back stronger.</p>`
      },
      { label: 'How We Treat It', heading: 'Find the disc. Free the nerve.',
        body: `        <p>Sciatic pain almost always traces back to the lumbar spine or the pelvis. Compressed discs, joint misalignments, and inflammation along the nerve root are the usual culprits. Pinning down the exact source is its own job — and it's the first thing we do.</p>
        <p>From there, treatment focuses on taking pressure off the nerve and giving the disc room to recover. That means specific spinal adjustments, often combined with non-surgical spinal decompression for cases where the disc is bulging into the nerve. Most patients see significant improvement well before they would have needed surgery — and back surgery for sciatica has a discouraging long-term success rate.</p>
        <p>Recovery time varies. The longer it's been there, the longer it usually takes to unwind. Good news: it almost always takes less time to fix than it took to create.</p>`
      },
    ],
  },
  {
    slug: 'scoliosis',
    title: 'Scoliosis',
    label: 'Spine-Related Condition',
    tagline: "Curve management that catches the problem early — and keeps it from becoming the bigger one.",
    sections: [
      { label: 'What We\'re Looking For', heading: 'A curve, the compensations around it, and the trajectory.',
        body: `        <p>Scoliosis typically starts as a small lateral curve and progresses if it isn't caught early. A formal diagnosis requires at least a 10-degree sideways curve of the spine — but most parents and patients notice the early signs first: shoulders that don't sit level, a hip that rides higher, a stance that leans.</p>
        <p>The causes aren't always clear. Adolescent girls are statistically more likely to develop it, and many cases start with a single vertebra drifting out of position. Over time the body compensates, the curve deepens, and "S" or "C" shapes can form. In older adults, degenerative changes — osteoporosis, disc wear — can introduce scoliosis later in life, sometimes serious enough to affect heart and lung function if it's left unchecked.</p>`
      },
      { label: 'How Chiropractic Helps', heading: 'Catch it early. Slow it down. Sometimes reverse it.',
        body: `        <p>Research has shown chiropractic care can stop the progression of scoliosis and, in many cases, partially reverse the curve when caught early. Our first visit covers full health history, posture and gait analysis, hip and shoulder leveling, leg-length comparison, and a range-of-motion exam. X-rays confirm the curve and give us a baseline to measure progress against.</p>
        <p>Treatment is built around specific adjustments designed to address the underlying misalignments and unwind the body's compensations. The plan is conservative first — non-invasive care before invasive options. Surgery and bracing have their place, but they're rarely the right starting point.</p>
        <p>If you're a parent who noticed something off, or an adult whose old curve is starting to flare, the smartest move is the early one.</p>`
      },
    ],
  },
  {
    slug: 'disc-injury',
    title: 'Disc Injury',
    label: 'Injury Care',
    tagline: "Bulging, herniated, or extruded — disc injuries vary, but most can be treated without surgery if you act early.",
    sections: [
      { label: 'What a Disc Injury Actually Means', heading: 'The cushion between your vertebrae has limits.',
        body: `        <p>The intervertebral discs sit between each pair of vertebrae. Each one is a tough outer ring around a soft gel-like center, and they exist to keep your bones from grinding against each other while letting your spine move. Lose a disc, and you lose your ability to bend, twist, or move your upper body in any useful way.</p>
        <p>Disc injuries fall on a spectrum. A <strong>protruding disc</strong> means the gel inside has shifted off-center and is pressing the outer ring outward — often into a nearby nerve root. A <strong>herniated disc</strong> means the outer ring has torn and the gel has pushed through, irritating the nerves and causing serious pain or numbness. A <strong>disc extrusion</strong> is worse: the gel breaks loose or balloons well past the disc itself, often producing intense back pain and big drops in range of motion.</p>`
      },
      { label: 'How We Treat It', heading: 'Take the pressure off. Let the disc heal.',
        body: `        <p>Every disc injury is different. The first thing we do is figure out which type you actually have and how severe it is — through a careful exam and, when needed, imaging. From there, the treatment plan is built around taking pressure off the affected disc, calming the inflamed tissue around it, and giving the disc room to recover its proper shape.</p>
        <p>For most patients that means specific chiropractic adjustments and, often, non-surgical spinal decompression therapy. Cold laser and rehab exercises round it out. The whole point is to address the cause — not just manage the pain — and avoid surgery wherever possible.</p>`
      },
    ],
  },
  {
    slug: 'whiplash',
    title: 'Whiplash',
    label: 'Injury Care',
    tagline: "The injury that hides for days — and stays for years if it isn\'t treated. Catch it early.",
    sections: [
      { label: 'Why It Matters Even at Low Speed', heading: 'Most whiplash injuries don\'t feel like injuries — at first.',
        body: `        <p>The majority of car accidents are rear-end collisions, and the majority of those produce some degree of whiplash. The catch: many patients don't realize they're injured for days or weeks after the crash. Adrenaline and inflammation mask the damage early on. By the time the headaches, neck stiffness, or shoulder pain show up, the injury has had time to settle in and the body has had time to compensate around it.</p>
        <p>Headrest position matters more than people realize. A headrest set too low acts as an acceleration point in a rear impact — your head whips backward over it, multiplying the force on your cervical spine. Even a 5 mph hit can produce a serious injury if the geometry is wrong.</p>`
      },
      { label: 'How Chiropractic Treats Whiplash', heading: 'Start early. Document everything. Heal it right.',
        body: `        <p>Whiplash responds well to chiropractic care, and the earlier the treatment starts, the better the outcome. The combination of spinal adjustments, soft tissue work, and rehab exercises addresses both the immediate misalignments and the long-term compensations that lead to chronic pain if they're left alone.</p>
        <p>Common symptoms we treat: headaches, neck pain and stiffness, upper back pain, shoulder pain, tingling or numbness in the arm, dizziness, and reduced range of motion. Pre-treatment with NSAIDs, soft collars, and basic physiotherapy often produces some relief, but the structural problem stays put.</p>
        <p>If you've been in any kind of collision recently — even a minor one — get evaluated. PIP/MedPay insurance covers this care in most cases, and we handle the paperwork directly.</p>`
      },
    ],
  },
  {
    slug: 'sports-injury',
    title: 'Sports Injury',
    label: 'Injury Care',
    tagline: "Back in the game — without lying about how you really feel. Chiropractic care for athletes at every level.",
    sections: [
      { label: 'Get Treated, Not Sidelined', heading: 'A sports injury doesn\'t have to end the season.',
        body: `        <p>A sports injury can take you out of the activity you love — sometimes for weeks, sometimes longer. Most sports injuries involve soft tissue damage, joint misalignment, or compensations that build up over months of training through small irritations. The right care addresses all three and gets you back to play without the things that usually go wrong: lingering weakness, scar tissue that locks up range of motion, and recurrence three months in.</p>`
      },
      { label: 'How Chiropractic Care Helps Athletes', heading: 'Adjustments, soft tissue work, real rehab.',
        body: `        <p>Chiropractic spinal adjustments improve posture, restore joint motion, and help the nervous system communicate more cleanly with the rest of the body. Misaligned vertebrae can press on nerve roots, weakening the limbs they serve and producing the kind of discomfort that quietly compromises performance. Adjustments deliver focused force to shift those segments back into proper position.</p>
        <p>For athletes specifically, we combine adjustments with massage therapy, rehab exercises, and — when needed — cold laser or PulseWave to accelerate soft tissue healing. The plan is built for your sport, your position, and your specific case. Dr. David Parker has spent 30 years working with athletes across every level, from weekend warriors to high-school competitors.</p>`
      },
    ],
  },
  {
    slug: 'work-injury',
    title: 'Work Injury',
    label: 'Injury Care',
    tagline: "Most work injuries don\'t come from one big accident. They come from the small thing you did a thousand times.",
    sections: [
      { label: 'The Real Cause of Most Work Injuries', heading: 'Repetition. Not catastrophe.',
        body: `        <p>People assume work injuries come from one dramatic moment — the heavy box that crashes down, the fall on a slick floor. Most don't. Most come from <strong>repetitive stress</strong>: the same small motion in the same poor posture, performed thousands of times until the body finally complains. Typing wrong for years. Twisting to load the same pallet. Reaching at the wrong angle, again and again.</p>
        <p>That's why low back pain and conditions like carpal tunnel syndrome top the list of work-related injuries our clinic treats. The good news: most of them respond well to chiropractic care, especially when treatment starts early instead of after months of compensating around the problem.</p>`
      },
      { label: 'How We Help', heading: 'Diagnose, treat, document.',
        body: `        <p>Misaligned spinal joints inflame the tissue around them and irritate the nerves that exit between the vertebrae. That irritation is what causes most of the pain and limitation you feel. Chiropractic adjustments correct those misalignments at the source — and when paired with the right rehab exercises and ergonomic changes, the recovery sticks.</p>
        <p>Many work injury patients are sent to physical therapy first. Physical therapy has its place, but it isn't designed to correct misalignments — and patients with subluxations who only get PT often plateau without ever resolving the underlying issue.</p>
        <p>If you're working through a workers' compensation case, we document everything the way the system needs it documented. Pain is not something you have to live with — and waiting it out almost always makes the case harder, not easier.</p>`
      },
    ],
  },
  {
    slug: 'arm-and-leg-pain',
    title: 'Arm and Leg Pain',
    label: 'Extremity Condition',
    tagline: "Sometimes the pain is in your arm or leg — but the cause is somewhere else entirely.",
    sections: [
      { label: 'Why It\'s Often Confusing', heading: 'The pain doesn\'t always live where it started.',
        body: `        <p>Your shoulder and hip joints are the most mobile in your body, and they put in a long shift. That combination of mobility and frequency makes them targets for a long list of injuries and conditions.</p>
        <p>Sometimes the cause is obvious — a fall, a car accident, a weekend of overuse. Other times the pain builds slowly and nobody can pin down the moment it started. Common suspects include arthritis, bursitis, tendinitis, frozen shoulder, and vertebral subluxations. New medications (antibiotics, birth control, anxiety meds) can sometimes contribute.</p>
        <p>And then there's <strong>referred pain</strong> — when the source is one place and the symptom is somewhere else entirely. The classic example: pain down the left arm during a heart attack. A more everyday example: nerve irritation at the spine producing pain that runs all the way down an arm or leg, the way sciatica does.</p>`
      },
      { label: 'How Chiropractic Approaches It', heading: 'Find the source, even when it isn\'t where it hurts.',
        body: `        <p>Because the possible causes are many, an accurate diagnosis is the most important step. We use a detailed history, a physical exam, and — when needed — advanced imaging. Where the pain lives, what makes it better or worse, and what other symptoms come with it (swelling, bruising, skin changes) are all clues.</p>
        <p>In our experience, vertebral misalignments in the neck or low back are responsible for the majority of arm and leg pain we see. The nerves running from the spine reach all the way to the fingertips and toes — and irritation at the spine can produce symptoms anywhere along the path. Spinal adjustments restore the joint to proper position, take pressure off the irritated nerve, and let the pain settle down.</p>`
      },
    ],
  },
  {
    slug: 'carpal-tunnel',
    title: 'Carpal Tunnel',
    label: 'Extremity Condition',
    tagline: "The numbness, tingling, and weakness in your hand that won\'t shake out — and the real reason surgery often fails.",
    sections: [
      { label: 'What Carpal Tunnel Actually Is', heading: 'A pinched nerve — sometimes at the wrist, often at the spine.',
        body: `        <p>Just like nerves can be pinched in your back by misaligned vertebrae, the median nerve at your wrist can be compressed when the small bones of the wrist drift out of position or when surrounding tissue swells. The result is the classic carpal tunnel picture: burning, tingling, weakness, or "swollen" sensations in the thumb, index, middle, and part of the ring finger. Picking up small objects gets harder. Hand strength drops.</p>
        <p>Surgery for carpal tunnel runs $6,000 to $11,000 and only fully resolves symptoms in roughly 60% of cases. One reason: when both hands are affected, the nerve irritation often actually originates in the cervical spine — not the wrist. Operating on the wrist when the source is the neck is exactly why decompression surgeries miss the mark nearly 40% of the time.</p>`
      },
      { label: 'How We Treat It', heading: 'Start with the source. Adjust at the wrist if needed.',
        body: `        <p>We start with a full evaluation to figure out where the nerve irritation actually originates. If the issue is at the cervical spine (which is more common than people think), spinal adjustments often produce substantial relief. If the wrist itself is the problem, we can adjust those bones too and address the surrounding soft tissue.</p>
        <p>Carpal tunnel is roughly three times more common in women than in men, and tends to start in the dominant hand. Repetitive use of vibrating tools and long hours of repetitive hand and wrist motion contribute, as do metabolic conditions affecting the pituitary or thyroid. Knowing the cause shapes the treatment.</p>`
      },
    ],
  },
  {
    slug: 'knee-pain',
    title: 'Knee Pain',
    label: 'Extremity Condition',
    tagline: "Surgery isn\'t the only option. Non-surgical knee decompression and targeted chiropractic care, drug-free.",
    sections: [
      { label: 'What We\'re Looking For', heading: 'Find the source. Then decide what to do.',
        body: `        <p>Our first job with a knee patient is to figure out what's actually wrong. We assess the joint for signs of degeneration, instability, reduced range of motion, and restrictions in the surrounding structures. The knee is often a victim of forces upstream (the hip) or downstream (the foot), so the assessment doesn't stop at the joint itself.</p>`
      },
      { label: 'Knee Decompression and Chiropractic Care', heading: 'A real alternative to going under the knife.',
        body: `        <p>Surgery isn't the only path. Knee decompression therapy is a painless approach that, combined with targeted chiropractic technique, gives most knee patients a natural and effective way to reduce pain and improve function. We pair it with movement work, strength rehab, and — when applicable — cold laser to accelerate soft-tissue recovery.</p>
        <p>If your knee has been holding you back and the next step on the table is surgery, it's worth getting a second opinion from someone whose first answer isn't a scalpel.</p>`
      },
    ],
  },
  {
    slug: 'shoulder-pain',
    title: 'Shoulder Pain',
    label: 'Extremity Condition',
    tagline: "The most mobile joint in your body — and one of the easiest to break. We treat the cause, not the surface.",
    sections: [
      { label: 'Why the Shoulder Hurts', heading: 'A lot of possible causes for one mobile joint.',
        body: `        <p>The shoulder complex is the most mobile joint in your body, which is exactly why it's so vulnerable. Common sources of shoulder pain include neck and upper-back problems, arthritis in the joint, abnormal motor patterns producing wrong-shape motion, sports activity, and car accidents. The pain can come on suddenly or build gradually — and because you use the shoulder for nearly everything you do, even small injuries deserve to be looked at early.</p>
        <p>Signs to take seriously: pain that lasts more than a week or keeps coming back, difficulty raising the arm overhead, pain that worsens at night, visible bruising or swelling, snapping or clicking with movement, trouble carrying objects.</p>`
      },
      { label: 'How We Treat It', heading: 'Start at the spine. Adjust the joint if needed.',
        body: `        <p>The neck and upper back are where all the muscles and nerves that control the shoulder originate. If the cervical spine is misaligned, the nerves get irritated, the muscles compensate, and shoulder pain develops — sometimes as a referral pattern from the neck rather than damage to the shoulder itself. We start with a spinal evaluation and adjust where needed.</p>
        <p>If pain persists after the spine is addressed, we can adjust the shoulder complex directly and pair that with manual or passive therapies to support recovery. Whether the source is the spine or the joint itself, chiropractic care provides a real, non-invasive option for getting your shoulder back.</p>`
      },
    ],
  },
  {
    slug: 'pregnancy',
    title: 'Pregnancy',
    label: 'Other Condition',
    tagline: "Gentle, drug-free chiropractic care that supports you through every trimester — and into recovery after.",
    sections: [
      { label: 'Why Pregnancy Stresses the Spine', heading: 'Your body is changing fast. Your back is doing the work.',
        body: `        <p>During pregnancy, a woman's body undergoes huge mechanical changes. The growing baby shifts the center of gravity forward into the pelvis — a position the body isn't naturally built for. As weight increases, the lordotic curve in the low back deepens, the joints in the pelvis take on more load, and the muscles around the spine work harder than they're used to.</p>
        <p>Roughly 50–70% of pregnant women experience low back pain at some point, and it usually peaks in the third trimester when the baby is gaining the most weight. If there's a history of low back issues, pregnancy tends to amplify them — making daily routines harder and complicating labor and delivery. Other common complaints include leg cramps, abdominal cramping, and constipation, all of which can connect back to spinal stress.</p>`
      },
      { label: 'How Chiropractic Helps During Pregnancy', heading: 'Safe, gentle, and built for what your body is doing.',
        body: `        <p>Chiropractic care during pregnancy uses specialized techniques designed for the changing body. We adjust gently, with positioning that accommodates the pregnancy at every stage. Many women who receive chiropractic care during pregnancy report needing little to no pain medication during delivery, and there are studies suggesting regular care can reduce labor time.</p>
        <p>We also provide care after delivery — your body has work to do recovering its old alignment, and gentle adjustments help that process happen the way it should.</p>`
      },
    ],
  },
  {
    slug: 'vertigo',
    title: 'Vertigo',
    label: 'Other Condition',
    tagline: "When the room won\'t hold still — and balance becomes a daily negotiation. Real answers, drug-free.",
    sections: [
      { label: 'What Vertigo Actually Is', heading: 'Dizzy and vertigo aren\'t the same thing.',
        body: `        <p>"Dizzy" gets used loosely. Most people mean one of two things by it: either they feel like they're about to pass out, or they feel like the room is spinning around them. Vertigo is the second one — the spinning sensation — and it has very different causes from a near-faint feeling. Knowing which one you're actually experiencing is the first step toward fixing it.</p>
        <p>Common sources of vertigo include severe headaches (migraines and tension headaches both can trigger it), chronic ear infections or inner-ear damage, reduced blood flow to the brain, joint and ligament damage in the spine after a car accident, and — most commonly — misalignments in the upper cervical vertebrae.</p>`
      },
      { label: 'How Chiropractic Approaches Vertigo', heading: 'Restore the signals. Restore the balance.',
        body: `        <p>The areas above all play roles in how your body keeps itself oriented in space. When the signals reaching your brain become disrupted — because of a structural misalignment or irritated nerves — your sense of balance gets scrambled and the world starts to spin. Restoring proper nervous system communication restores the balance.</p>
        <p>Vertigo symptoms can run from a mild nuisance to a sign of something serious. If you're experiencing any of the following, schedule an evaluation: blurry vision or difficulty focusing, hearing problems in one ear, ringing ears, trouble maintaining balance, difficulty concentrating, persistent fatigue, unexplained nausea, sea-sickness sensations, slurred speech, or double vision.</p>
        <p>Through a careful history and exam, we find the source. From there, the treatment is built for your specific case.</p>`
      },
    ],
  },
];

let written = 0;
for (const p of pages) {
  fs.writeFileSync(`./${p.slug}.html`, buildPage(p));
  written++;
  console.log(`  ✓ ${p.slug}.html`);
}
console.log(`\nCondition pages filled: ${written}.`);
