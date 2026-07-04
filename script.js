/* =====================================================
   RIYAS STOCK POINT — script.js
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. NAVBAR — scroll shadow + active link
     ========================================== */
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();


  /* ==========================================
     2. HAMBURGER MENU (mobile)
     ========================================== */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Animate bars
    const bars = hamburger.querySelectorAll('span');
    if (isOpen) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    }
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const bars = hamburger.querySelectorAll('span');
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      const bars = hamburger.querySelectorAll('span');
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    }
  });


  /* ==========================================
     3. ACTIVE NAV LINK — highlight on scroll
     ========================================== */
  const sections = document.querySelectorAll('section[id]');
  const allLinks = navLinks.querySelectorAll('a[href^="#"]');

  const highlightActiveLink = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    allLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--red-bright)';
      }
    });
  };
  window.addEventListener('scroll', highlightActiveLink, { passive: true });


  /* ==========================================
     4. SCROLL REVEAL — .fade-in elements
     ========================================== */
  const fadeEls = document.querySelectorAll('.fade-in');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings in the same parent
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.fade-in'));
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 0.1}s`;
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  fadeEls.forEach(el => revealObserver.observe(el));


  /* ==========================================
     5. SMOOTH SCROLL for anchor links
     ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 8;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ==========================================
     6. MENU CARDS — hover ripple effect
     ========================================== */
  document.querySelectorAll('.menu-item, .about-card, .why-card, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      card.style.willChange = 'transform, box-shadow';
    });
    card.addEventListener('mouseleave', () => {
      card.style.willChange = '';
    });
  });


  /* ==========================================
     7. MARQUEE — pause on hover
     ========================================== */
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    marqueeTrack.parentElement.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.parentElement.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }


  /* ==========================================
     8. HERO BADGE — subtle entrance delay
     ========================================== */
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) {
    heroBadge.style.animationDelay = '0s';
  }


  /* ==========================================
     9. COUNTER ANIMATION — hero stats
         (runs once when hero stats scroll into view)
     ========================================== */
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          heroStats.querySelectorAll('.stat-num').forEach(el => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.6s ease';
            setTimeout(() => { el.style.opacity = '1'; }, 200);
          });
          heroObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    heroObserver.observe(heroStats);
  }


  /* ==========================================
     10. LOGO FLOAT animation re-trigger on tab focus
     ========================================== */
  const heroLogoImg = document.querySelector('.hero-logo-img');
  if (heroLogoImg) {
    heroLogoImg.addEventListener('animationiteration', () => {
      // Keep animation fresh — no action needed, just observer hook
    });
  }


  /* ==========================================
     11. CULTURE BADGE TAGS — stagger reveal
     ========================================== */
  const cultureTags = document.querySelectorAll('.culture-tag');
  const cultureObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        cultureTags.forEach((tag, i) => {
          setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
          }, i * 200 + 400);
        });
        cultureObserver.disconnect();
      }
    },
    { threshold: 0.3 }
  );
  cultureTags.forEach(tag => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(12px)';
    tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  const cultureSection = document.querySelector('.culture');
  if (cultureSection) cultureObserver.observe(cultureSection);


  /* ==========================================
     12. FOOTER YEAR — auto update
     ========================================== */
  const yearEl = document.querySelector('.footer-bottom p');
  if (yearEl) {
    const year = new Date().getFullYear();
    yearEl.innerHTML = yearEl.innerHTML.replace(/\d{4}/, year);
  }

});
 

/* =====================================================
   RIYAS STOCK POINT — contact.js
   Contact page only. Existing script.js is untouched
   and still runs first (navbar, hamburger, fade-in, etc.)
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Contact form: client-side validation + WhatsApp fallback ----- */
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('cf-status');
  if (!form) return;

  // Set this to your WhatsApp number in international format, no '+', e.g. '919876543210'
  const WHATSAPP_NUMBER = '';

  const setStatus = (msg, type) => {
    status.textContent = msg;
    status.classList.remove('success', 'error');
    if (type) status.classList.add(type);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const phone   = form.phone.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !phone || !subject || !message) {
      setStatus('Please fill in your name, phone, subject and message.', 'error');
      return;
    }
    if (!/^[0-9+\-\s]{7,15}$/.test(phone)) {
      setStatus('Please enter a valid phone number.', 'error');
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Compose WhatsApp message and open chat
    const text =
      `Hello Riyas Stock Point,%0A` +
      `*Name:* ${encodeURIComponent(name)}%0A` +
      `*Phone:* ${encodeURIComponent(phone)}%0A` +
      (email ? `*Email:* ${encodeURIComponent(email)}%0A` : '') +
      `*Subject:* ${encodeURIComponent(subject)}%0A` +
      `*Message:* ${encodeURIComponent(message)}`;

    const waUrl = WHATSAPP_NUMBER
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
      : `https://wa.me/?text=${text}`;

    setStatus('Opening WhatsApp… please send the message to complete your enquiry.', 'success');
    window.open(waUrl, '_blank', 'noopener');
    form.reset();
  });


  /* ----- FAQ: keep only one open at a time (optional polish) ----- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });


  /* ----- Fade-in on scroll (safe if script.js already handles it) ----- */
  if (!window.__riyasFadeInBound) {
    const faders = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window && faders.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      faders.forEach((el) => io.observe(el));
    }
    window.__riyasFadeInBound = true;
  }
});

/* =====================================================
   RIYAS STOCK POINT — about.js
   About-page-only enhancements. Existing script.js
   handles navbar, hamburger, active links and fade-ins.
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Auto-update footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- FAQ accordion: only one open at a time ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('navbar')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navH + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Fade-in on scroll (safety net if script.js already handles it) ---------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    fadeEls.forEach((el) => io.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add('visible'));
  }
});
