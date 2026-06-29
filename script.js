'use strict';

/* ── Mobile Navigation ── */
function toggleMenu() {
  var menu = document.getElementById('mob-menu');
  var open = menu.classList.toggle('open');
  document.body.style.overflow = open ? 'hidden' : '';
}

function closeMenu() {
  document.getElementById('mob-menu').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', function (e) {
  var menu = document.getElementById('mob-menu');
  var btn  = document.querySelector('.hamburger');
  if (menu && menu.classList.contains('open') &&
      !menu.contains(e.target) && btn && !btn.contains(e.target)) {
    closeMenu();
  }
});

/* ── Contact Form ── */
function handleSubmit(e) {
  e.preventDefault();
  var form    = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  if (form)    form.style.display    = 'none';
  if (success) success.style.display = 'flex';
}
