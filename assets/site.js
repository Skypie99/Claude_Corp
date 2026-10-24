/* Claude Corp · site behaviour. Progressive enhancement only: with this file
   missing or blocked, every section is visible, the navigation is a plain list
   and the page follows the operating system's light or dark preference. */
(function () {
  'use strict';

  var root = document.documentElement;
  var THEME_COLOR = { light: '#FAF8F1', dark: '#15191A' };
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function onChange(query, handler) {
    if (query.addEventListener) query.addEventListener('change', handler);
    else if (query.addListener) query.addListener(handler);
  }

  // iOS Safari only applies :active pressed states when a touch listener exists.
  document.addEventListener('touchstart', function () {}, { passive: true });

  /* ── Theme ─────────────────────────────────────────────────────────────
     A saved choice lives in localStorage under cc-theme (same key as before);
     without one, the operating system decides and changes are followed live. */
  var toggles = Array.prototype.slice.call(document.querySelectorAll('[data-theme-toggle]'));
  var themeMetas = Array.prototype.slice.call(document.querySelectorAll('meta[name="theme-color"]'));
  var crossFadeTimer = null;

  function effectiveTheme() {
    var t = root.getAttribute('data-theme');
    if (t === 'light' || t === 'dark') return t;
    return prefersDark.matches ? 'dark' : 'light';
  }

  function syncTheme() {
    var current = effectiveTheme();
    var next = current === 'dark' ? 'light' : 'dark';
    toggles.forEach(function (button) {
      var label = button.querySelector('[data-theme-label]');
      if (label) label.textContent = next === 'dark' ? 'Dark' : 'Light';
      button.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    });
    var saved = root.hasAttribute('data-theme');
    themeMetas.forEach(function (meta) {
      var media = meta.getAttribute('media') || '';
      var natural = media.indexOf('dark') > -1 ? THEME_COLOR.dark : THEME_COLOR.light;
      meta.setAttribute('content', saved ? THEME_COLOR[current] : natural);
    });
  }

  toggles.forEach(function (button) {
    button.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      if (!reduceMotion.matches) {
        // Arm the cross-fade for this switch only, so hover and focus stay instant.
        root.classList.add('theming');
        window.clearTimeout(crossFadeTimer);
        crossFadeTimer = window.setTimeout(function () { root.classList.remove('theming'); }, 420);
      }
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('cc-theme', next); } catch (e) { /* storage blocked: the choice lasts for this visit only */ }
      syncTheme();
    });
  });
  onChange(prefersDark, function () { if (!root.hasAttribute('data-theme')) syncTheme(); });
  syncTheme();

  /* ── Menu (narrow screens) ─────────────────────────────────────────────
     A disclosure, not a dialog: the links stay in reading order and Escape or
     choosing a link closes it. Wide screens always show the navigation. */
  /** @type {HTMLButtonElement | null} */
  var menuButton = document.querySelector('[data-menu-toggle]');
  var nav = document.getElementById('primary-nav');
  var narrow = window.matchMedia('(max-width: 73.749em)');

  function setMenu(open) {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.setAttribute('data-open', open ? 'true' : 'false');
  }
  if (menuButton && nav) {
    setMenu(false);
    menuButton.addEventListener('click', function () {
      setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (event) {
      var target = event.target;
      if (narrow.matches && target instanceof Element && target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuButton.focus();
      }
    });
    onChange(narrow, function () { setMenu(false); });
  }

  /* ── Sections rise once into view ──────────────────────────────────────
     Only below-the-fold sections are hidden first, so nothing on screen
     disappears and the first screen never waits on motion. */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var revealObserver = null;

  function showAll() {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
    root.classList.remove('motion');
    if (revealObserver) { revealObserver.disconnect(); revealObserver = null; }
  }

  function startReveal() {
    if (reduceMotion.matches || !('IntersectionObserver' in window) || !reveals.length) { showAll(); return; }
    var fold = window.innerHeight * 0.92;
    reveals.forEach(function (el) { if (el.getBoundingClientRect().top < fold) el.classList.add('is-in'); });
    root.classList.add('motion');
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { if (!el.classList.contains('is-in')) revealObserver.observe(el); });
  }
  onChange(reduceMotion, function () { if (reduceMotion.matches) showAll(); });
  startReveal();

  /* ── Stations on the spine ─────────────────────────────────────────────
     The section crossing the upper part of the viewport fills its spine dot,
     a quiet "you are here" that needs no announcement. */
  var sections = Array.prototype.slice.call(document.querySelectorAll('.spine > .section'));
  if (sections.length && 'IntersectionObserver' in window) {
    var stationObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          sections.forEach(function (s) { s.classList.toggle('is-current', s === entry.target); });
        }
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    sections.forEach(function (s) { stationObserver.observe(s); });
  }
})();
