(() => {
  const $ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  if (!location.hash && 'scrollRestoration' in history) { history.scrollRestoration = 'manual'; scrollTo(0, 0); }

  /* Smooth scroll (Lenis, intensity ~12 in original) */
  let lenis = null;
  if (window.Lenis && matchMedia('(pointer:fine)').matches) {
    lenis = new Lenis({ lerp: 0.14, smoothWheel: true });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  /* Split text */
  $('.words').forEach(el => {
    const d = parseFloat(el.dataset.delay || 0);
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w, i) =>
      `<span class="word"><span class="w" style="transition-delay:${(d + i * 0.04).toFixed(2)}s">${w}</span></span>`).join(' ');
  });
  $('.chars').forEach(el => {
    const html = el.innerHTML.split(/<br\s*\/?>/i);
    let i = 0;
    el.innerHTML = html.map(line =>
      line.trim().split(/\s+/).map(w =>
        `<span class="word">${[...w].map(ch => `<span class="c" style="transition-delay:${(i++ * 0.04).toFixed(2)}s">${ch}</span>`).join('')}</span>`
      ).join(' ')).join('<br>');
  });

  /* Scroll-colored statement */
  const st = document.getElementById('statement');
  let letters = [];
  if (st) {
    const words = st.textContent.trim().split(/\s+/);
    st.innerHTML = words.map(w => `<span class="word">${[...w].map(c => `<span class="c2">${c}</span>`).join('')}</span>`).join(' ');
    letters = $('.c2', st);
  }

  /* Reveal on view */
  const reveal = el => { if (el.classList.contains('in')) return; el.classList.add('in'); io.unobserve(el); startCounters(el); };
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) reveal(e.target); }),
    { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });
  // pending list: lets a fast scroll / anchor jump reveal elements it skipped past (IntersectionObserver alone misses them)
  const pend = $('.reveal,.words,.chars').filter(el => !el.matches('[data-rot]')).map(el => ({ el, top: 0, h: 0 }));
  pend.forEach(p => io.observe(p.el));
  $('[data-x]').forEach(el => el.style.setProperty('--x', el.dataset.x + 'px'));

  /* Load-in (hero) */
  window.addEventListener('load', () => {
    $('.reveal-load').forEach(el => el.classList.add('in'));
    $('.words').forEach(el => el.classList.add('in'));
    $('.hcard .shutter').forEach((s, i) => setTimeout(() => s.classList.add('in'), 1000 + i * 180));
  });

  /* Counters */
  function countUp(el) {
    const end = parseFloat(el.dataset.count), suf = el.dataset.suffix || '';
    const t0 = performance.now(), dur = 1400;
    const tick = t => {
      const p = clamp((t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  function startCounters(root) {
    $('[data-count]', root).forEach(el => { if (!el.dataset.done) { el.dataset.done = 1; countUp(el); } });
  }
  $('[data-count]').forEach(el => {
    new IntersectionObserver((es, o) => es.forEach(e => {
      if (e.isIntersecting && !el.dataset.done) { el.dataset.done = 1; countUp(el); o.disconnect(); }
    }), { threshold: 0.6 }).observe(el);
  });

  /* Scroll-linked effects (cached geometry, one rAF per frame, no layout reads while scrolling) */
  const nav = document.getElementById('nav');
  const items = [
    ...$('[data-scroll-rise]').map(el => ({ el, kind: 'rise', host: el })),
    ...$('[data-sy]').map(el => ({ el, kind: 'y', host: el.parentElement, y: parseFloat(el.dataset.sy), op: el.dataset.sop ? parseFloat(el.dataset.sop) : 1 })),
    ...$('[data-zoom]').map(el => ({ el, kind: 'zoom', host: el.parentElement, from: parseFloat(el.dataset.zoom) || 0.92 }))
  ];
  /* 3D character flip, scrubbed by scroll (Framer: textEffect onScrollTarget, rotateY 90deg -> 0) */
  const rots = $('.chars[data-rot]').map(el => ({ el, cs: $('.c', el) }));
  rots.forEach(r => { io.unobserve(r.el); r.el.classList.add('in'); r.cs.forEach(c => c.style.transition = 'none'); });
  const navProg = document.getElementById('navProgress');
  let docMax = 1, navAcc = 0, vh = innerHeight, lastY = scrollY, ticking = false, lastN = -1, stTop = 0, stH = 1;
  function measure() {
    vh = innerHeight;
    docMax = document.documentElement.scrollHeight - vh;
    const sy = scrollY;
    rots.forEach(r => { const b = r.el.getBoundingClientRect(); r.top = b.top + sy; r.h = b.height; });
    for (let i = pend.length - 1; i >= 0; i--) {
      const p = pend[i];
      if (p.el.classList.contains('in')) { pend.splice(i, 1); continue; }
      const b = p.el.getBoundingClientRect(); p.top = b.top + sy - (parseFloat(p.el.dataset.dy) || 0); p.h = b.height;
    }
    items.forEach(it => { const r = it.host.getBoundingClientRect(); it.top = r.top + sy; it.h = r.height; });
    if (st) { const r = st.getBoundingClientRect(); stTop = r.top + sy; stH = r.height; }
    update();
  }
  function update() {
    ticking = false;
    const y = scrollY;
    // navbar: hide on scroll down, show on scroll up. Accumulate movement so smooth-scroll easing
    // jitter / tiny reversals can't make it flicker; always visible near the top and while the menu is open.
    const dy = y - lastY; lastY = y;
    if (nav) {
      nav.classList.toggle('is-stuck', y > 16);
      if (navProg) navProg.style.transform = 'scaleX(' + clamp(y / Math.max(1, docMax)).toFixed(4) + ')';
      if (y < 120 || nav.classList.contains('open')) { navAcc = 0; nav.classList.remove('is-hidden'); }
      else if (dy) {
        navAcc = Math.sign(dy) === Math.sign(navAcc) ? navAcc + dy : dy;
        if (navAcc > 14) nav.classList.add('is-hidden');
        else if (navAcc < -14) nav.classList.remove('is-hidden');
      }
    }
    for (let i = pend.length - 1; i >= 0; i--) {
      const p = pend[i];
      if (p.top + p.h < y + vh * 0.92) { reveal(p.el); pend.splice(i, 1); }
    }
    rots.forEach(r => {
      const top = r.top - y;
      if (top > vh || top + r.h < 0) return;
      const p = clamp((vh * 0.95 - top) / (vh * 0.45)), n = r.cs.length;
      if (p === r.p) return; r.p = p; // unchanged: skip all per-character style writes
      r.cs.forEach((c, i) => {
        const l = clamp((p * 1.5 - (i / n) * 0.5) / 1); // staggered per character
        c.style.opacity = l.toFixed(3);
        c.style.transform = l >= 1 ? 'none' : `perspective(600px) rotateY(${((1 - l) * 90).toFixed(1)}deg)`;
      });
    });
    items.forEach(it => {
      const top = it.top - y;
      if (top > vh * 1.2 || top + it.h < -vh * 0.2) return; // off-screen: skip
      if (it.kind === 'rise') it.el.style.setProperty('--rise', (1 - clamp((vh - top) / (vh * 0.7))).toFixed(3));
      else if (it.kind === 'y') { const q = clamp((vh - top) / Math.min(vh * 0.6, it.h * 0.9)); it.el.style.transform = `translateY(${((1 - q) * it.y).toFixed(1)}px)`; if (it.op < 1) it.el.style.opacity = (it.op + (1 - it.op) * q).toFixed(3); }
      else it.el.style.transform = `scale(${(it.from + (1 - it.from) * clamp((vh - top) / (vh * 0.9))).toFixed(4)})`;
    });
    if (letters.length) {
      const p = clamp((vh * 0.85 - (stTop - y)) / (stH + vh * 0.35));
      const n = Math.round(p * letters.length);
      if (n !== lastN) {
        if (n > lastN) for (let i = Math.max(lastN, 0); i < n; i++) letters[i].classList.add('on');
        else for (let i = n; i < lastN; i++) letters[i].classList.remove('on');
        lastN = n;
      }
    }
  }
  const schedule = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', schedule, { passive: true });
  // re-measure whenever layout can change: resize, load, webfonts ready, lazy images, accordion height changes
  let mq = 0;
  const remeasure = () => { cancelAnimationFrame(mq); mq = requestAnimationFrame(measure); };
  addEventListener('resize', remeasure);
  addEventListener('load', remeasure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
  if ('ResizeObserver' in window) new ResizeObserver(remeasure).observe(document.body);
  measure();

  /* Expert tabs */
  const vets = $('.vet');
  vets.forEach(v => {
    const open = () => vets.forEach(o => o.classList.toggle('is-open', o === v));
    v.addEventListener('mouseenter', () => matchMedia('(hover:hover)').matches && open());
    v.addEventListener('click', open);
  });

  /* Navbar: mobile full-screen menu, services mega-menu, accordion */
  const burger = document.getElementById('burger');
  const mm = document.getElementById('mobileMenu');
  const setMenu = open => {
    if (!nav || !mm) return;
    nav.classList.toggle('open', open);
    mm.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mm.setAttribute('aria-hidden', !open);
    document.documentElement.classList.toggle('menu-open', open);
    if (lenis) open ? lenis.stop() : lenis.start();
    if (open) nav.classList.remove('is-hidden');
  };
  burger && burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  mm && $('a', mm).forEach(a => a.addEventListener('click', () => setMenu(false)));
  $('.mm__acc-t').forEach(t => t.addEventListener('click', () => {
    const acc = t.parentElement, o = acc.classList.toggle('open');
    t.setAttribute('aria-expanded', o);
  }));
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    setMenu(false);
    $('.nav__dd').forEach(d => { d.classList.remove('open'); d.querySelector('.nav__dd-t').setAttribute('aria-expanded', 'false'); });
    if (document.activeElement && document.activeElement.closest('.nav__dd')) document.activeElement.blur();
  });
  matchMedia('(min-width:960px)').addEventListener('change', e => e.matches && setMenu(false));
  // desktop dropdown: keep aria-expanded in sync with hover / keyboard focus
  $('.nav__dd').forEach(d => {
    const t = d.querySelector('.nav__dd-t');
    const sync = () => t.setAttribute('aria-expanded', d.matches(':hover, :focus-within'));
    d.addEventListener('mouseenter', sync); d.addEventListener('mouseleave', sync);
    d.addEventListener('focusin', sync); d.addEventListener('focusout', () => setTimeout(sync, 0));
  });

  $('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const t = id.length > 1 && document.querySelector(id);
    setMenu(false);
    if (id === '#top' || t) {
      e.preventDefault();
      const target = id === '#top' ? 0 : t;
      lenis ? lenis.scrollTo(target, { offset: -60 }) : (id === '#top' ? scrollTo({ top: 0, behavior: 'smooth' }) : t.scrollIntoView({ behavior: 'smooth' }));
    }
  }));

  /* Form */
  const form = document.getElementById('form');
  form && form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const b = form.querySelector('.form__submit');
    b.textContent = 'Thank you — we’ll be in touch!';
    form.classList.add('sent');
    form.reset();
  });

  /* FAQ accordion */
  $('.faq__q').forEach(q => q.addEventListener('click', () => {
    const f = q.parentElement, o = f.classList.toggle('open');
    q.setAttribute('aria-expanded', o);
    setTimeout(measure, 650); // page height changed: refresh cached scroll geometry
  }));
})();
