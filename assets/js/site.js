/* Braids by Latifah - site interactions (vanilla, no dependencies) */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- mobile navigation ---------- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var menu = document.querySelector('[data-nav-menu]');
  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.classList.toggle('is-open', open);
    var label = toggle.querySelector('.nav__toggle-label');
    if (label) label.textContent = open ? 'Close' : 'Menu';
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth >= 960) setMenu(false); });
  }

  /* ---------- scroll: header state, braid progress, parallax ---------- */
  var header = document.querySelector('[data-header]');
  var parallax = Array.prototype.slice.call(document.querySelectorAll('[data-parallax], .parallax-img'));
  var ticking = false;
  function onFrame() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;
    var max = Math.max(1, doc.scrollHeight - window.innerHeight);
    if (header) {
      header.classList.toggle('is-scrolled', y > 8);
      header.style.setProperty('--p', Math.min(1, Math.max(0, y / max)).toFixed(4));
    }
    if (reduce.matches) return;
    var vh = window.innerHeight;
    for (var i = 0; i < parallax.length; i++) {
      var el = parallax[i];
      var r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) continue;
      var speed = parseFloat(el.getAttribute('data-parallax')) || 0.06;
      var offset = (r.top + r.height / 2 - vh / 2) * speed;
      el.style.setProperty('--py', offset.toFixed(1) + 'px');
    }
  }
  function requestFrame() { if (!ticking) { ticking = true; window.requestAnimationFrame(onFrame); } }
  window.addEventListener('scroll', requestFrame, { passive: true });
  window.addEventListener('resize', requestFrame);
  onFrame();

  /* ---------- counters ("13") ---------- */
  function runCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (reduce.matches || !target) { el.textContent = target; return; }
    var start = null, dur = 1600;
    el.textContent = '0';
    function step(ts) {
      if (!start) start = ts;
      var t = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(eased * target);
      if (t < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  /* ---------- reveal / unravel / braid weave ---------- */
  var targets = document.querySelectorAll('.reveal, .unravel, .braid-divider, [data-count]');
  if ('IntersectionObserver' in window && !reduce.matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('is-in');
        if (el.hasAttribute('data-count')) runCount(el);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-in'); });
  }

  /* ---------- styles page: highlight current category chip ---------- */
  var chips = document.querySelectorAll('.chips__list a');
  if (chips.length && 'IntersectionObserver' in window) {
    var map = {};
    Array.prototype.forEach.call(chips, function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var chipIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Array.prototype.forEach.call(chips, function (a) { a.classList.remove('is-current'); a.removeAttribute('aria-current'); });
        var a = map[entry.target.id];
        if (a) {
          a.classList.add('is-current');
          a.setAttribute('aria-current', 'true');
          var list = a.parentNode.parentNode;
          var left = a.offsetLeft - list.clientWidth / 2 + a.clientWidth / 2;
          list.scrollTo({ left: left, behavior: reduce.matches ? 'auto' : 'smooth' });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) chipIO.observe(s); });
  }

  /* ---------- gallery filter ---------- */
  var grid = document.querySelector('[data-gallery]');
  var status = document.querySelector('[data-gallery-status]');
  var filters = document.querySelectorAll('[data-filter]');
  Array.prototype.forEach.call(filters, function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      Array.prototype.forEach.call(filters, function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      var shown = 0;
      Array.prototype.forEach.call(grid.children, function (li) {
        var match = f === 'all' || li.getAttribute('data-cat') === f;
        li.hidden = !match;
        if (match) { shown++; li.classList.add('is-in'); }
      });
      if (status) status.textContent = shown + (shown === 1 ? ' photo' : ' photos') + ' shown';
      requestFrame();
    });
  });

  /* ---------- lightbox ---------- */
  var dialog = document.querySelector('[data-lightbox-dialog]');
  if (dialog && grid && typeof dialog.showModal === 'function') {
    var lbImg = dialog.querySelector('[data-lightbox-img]');
    var lbCap = dialog.querySelector('[data-lightbox-cap]');
    var current = 0, lastFocus = null;
    function visibleButtons() {
      return Array.prototype.filter.call(grid.querySelectorAll('[data-lightbox]'), function (b) { return !b.closest('li').hidden; });
    }
    function show(i) {
      var list = visibleButtons();
      if (!list.length) return;
      current = (i + list.length) % list.length;
      var b = list[current];
      lbImg.src = b.getAttribute('data-lightbox');
      lbImg.width = parseInt(b.getAttribute('data-w'), 10);
      lbImg.height = parseInt(b.getAttribute('data-h'), 10);
      lbImg.alt = b.getAttribute('data-alt');
      lbCap.textContent = b.getAttribute('data-caption') + '  (' + (current + 1) + ' of ' + list.length + ')';
    }
    grid.addEventListener('click', function (e) {
      var b = e.target.closest('[data-lightbox]');
      if (!b) return;
      lastFocus = b;
      show(visibleButtons().indexOf(b));
      dialog.showModal();
      document.body.classList.add('has-lightbox');
    });
    dialog.querySelector('[data-lightbox-close]').addEventListener('click', function () { dialog.close(); });
    dialog.querySelector('[data-lightbox-prev]').addEventListener('click', function () { show(current - 1); });
    dialog.querySelector('[data-lightbox-next]').addEventListener('click', function () { show(current + 1); });
    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
    dialog.addEventListener('click', function (e) { if (e.target === dialog || e.target.classList.contains('lightbox__inner')) dialog.close(); });
    dialog.addEventListener('close', function () {
      document.body.classList.remove('has-lightbox');
      if (lastFocus) lastFocus.focus();
    });
  }

  /* ---------- inquiry form (Netlify) ---------- */
  var form = document.querySelector('[data-form]');
  if (form) {
    var success = document.querySelector('[data-success]');
    var statusEl = form.querySelector('[data-status]');
    var submit = form.querySelector('[data-submit]');
    var dateInput = form.querySelector('#f-date');
    if (dateInput) {
      var t = new Date();
      dateInput.min = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
    }
    function setError(field, msg) {
      var err = document.getElementById(field.id + '-err');
      if (msg) field.setAttribute('aria-invalid', 'true'); else field.removeAttribute('aria-invalid');
      if (err) err.textContent = msg || '';
      return !msg;
    }
    function validate(field) {
      var v = (field.value || '').trim();
      if (field.id === 'f-name') return setError(field, v ? '' : 'Please enter your name.');
      if (field.id === 'f-phone') {
        var digits = v.replace(/\D/g, '');
        return setError(field, !v ? 'Please enter a mobile number so Latifah can text you.' : (digits.length < 10 ? 'Please enter a 10-digit phone number.' : ''));
      }
      if (field.id === 'f-style') return setError(field, v ? '' : 'Please choose a style, or pick "Something else".');
      if (field.id === 'f-date' && v) {
        var d = new Date(v + 'T12:00:00');
        if (d.getDay() === 0) return setError(field, 'Latifah is off on Sundays. Please pick Monday to Saturday.');
        if (field.min && v < field.min) return setError(field, 'Please choose a date from today onward.');
        return setError(field, '');
      }
      if (field.id === 'f-photo' && field.files && field.files[0]) {
        var f = field.files[0];
        if (!/^image\//.test(f.type)) return setError(field, 'Please attach an image file.');
        if (f.size > 8 * 1024 * 1024) return setError(field, 'That image is over 8 MB. Please choose a smaller one.');
        return setError(field, '');
      }
      if (field.id === 'f-date' || field.id === 'f-photo') return setError(field, '');
      return true;
    }
    var fields = form.querySelectorAll('#f-name, #f-phone, #f-style, #f-date, #f-photo');
    Array.prototype.forEach.call(fields, function (f) {
      f.addEventListener('blur', function () { if (f.value) validate(f); });
      f.addEventListener('change', function () { validate(f); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      statusEl.textContent = '';
      var ok = true, firstBad = null;
      Array.prototype.forEach.call(fields, function (f) { if (!validate(f)) { ok = false; if (!firstBad) firstBad = f; } });
      if (!ok) { firstBad.focus(); statusEl.textContent = 'Please fix the highlighted fields.'; return; }
      submit.disabled = true;
      submit.querySelector('span').textContent = 'Sending...';
      fetch('/', { method: 'POST', body: new FormData(form) })
        .then(function (res) {
          if (!res.ok) throw new Error('Network');
          form.hidden = true;
          success.hidden = false;
          success.focus();
        })
        .catch(function () {
          statusEl.textContent = 'Sorry, the form could not be sent right now. Please text (804) 664-8199 instead.';
        })
        .then(function () {
          submit.disabled = false;
          submit.querySelector('span').textContent = 'Send inquiry';
        });
    });
    if (/[?&]sent=1/.test(window.location.search)) { form.hidden = true; success.hidden = false; }
  }
})();
