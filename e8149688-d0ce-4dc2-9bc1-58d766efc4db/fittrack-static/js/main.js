/* =====================================================
   FitTrack — Main JavaScript
   Features:
   - Sticky navbar shadow on scroll
   - Mobile menu toggle
   - Smooth scroll for anchor links
   - Scroll-triggered fade-in animations
   ===================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------
     1. Sticky Navbar — add shadow when scrolled
  -------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run once on load


  /* --------------------------------------------------
     2. Mobile Menu Toggle
  -------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('.navbar__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* --------------------------------------------------
     3. Smooth Scroll for Anchor Links
  -------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight + 16 : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });


  /* --------------------------------------------------
     4. Scroll-Triggered Fade-In Animations
  -------------------------------------------------- */
  const fadeTargets = [
    '.hero__content',
    '.hero__visual',
    '.brands__logos',
    '.feature__text',
    '.feature__visual',
    '.data-section__text',
    '.data-section__visual',
    '.pricing-card',
    '.cta-banner__inner',
    '.testimonial-card',
    '.download__text',
    '.download__visual',
    '.footer__brand',
    '.footer__nav',
    '.footer__cta'
  ];

  // Add fade-in class to all target elements
  fadeTargets.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.classList.add('fade-in');
    });
  });

  // IntersectionObserver for triggering animations
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('visible');
    });
  }


  /* --------------------------------------------------
     5. Pricing Card Stagger Animation
  -------------------------------------------------- */
  document.querySelectorAll('.pricing-card').forEach(function (card, index) {
    card.style.transitionDelay = (index * 0.1) + 's';
  });


  /* --------------------------------------------------
     6. Active Nav Link Highlight on Scroll
  -------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  function updateActiveLink() {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - (navbar ? navbar.offsetHeight + 60 : 100);
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('navbar__link--active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('navbar__link--active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

})();
