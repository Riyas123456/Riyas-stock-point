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