/* ============================================
   Family Tree Chiropractic — Main JS
   Scroll animations, navigation, interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll-triggered fade-in animations ---
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    fadeObserver.observe(el);
  });

  // --- Navbar scroll behavior ---
  const nav = document.querySelector('.nav');
  if (nav) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 60) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // --- Mobile nav toggle ---
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav__links--open');
      navToggle.classList.toggle('nav__toggle--active');
      document.body.style.overflow = navLinks.classList.contains('nav__links--open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a:not(.nav__dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav__links--open');
        navToggle.classList.remove('nav__toggle--active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Desktop contact panel for the primary call buttons ---
  const callTriggers = document.querySelectorAll(
    '.nav .btn--nav[href^="tel:"], .hero .hero__call[href^="tel:"]'
  );

  if (callTriggers.length) {
    const desktopCallPanel = window.matchMedia('(min-width: 769px)');
    const panelOverlay = document.createElement('div');
    panelOverlay.className = 'contact-panel-overlay';
    panelOverlay.setAttribute('aria-hidden', 'true');
    panelOverlay.innerHTML = `
      <section class="contact-panel" role="dialog" aria-modal="true" aria-labelledby="contact-panel-title">
        <button class="contact-panel__close" type="button" aria-label="Close contact panel">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
        <p class="contact-panel__eyebrow">Family Tree Chiropractic</p>
        <h2 id="contact-panel-title">Let&rsquo;s get you feeling better.</h2>
        <div class="contact-panel__details">
          <a class="contact-panel__detail" href="tel:7177382555">
            <span class="contact-panel__icon" aria-hidden="true">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.92.36 1.82.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.99.34 1.89.58 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
            <span><small>Call us</small><strong>717-738-2555</strong></span>
          </a>
          <a class="contact-panel__detail" href="https://www.google.com/maps/search/?api=1&amp;query=904+Dawn+Ave%2C+Ephrata%2C+PA+17522" target="_blank" rel="noopener">
            <span class="contact-panel__icon" aria-hidden="true">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>
              </svg>
            </span>
            <span><small>Visit us</small><strong>904 Dawn Ave.<br>Ephrata, PA 17522</strong></span>
          </a>
        </div>
      </section>
    `;
    document.body.appendChild(panelOverlay);

    const panel = panelOverlay.querySelector('.contact-panel');
    const closeButton = panelOverlay.querySelector('.contact-panel__close');
    let activeTrigger = null;

    const openContactPanel = (trigger) => {
      activeTrigger = trigger;
      panelOverlay.classList.add('contact-panel-overlay--open');
      panelOverlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('contact-panel-open');
      requestAnimationFrame(() => closeButton.focus());
    };

    const closeContactPanel = () => {
      if (!panelOverlay.classList.contains('contact-panel-overlay--open')) return;
      panelOverlay.classList.remove('contact-panel-overlay--open');
      panelOverlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('contact-panel-open');
      if (activeTrigger) activeTrigger.focus();
      activeTrigger = null;
    };

    callTriggers.forEach((trigger) => {
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.addEventListener('click', (event) => {
        if (!desktopCallPanel.matches) return;
        event.preventDefault();
        openContactPanel(trigger);
      });
    });

    closeButton.addEventListener('click', closeContactPanel);
    panelOverlay.addEventListener('click', (event) => {
      if (event.target === panelOverlay) closeContactPanel();
    });
    panel.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      const focusable = panel.querySelectorAll('a[href], button:not([disabled])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeContactPanel();
    });
    desktopCallPanel.addEventListener('change', (event) => {
      if (!event.matches) closeContactPanel();
    });
  }

  // --- Parallax hero background ---
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll < window.innerHeight) {
        heroBg.style.transform = `translateY(${scroll * 0.3}px)`;
      }
    }, { passive: true });
  }

  // --- Services carousel — buttery smooth transform-based sliding ---
  const carousels = document.querySelectorAll('.services-carousel');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.services-carousel__track');
    if (!track) return;

    let pos = 0;        // current translateX
    let target = 0;     // target translateX
    let isDragging = false;
    let startX = 0;
    let startPos = 0;
    let velocity = 0;
    let prevX = 0;
    let prevTime = 0;
    let rafId = null;

    // Calculate bounds
    function getMaxScroll() {
      return Math.max(0, track.scrollWidth - carousel.clientWidth);
    }

    // Smooth animation loop — runs continuously for butter
    function animate() {
      // Ease toward target
      pos += (target - pos) * 0.08;
      // Clamp
      const max = getMaxScroll();
      if (target < -max) target = -max;
      if (target > 0) target = 0;
      if (Math.abs(pos - target) < 0.5) pos = target;
      track.style.transform = `translate3d(${pos}px, 0, 0)`;
      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    // Mouse drag
    carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startPos = target;
      velocity = 0;
      prevX = e.clientX;
      prevTime = Date.now();
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const now = Date.now();
      const dt = now - prevTime;
      if (dt > 0) velocity = (e.clientX - prevX) / dt;
      prevX = e.clientX;
      prevTime = now;
      target = startPos + dx;
      e.preventDefault();
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      // Apply momentum
      target += velocity * 300;
      // Clamp
      const max = getMaxScroll();
      if (target < -max) target = -max;
      if (target > 0) target = 0;
    });

    // Touch support
    carousel.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      startPos = target;
      velocity = 0;
      prevX = e.touches[0].clientX;
      prevTime = Date.now();
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - startX;
      const now = Date.now();
      const dt = now - prevTime;
      if (dt > 0) velocity = (e.touches[0].clientX - prevX) / dt;
      prevX = e.touches[0].clientX;
      prevTime = now;
      target = startPos + dx;
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      target += velocity * 300;
      const max = getMaxScroll();
      if (target < -max) target = -max;
      if (target > 0) target = 0;
    });

    // Mouse wheel horizontal scroll
    carousel.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        const delta = e.deltaX || e.deltaY;
        target -= delta * 1.5;
        const max = getMaxScroll();
        if (target < -max) target = -max;
        if (target > 0) target = 0;
        e.preventDefault();
      }
    }, { passive: false });

    // Prevent link clicks after drag
    carousel.addEventListener('click', (e) => {
      if (Math.abs(target - startPos) > 10) {
        e.preventDefault();
      }
    }, true);
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // --- Pending static form behavior ---
  document.querySelectorAll('form[data-form-pending="true"]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-note--status');
      if (status) {
        status.textContent = 'Online message delivery is being connected. Please call 717-738-2555 and we will help you directly.';
      }
    });
  });

  // --- Animate stat numbers on scroll ---
  const statNumbers = document.querySelectorAll('.stat__number[data-count]');
  if (statNumbers.length) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          const duration = 2000;
          const start = performance.now();

          function animate(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = prefix + current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          }

          requestAnimationFrame(animate);
          statObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statObserver.observe(el));
  }

});
