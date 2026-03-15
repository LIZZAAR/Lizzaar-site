// Basic interactive behaviors and accessibility helpers
document.addEventListener('DOMContentLoaded', function() {

  // Menu toggle for small screens
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      siteNav.classList.toggle('is-active'); // Gebruik een class voor meer controle
    });
  }

  // Keyboard: close menu on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && siteNav.classList.contains('is-active')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-active');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      // Sluit het menu als een link wordt geklikt
      if (siteNav.classList.contains('is-active')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('is-active');
      }
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Jaartal in footer (dit hoort hier, niet in index.html)
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});