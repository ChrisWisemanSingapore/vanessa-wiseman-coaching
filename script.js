'use strict';

/* ══════════════════════════════════════════════════════════
   CONFIGURATION — update these three values before deploying
   ══════════════════════════════════════════════════════════ */
var WHATSAPP_URL  = 'https://wa.me/447000000000';            // ← your WhatsApp number
var CALENDLY_URL  = 'https://calendly.com/vanessawiseman';   // ← your Calendly URL
var EMAIL_ADDRESS = 'enquiries@vanessawiseman.com';           // ← your email address
/* ══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Inject config values into all matching links/text ── */
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (el) {
    el.href = WHATSAPP_URL;
  });
  document.querySelectorAll('a[href*="calendly.com"]').forEach(function (el) {
    el.href = CALENDLY_URL;
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach(function (el) {
    el.href = 'mailto:' + EMAIL_ADDRESS;
  });
  document.querySelectorAll('.email-text').forEach(function (el) {
    el.textContent = EMAIL_ADDRESS;
  });

  /* ── Mobile Navigation ── */
  var hamburger = document.querySelector('.hamburger');
  var mobMenu   = document.getElementById('mob-menu');

  if (hamburger && mobMenu) {
    hamburger.addEventListener('click', toggleMenu);
    document.addEventListener('click', function (e) {
      if (mobMenu.classList.contains('open') &&
          !mobMenu.contains(e.target) &&
          !hamburger.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* ── Floating CTA — scroll-triggered (300px) ── */
  var floatWrap = document.querySelector('.float-wrap');
  if (floatWrap) {
    function onScroll() {
      if (window.scrollY > 300) {
        floatWrap.classList.add('float-visible');
      } else {
        floatWrap.classList.remove('float-visible');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // check immediately (handles mid-scroll page loads)
  }

  /* ── Contact Form ── */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
  }

});

/* ── Nav helpers ── */
function toggleMenu() {
  var menu = document.getElementById('mob-menu');
  if (!menu) return;
  var open = menu.classList.toggle('open');
  document.body.style.overflow = open ? 'hidden' : '';
}

function closeMenu() {
  var menu = document.getElementById('mob-menu');
  if (menu) menu.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Form submission (Netlify Forms + success state) ── */
async function handleSubmit(e) {
  e.preventDefault();
  var form    = document.getElementById('contact-form');
  var success = document.getElementById('form-success');

  try {
    /* Netlify Forms — posts encoded data when hosted on Netlify.
       On other hosts this will fail silently and the success state still shows. */
    await fetch('/', {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    new URLSearchParams(new FormData(form)).toString(),
    });
  } catch (_) { /* non-Netlify preview — safe to ignore */ }

  if (form)    form.style.display    = 'none';
  if (success) success.style.display = 'flex';
}
