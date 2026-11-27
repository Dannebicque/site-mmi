/* One page MMI : thème, menu, bandeau, vidéo, révélations, filtres, timeline */
(function () {
  var d = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Thème clair / sombre
  var themeBtn = document.getElementById('theme-toggle');
  function syncThemeLabel() {
    if (!themeBtn) return;
    var dark = d.getAttribute('data-theme') !== 'light';
    themeBtn.setAttribute('aria-label', dark ? 'Passer en mode clair' : 'Passer en mode sombre');
  }
  syncThemeLabel();
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var next = d.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    d.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    syncThemeLabel();
  });

  // Menu mobile
  var burger = document.getElementById('op-burger');
  var menu = document.getElementById('op-menu');
  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  }
  if (burger && menu) {
    burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  // Bouton pause générique (bandeau, vidéo)
  function pauseToggle(btn, onChange, labels) {
    if (!btn) return;
    btn.addEventListener('click', function () {
      var paused = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(paused));
      if (labels) btn.setAttribute('aria-label', paused ? labels[1] : labels[0]);
      onChange(paused);
    });
  }
  var marquee = document.querySelector('.op-marquee');
  var mqBtn = document.getElementById('op-marquee-toggle');
  pauseToggle(mqBtn, function (p) { marquee.classList.toggle('is-paused', p); },
    ['Mettre le bandeau en pause', 'Relancer le bandeau']);
  if (reduce && mqBtn) mqBtn.hidden = true;

  var video = document.getElementById('op-hero-video');
  var vBtn = document.getElementById('op-video-toggle');
  if (video && reduce) { video.pause(); if (vBtn) vBtn.setAttribute('aria-pressed', 'true'); }
  pauseToggle(vBtn, function (p) { if (video) { p ? video.pause() : video.play(); } });

  // Révélation des titres au scroll
  var reveals = document.querySelectorAll('.op-reveal:not(.is-in)');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Filtres des projets
  var chips = document.querySelectorAll('.op-chip');
  var works = document.querySelectorAll('.op-work');
  var empty = document.getElementById('op-empty');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      var shown = 0;
      works.forEach(function (w) {
        var ok = f === 'tout' || (' ' + w.getAttribute('data-cat') + ' ').indexOf(' ' + f + ' ') > -1;
        w.hidden = !ok;
        if (ok) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    });
  });

  // Timeline active au scroll
  var steps = Array.prototype.slice.call(document.querySelectorAll('.op-step'));
  var img = document.getElementById('op-tl-img');
  var cap = document.getElementById('op-tl-cap');
  var fill = document.getElementById('op-tl-fill');
  var list = document.getElementById('op-steps');
  var current = -1;
  function activate(i) {
    if (i === current || !steps[i]) return;
    current = i;
    steps.forEach(function (s, k) {
      s.classList.toggle('is-active', k === i);
      s.classList.toggle('is-done', k < i);
      s.querySelector('.op-step__btn').setAttribute('aria-current', k === i ? 'step' : 'false');
    });
    var s = steps[i];
    if (img && img.getAttribute('src') !== s.dataset.img) {
      img.classList.add('is-swapping');
      setTimeout(function () {
        img.src = s.dataset.img; img.alt = s.dataset.alt;
        img.classList.remove('is-swapping');
      }, reduce ? 0 : 180);
    }
    if (cap) cap.textContent = 'Étape ' + (i + 1) + ' sur ' + steps.length + ' · ' + s.dataset.title;
    if (fill && list) {
      var dot = s.querySelector('.op-step__dot');
      var top = list.querySelector('.op-tl__track').offsetTop;
      fill.style.height = Math.max(0, s.offsetTop + dot.offsetTop + 8 - top) + 'px';
    }
  }
  var scroller = document.getElementById('op-tl-scroller');
  var pinMQ = window.matchMedia('(min-width: 901px) and (min-height: 620px)');
  function pinned() { return scroller && pinMQ.matches; }
  function stepScrollTop(i) {
    var total = scroller.offsetHeight - window.innerHeight;
    var top = scroller.getBoundingClientRect().top + window.scrollY;
    return top + total * (i + 0.5) / steps.length;
  }
  steps.forEach(function (s, i) {
    s.querySelector('.op-step__btn').addEventListener('click', function () {
      if (pinned()) window.scrollTo({ top: stepScrollTop(i), behavior: reduce ? 'auto' : 'smooth' });
      else activate(i);
    });
  });
  if (steps.length) {
    activate(0);
    var ticking = false;
    function onScroll() {
      ticking = false;
      var best = 0;
      if (pinned()) {
        // Section épinglée : la progression dans le conteneur choisit l'étape
        var total = scroller.offsetHeight - window.innerHeight;
        var p = Math.min(Math.max(-scroller.getBoundingClientRect().top / total, 0), 0.9999);
        best = Math.floor(p * steps.length);
      } else {
        var line = window.innerHeight * 0.45;
        steps.forEach(function (s, i) { if (s.getBoundingClientRect().top < line) best = i; });
      }
      activate(best);
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    window.addEventListener('resize', function () { var c = current; current = -1; activate(c); onScroll(); });
  }
})();
