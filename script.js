/**
 * script.js — Gushwork assignment (vanilla).
 * - Sticky mini-header: after passing the hero fold, show on scroll-down; hide on scroll-up.
 * - Hero carousel: prev/next + thumbnails update the main image (single exported asset).
 * - Hover zoom: magnified circular preview following pointer (skipped when reduced motion).
 * - Manufacturing section: tab buttons swap visible panel (home-page Figma 490:9877).
 */
(function () {
  "use strict";

  var headerStack = document.getElementById("header-stack");
  var siteSticky = document.getElementById("site-sticky");
  var hero = document.getElementById("hero");
  var mainImg = document.getElementById("hero-main-img");
  var mainWrap = document.getElementById("hero-main");
  var zoomEl = document.getElementById("hero-zoom");
  var thumbsWrap = document.getElementById("hero-thumbs");
  var btnPrev = document.getElementById("hero-prev");
  var btnNext = document.getElementById("hero-next");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var slides = Array.prototype.map.call(document.querySelectorAll(".hero__thumb"), function (btn) {
    return { src: mainImg.src, alt: mainImg.alt };
  });

  var lastScrollY = window.scrollY || 0;
  var ticking = false;
  var activeIndex = 0;

  function heroFoldBottom() {
    if (!hero) return 0;
    return hero.offsetTop + hero.offsetHeight;
  }

  /**
   * Sticky reveal uses scroll position past the hero section bottom (first meaningful fold)
   * and scroll direction: down shows, up hides.
   */
  function updateSticky() {
    if (!headerStack || !hero) return;
    var y = window.scrollY || 0;
    var dir = y > lastScrollY ? 1 : y < lastScrollY ? -1 : 0;
    lastScrollY = y;
    var past = y >= heroFoldBottom() - 8;
    if (!past) {
      headerStack.classList.remove("is-revealed");
      if (siteSticky) siteSticky.setAttribute("aria-hidden", "true");
      return;
    }
    if (dir > 0) {
      headerStack.classList.add("is-revealed");
      if (siteSticky) siteSticky.setAttribute("aria-hidden", "false");
    } else if (dir < 0) {
      headerStack.classList.remove("is-revealed");
      if (siteSticky) siteSticky.setAttribute("aria-hidden", "true");
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      updateSticky();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateSticky();

  function setActiveIndex(next) {
    var n = slides.length;
    activeIndex = (next % n + n) % n;
    var slide = slides[activeIndex];
    mainImg.src = slide.src;
    mainImg.alt = slide.alt;

    var buttons = thumbsWrap ? thumbsWrap.querySelectorAll(".hero__thumb") : [];
    Array.prototype.forEach.call(buttons, function (b, i) {
      var on = i === activeIndex;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  if (btnPrev) btnPrev.addEventListener("click", function () { setActiveIndex(activeIndex - 1); });
  if (btnNext) btnNext.addEventListener("click", function () { setActiveIndex(activeIndex + 1); });

  if (thumbsWrap) {
    thumbsWrap.addEventListener("click", function (e) {
      var t = e.target.closest(".hero__thumb");
      if (!t || !thumbsWrap.contains(t)) return;
      var idx = parseInt(t.getAttribute("data-index"), 10);
      if (!isNaN(idx)) setActiveIndex(idx);
    });
  }

  /**
   * Circular zoom lens: background is the same image at ~2x scale, positioned from pointer ratio.
   */
  function setupZoom() {
    if (reduceMotion || !mainWrap || !zoomEl || !mainImg) return;

    var lens = 140;
    var scale = 2;

    function showLens(show) {
      zoomEl.classList.toggle("is-on", show);
    }

    function moveLens(clientX, clientY) {
      var rect = mainWrap.getBoundingClientRect();
      var x = clientX - rect.left;
      var y = clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        showLens(false);
        return;
      }
      var url = 'url("' + mainImg.currentSrc + '")';
      zoomEl.style.backgroundImage = url;
      zoomEl.style.backgroundSize = rect.width * scale + "px " + rect.height * scale + "px";
      zoomEl.style.backgroundPosition =
        -(x * scale - lens / 2) + "px " + -(y * scale - lens / 2) + "px";

      var lx = x - lens / 2;
      var ly = y - lens / 2;
      lx = Math.max(0, Math.min(lx, rect.width - lens));
      ly = Math.max(0, Math.min(ly, rect.height - lens));
      zoomEl.style.left = lx + "px";
      zoomEl.style.top = ly + "px";
    }

    mainWrap.addEventListener("mouseenter", function () { showLens(true); });
    mainWrap.addEventListener("mouseleave", function () { showLens(false); });
    mainWrap.addEventListener("mousemove", function (e) {
      moveLens(e.clientX, e.clientY);
    });
  }

  setupZoom();

  /** Manufacturing process tabs */
  var mfgTabsRoot = document.querySelector(".mfg-tabs");
  if (mfgTabsRoot) {
    mfgTabsRoot.addEventListener("click", function (e) {
      var tab = e.target.closest(".mfg-tab");
      if (!tab || !mfgTabsRoot.contains(tab)) return;
      var idx = tab.getAttribute("data-mfg");
      if (idx === null) return;

      var tabs = mfgTabsRoot.querySelectorAll(".mfg-tab");
      Array.prototype.forEach.call(tabs, function (t) {
        var on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });

      var panels = document.querySelectorAll("[data-mfg-panel]");
      Array.prototype.forEach.call(panels, function (p) {
        var on = p.getAttribute("data-mfg-panel") === idx;
        p.classList.toggle("is-active", on);
        if (on) p.removeAttribute("hidden");
        else p.setAttribute("hidden", "");
      });
    });
  }
})();

/* ===== Mobile navigation ===== */
(function () {
  var toggle = document.getElementById('nav-toggle');
  var nav    = document.getElementById('mobile-nav');
  var overlay = document.getElementById('nav-overlay');

  function open() {
    nav.removeAttribute('hidden');
    overlay.classList.add('is-open');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    nav.setAttribute('hidden', '');
    overlay.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      toggle.classList.contains('is-open') ? close() : open();
    });
  }

  if (overlay) overlay.addEventListener('click', close);

  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') close();
    });
  }
})();

/* ===== Scroll reveal ===== */
(function () {
  if (!window.IntersectionObserver) return;

  var selectors = [
    '.feature-card', '.app-card', '.portfolio-card',
    '.testimonial-card', '.faq-item', '.resource-list li',
    '.section__title', '.section__lead', '.mfg-panel__copy',
    '.spec-table-wrap', '.portfolio-bar', '.faq-cta'
  ];

  var els = document.querySelectorAll(selectors.join(', '));

  Array.prototype.forEach.call(els, function (el) {
    el.classList.add('reveal');
  });

  var io = new IntersectionObserver(function (entries) {
    Array.prototype.forEach.call(entries, function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  Array.prototype.forEach.call(els, function (el) {
    io.observe(el);
  });
})();
