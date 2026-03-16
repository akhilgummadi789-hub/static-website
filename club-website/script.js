/* ================================================
   CLOUD COMMUNITY CLUB — C3  |  script.js
================================================ */

/* ---- 1. NAVBAR — glass effect on scroll ---- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ---- 2. HAMBURGER MENU (mobile) ---- */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


/* ---- 3. REVEAL ON SCROLL (Intersection Observer) ---- */
const revealEls = document.querySelectorAll(
  '.reveal, .skill-card, .project-card, .stat-card, .team-card'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});


/* ---- 4. SKILL BARS — animate width into view ---- */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.bar-fill').forEach(fill => {
          fill.style.width = fill.getAttribute('data-pct') + '%';
        });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.skill-card').forEach(card => barObserver.observe(card));


/* ---- 5. ACTIVE NAV LINK HIGHLIGHT ---- */
const sections   = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(sec => sectionObserver.observe(sec));


/* ---- 6. TEAM CARDS — staggered reveal ---- */
document.querySelectorAll('.team-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});


/* ---- 7. CONTACT FORM — validation + success state ---- */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate required fields
  const required = contactForm.querySelectorAll('[required]');
  let valid = true;

  required.forEach(input => {
    input.style.borderColor = '';
    if (!input.value.trim()) {
      input.style.borderColor = '#ff6b6b';
      valid = false;
    }
    if (input.type === 'email' && input.value.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        input.style.borderColor = '#ff6b6b';
        valid = false;
      }
    }
  });

  if (!valid) return;

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Submitting…';
  btn.disabled = true;

  // Simulate form submission (replace with real API call)
  setTimeout(() => {
    contactForm.reset();
    btn.textContent = 'Submit Application ☁️';
    btn.disabled = false;
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 6000);
  }, 1200);
});


/* ---- 8. PARALLAX — subtle blob movement on mouse ---- */
const blob1 = document.querySelector('.blob-1');
const blob2 = document.querySelector('.blob-2');

document.addEventListener('mousemove', (e) => {
  const dx = (e.clientX - window.innerWidth  / 2) / window.innerWidth;
  const dy = (e.clientY - window.innerHeight / 2) / window.innerHeight;
  blob1.style.transform = `translate(${dx * 30}px, ${dy * 20}px)`;
  blob2.style.transform = `translate(${-dx * 20}px, ${-dy * 30}px)`;
}, { passive: true });


/* ---- 9. HERO — trigger reveal on page load ---- */
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#hero .reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100);
  });
});
