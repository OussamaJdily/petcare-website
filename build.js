// Static site generator: node build.js  ->  writes every page into ./site
const fs = require('fs'), path = require('path');
const { ICONS, SERVICES, POSTS, POST_BODY_A, POST_BODY_B, FAQS, PLANS } = require('./data');
const VER = Date.now().toString(36);
const OUT = path.join(__dirname, 'site');
const SRC_HOME = path.join(__dirname, 'home.src.html');
if (!fs.existsSync(SRC_HOME)) fs.copyFileSync(path.join(OUT, 'index.html'), SRC_HOME);
// swap the hand-drawn icons in the original home markup for the pro icon set
const fixIcons = h => {
  let n = 0;
  h = h.replace(/<span class="scard__ico"><svg[\s\S]*?<\/svg><\/span>/g, () => '<span class="scard__ico">' + ICONS[SERVICES[n++].icon] + '</span>');
  const ci = ['mail', 'phone', 'pin']; let m = 0;
  h = h.replace(/<svg viewBox="0 0 42 42">[\s\S]*?<\/svg>/g, () => '<span class="cico">' + ICONS[ci[m++]] + '</span>');
  return h;
};
const home = fixIcons(fs.readFileSync(SRC_HOME, 'utf8'));
const cut = (a, b) => { const i = home.indexOf(a), j = home.indexOf(b, i + a.length); return home.slice(i, j); };

const HERO_BG = '/img/HOI29Pz9JE7Wrv1OZfKp8ZDKw.webp';
const SCAL = '/img/UYnnfvGP1eET9UkCRWEY2E2dNk.webp';
const I = (id, w) => `/img/${id}.webp`;
const esc = s => s.replace(/&/g, '&amp;');

const LOGO_D = fs.readFileSync(path.join(__dirname, 'brand', 'logo-mark.svg'), 'utf8').match(/ d="([^"]+)"/)[1];
const SYMBOLS = `<svg width="0" height="0" style="position:absolute"><defs>
<symbol id="logo-mark" viewBox="0 0 626 688"><path fill="currentColor" fill-rule="evenodd" d="${LOGO_D}"/></symbol>
<symbol id="paw" viewBox="0 0 19 16"><path fill="currentColor" d="M16.3 3.79a2.27 2.27 0 1 0 0 4.42 2.27 2.27 0 0 0 0-4.42Zm0 3.16a.95.95 0 1 1 0-1.9.95.95 0 0 1 0 1.9ZM4.97 6A2.27 2.27 0 1 0 .43 6a2.27 2.27 0 0 0 4.54 0Zm-1.3 0a.95.95 0 1 1-1.9 0 .95.95 0 0 1 1.9 0Zm3.9-1.9a2.27 2.27 0 1 0 0-4.55 2.27 2.27 0 0 0 0 4.55Zm0-3.2a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9Zm4.4 3.2a2.27 2.27 0 1 0 0-4.55 2.27 2.27 0 0 0 0 4.55Zm0-3.2a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9ZM9.5 7.4c-1.9 0-5 2.7-5 5 0 1.9 1.4 3.1 2.8 3.1.9 0 1.4-.4 2.2-.4s1.3.4 2.2.4c1.4 0 2.8-1.2 2.8-3.1 0-2.3-3.1-5-5-5Zm3.7 5c0 1.2-.9 1.8-1.5 1.8-.5 0-1-.4-2.2-.4s-1.7.4-2.2.4c-.6 0-1.5-.6-1.5-1.8 0-1.5 2.3-3.7 3.7-3.7s3.7 2.2 3.7 3.7Z"/></symbol>
<symbol id="arrow" viewBox="0 0 14 12"><path d="M12.69 6H.87M7.88 11.14S13.13 7.36 13.13 6 7.88.86 7.88.86" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
</defs></svg>`;

const head = (title, desc) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#016d6f">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="preconnect" href="https://api.fontshare.com">
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=pally@500,700&display=swap">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/style.css?v=${VER}">
<link rel="stylesheet" href="/pages.css?v=${VER}">
<link rel="stylesheet" href="/nav.css?v=${VER}">
</head>
<body>
${SYMBOLS}
`;

const NAV_LINKS = [['About', '/about'], ['Services', '/services'], ['Pricing', '/pricing'], ['Blog', '/blog'], ['Contact', '/contact']];
const CHEV = '<svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const nav = (active) => {
  const cur = h => (active === h ? ' aria-current="page"' : '');
  const mega = SERVICES.map(s => `<a class="mega__i" role="menuitem" href="/services/${s.slug}"><span class="mega__ico" data-tone="${s.tone}">${ICONS[s.icon]}</span><span class="mega__t"><b>${s.title}</b><em>${s.price} · ${s.dur}</em></span></a>`).join('');
  const msub = SERVICES.map(s => `<a href="/services/${s.slug}"><span data-tone="${s.tone}">${ICONS[s.icon]}</span>${s.title}</a>`).join('');
  const mlink = (t, h, i) => `<a class="mm__link${active === h ? ' is-active' : ''}" style="--i:${i}" href="${h}"${cur(h)}><span>${t}</span><svg><use href="#arrow"/></svg></a>`;
  return `<!-- NAVBAR -->
<header class="nav" id="nav">
  <div class="nav__bar">
    <a class="logo" href="/" aria-label="PetCare+ home"><span class="logo__mark"><svg viewBox="0 0 626 688" aria-hidden="true"><use href="#logo-mark"/></svg></span><span class="logo__t">PetCare+</span></a>
    <nav class="nav__links" id="navLinks" aria-label="Main">
      <a href="/about"${cur('/about')}>About</a>
      <div class="nav__dd">
        <a href="/services" class="nav__dd-t" aria-haspopup="true" aria-expanded="false"${cur('/services')}>Services${CHEV}</a>
        <div class="mega" role="menu" aria-label="Services">
          <div class="mega__grid">${mega}</div>
          <a class="mega__all" href="/services"><span>See all services</span><svg><use href="#arrow"/></svg></a>
        </div>
      </div>
      <a href="/pricing"${cur('/pricing')}>Pricing</a>
      <a href="/blog"${cur('/blog')}>Blog</a>
      <a href="/contact"${cur('/contact')}>Contact</a>
    </nav>
    <a class="btn btn--light nav__cta" href="/contact"><span class="btn__label">Book a Visit</span><span class="btn__icon"><svg><use href="#paw"/></svg></span></a>
    <button class="nav__burger" id="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu"><span></span><span></span></button>
  </div>
  <i class="nav__progress" id="navProgress" aria-hidden="true"></i>
</header>
<div class="mm" id="mobileMenu" aria-hidden="true">
  <nav class="mm__in" aria-label="Mobile">
    ${mlink('About', '/about', 1)}
    <div class="mm__acc" style="--i:2">
      <button class="mm__link mm__acc-t" type="button" aria-expanded="false"><span>Services</span>${CHEV}</button>
      <div class="mm__sub"><div>${msub}<a class="mm__all" href="/services">All services →</a></div></div>
    </div>
    ${mlink('Pricing', '/pricing', 3)}
    ${mlink('Blog', '/blog', 4)}
    ${mlink('Contact', '/contact', 5)}
    <div class="mm__foot" style="--i:6">
      <a class="btn btn--light" href="/contact"><span class="btn__label">Book a Visit</span><span class="btn__icon"><svg><use href="#paw"/></svg></span></a>
      <div class="mm__info">
        <a href="tel:+212522004802">${ICONS.phone}+212 522 00 48 02</a>
        <a href="mailto:hello@petcareplus.ma">${ICONS.mail}hello@petcareplus.ma</a>
        <span>${ICONS.clock}Mon–Sat, 9am–7pm</span>
      </div>
    </div>
  </nav>
</div>
`;
};

const btn = (label, href, kind = 'primary', icon = 'paw', extra = '') =>
  `<a class="btn btn--${kind}"${extra} href="${href}"><span class="btn__label">${label}</span><span class="btn__icon">${icon === 'paw' ? '<svg><use href="#paw"/></svg>' : ICONS[icon]}</span></a>`;

const cta = `<!-- CTA -->
<section class="cta">
  <div class="cta__box">
    <div class="cta__text">
      <h2 class="h3 reveal">Ready to give your pet <span class="cta__em">the care they deserve?</span></h2>
      <p class="large reveal" style="--d:.1s">Every wag, purr, and playful moment starts with expert veterinary care. Let’s keep them healthy, happy and loved.</p>
      <svg class="cta__squig" width="42" height="39" viewBox="0 0 42 39" fill="none"><g stroke="#041011" stroke-width="3" stroke-linecap="round"><path d="M40 2 39.96 16"/><path d="M17.15 11.88 28 22.23"/><path d="M1.85 33 16.28 37.12"/></g></svg>
      ${btn('Book a Visit', '/contact', 'primary', 'paw', ' style="--d:.2s"').replace('class="btn', 'class="reveal btn')}
    </div>
    <div class="cta__img"><img data-sy="120" loading="lazy" decoding="async" src="/img/CfpYr2QHq8cJk4LbYITouJak79U.webp" alt="Happy golden retriever"></div>
  </div>
</section>
`;

const footer = `<!-- FOOTER -->
<footer class="footer">
  <div class="footer__scal" style="background-image:url(${SCAL})"></div>
  <div class="footer__inner">
    <div class="footer__top">
      <div class="footer__brand"><a class="flogo" href="/" aria-label="PetCare+ home"><span class="logo__mark"><svg viewBox="0 0 626 688" aria-hidden="true"><use href="#logo-mark"/></svg></span><span class="logo__t">PetCare+</span></a>
      <p>PetCare+ is a modern veterinary clinic in Casablanca offering preventive, surgical and everyday care, with the warmth every pet deserves.</p></div>
      <nav>${NAV_LINKS.map(([t, h]) => `<a href="${h}">${t}</a>`).join('')}</nav>
    </div>
    <div class="footer__word" aria-hidden="true"><span data-sy="160" data-sop=".2">PetCare+</span></div>
    <div class="footer__legal"><span>© 2026 PetCare+. All rights reserved.</span><nav><a href="/privacy">Privacy Policy</a><a href="/terms">Terms &amp; Conditions</a></nav></div>
  </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
<script src="/main.js?v=${VER}"></script>
</body>
</html>
`;

const page = ({ title, desc, active, body, withCta = true }) =>
  head(title, desc) + nav(active) + '\n<main id="top">\n' + body + (withCta ? '\n' + cta : '') + '\n</main>\n\n' + footer;

const write = (file, html) => { const f = path.join(OUT, file); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };

/* ---------- shared blocks ---------- */
const phero = (title, sub, extra = '', cls = '') => `<section class="phero ${cls}">
  <div class="phero__bg" style="background-image:url(${HERO_BG})"></div>
  <div class="phero__in">
    <h1 class="h1 words" data-delay=".2">${title}</h1>
    <p class="lead words" data-delay=".35">${sub}</p>
    ${extra}
  </div>
</section>`;

const faq = (items, delay = 0) => items.map((f, i) => `<div class="faq reveal" style="--d:${(i * 0.06 + delay).toFixed(2)}s"><button class="faq__q" aria-expanded="false"><span>${f[0]}</span><i class="faq__plus"></i></button><div class="faq__a"><div><p>${f[1]}</p></div></div></div>`).join('\n');

const scard = (s, i) => `<a class="scard reveal" href="/services/${s.slug}" style="--d:${(i * 0.1).toFixed(1)}s" data-tone="${s.tone}">
  <img src="${I(s.img)}" alt="${s.title}" loading="lazy" decoding="async"><i class="shutter shutter--white"></i>
  <span class="scard__ico">${ICONS[s.icon]}</span>
  <span class="scard__text"><span><b>${s.title}</b><em>${s.summary}</em></span><span class="scard__go"><svg><use href="#arrow"/></svg><svg><use href="#arrow"/></svg></span></span>
</a>`;

const bcard = (p, i) => `<a class="bcard reveal" href="/blog/${p.s}" style="--d:${((i % 3) * 0.1).toFixed(1)}s">
  <div class="bcard__img"><img src="${I(p.i)}" alt="${esc(p.t)}" loading="lazy" decoding="async"><i class="shutter shutter--soft"></i></div>
  <div class="bcard__body"><span class="chip">${p.d}</span><h3>${p.t}</h3></div>
</a>`;

const secHead = (eyebrow, title, extra = '') => `<div class="sec-head">
  <div><span class="eyebrow eyebrow--primary reveal">${eyebrow}</span><h2 class="h2s chars" data-rot>${title}</h2></div>${extra}
</div>`;

/* ---------- HOME ---------- */
{
  let h = home.replace(/<svg width="0" height="0"[\s\S]*?<\/svg>\s*/, '');
  h = h.replace(/^[\s\S]*?<body>/, head('PetCare+ — Veterinary Clinic in Casablanca', 'Exceptional care starts here. Compassionate veterinary care for every pet in Casablanca, Morocco.').replace(/\n$/, ''));
  // swap the hand-written nav/cta/footer for the shared ones
  const a = h.indexOf('<!-- NAVBAR -->'), b = h.indexOf('<main id="top">');
  h = h.slice(0, a) + nav('/') + '\n' + h.slice(b);
  const c = h.indexOf('<!-- CTA -->'), d = h.indexOf('</main>');
  h = h.slice(0, c) + cta + '\n' + h.slice(d);
  const e = h.indexOf('<!-- FOOTER -->');
  h = h.slice(0, e) + footer;
  // local-business structured data for search engines (Casablanca clinic)
  h = h.replace('</head>', '<script type="application/ld+json">' + JSON.stringify({
    '@context': 'https://schema.org', '@type': 'VeterinaryCare', name: 'PetCare+', telephone: '+212522004802', email: 'hello@petcareplus.ma',
    address: { '@type': 'PostalAddress', streetAddress: 'Boulevard d’Anfa, Racine', addressLocality: 'Casablanca', postalCode: '20100', addressCountry: 'MA' },
    openingHours: ['Mo-Fr 09:00-19:00', 'Sa 09:00-17:00'], priceRange: 'MAD'
  }) + '</script>\n</head>');
  h = h.replace(/src="img\//g, 'src="/img/').replace(/url\(img\//g, 'url(/img/');
  h = h.replace(/href="#contact"/g, 'href="/contact"');
  let n = 0;
  h = h.replace(/<a class="scard reveal" href="\/contact"/g, () => `<a class="scard reveal" href="/services/${SERVICES[n++].slug}"`);
  h = h.replace('href="#services"><span class="btn__label">Explore all services', 'href="/services"><span class="btn__label">Explore all services');
  h = h.replace(/href="#(team|about)"><span class="btn__label">/g, 'href="/about"><span class="btn__label">');
  write('index.html', h);
}

/* ---------- ABOUT ---------- */
{
  const safe = cut('<!-- SAFE HANDS -->', '<!-- SERVICES -->').replace(/src="img\//g, 'src="/img/').replace('data-count="98"', 'data-count="32"').replace(' id="about"', '');
  let contact = cut('<!-- CONTACT -->', '<!-- CTA -->').replace(/src="img\//g, 'src="/img/').replace(/url\(img\//g, 'url(/img/').replace(' id="contact"', '');
  const stat = (n, suf, label) => `<div class="astat"><b><span data-count="${n}" data-suffix="${suf}">0${suf}</span></b><span>${label}</span></div>`;
  const hero = phero('Good care makes happier pets.', 'We combine experienced veterinary care with genuine compassion to help pets live healthier, happier lives and give their families peace of mind.', `
    <div class="agrid reveal-load" style="--d:.7s;--y:48px;--dur:1s">
      <div class="agrid__col"><div class="aimg aimg--fill"><img src="${I('uevDDQGEqF2coGCnOFtYSMkF9Q')}" alt="Veterinarian with dogs and a cat"><i class="shutter" style="--sd:1.5s"></i></div></div>
      <div class="agrid__col">${stat(15, 'K+', 'Pet families cared for')}<div class="aimg aimg--fill"><img src="${I('8vpD8xcPUsRFoiLfxFLQ2450')}" alt="Golden retriever with a healthy diet bowl"><i class="shutter" style="--sd:1.7s"></i></div></div>
      <div class="agrid__col"><div class="aimg aimg--fill"><img src="${I('LKXR0nv6YOQT43eq0j7jrK00HU')}" alt="Veterinarian greeting a dog"><i class="shutter" style="--sd:1.9s"></i></div>${stat(12, '+', 'Years of compassionate care')}</div>
    </div>`, 'phero--about');
  const vals = [['heart', 'Compassion first', 'Every pet is handled with patience, gentleness and respect.'], ['shield', 'Clinical excellence', 'Modern diagnostics and ongoing training across our whole team.'], ['check', 'Honest guidance', 'Clear options, transparent pricing and no unnecessary treatments.']];
  const vision = `<section class="vision"><div class="vision__in">
    <div class="vision__img reveal" data-x="-48"><img loading="lazy" decoding="async" src="${I('9E3gFLn4EUM9arDjS0qk26BW64')}" alt="Veterinarian sharing a joyful moment with a dog"><i class="shutter shutter--white"></i></div>
    <div class="vision__text reveal" data-x="48">
      <span class="eyebrow eyebrow--primary">Our Vision</span>
      <h2 class="h2s">Making Pet Care Better.</h2>
      <p class="large">PetCare+ brings together experienced professionals, compassionate care, and modern veterinary services to make every visit feel easier—for pets and the people who love them.</p>
      <div class="vals">${vals.map(v => `<div class="val"><span class="val__ico">${ICONS[v[0]]}</span><div><b>${v[1]}</b><span>${v[2]}</span></div></div>`).join('')}</div>
    </div></div></section>`;
  const team = [['Dr. James Porter', 'Senior Veterinarian', 'd7L1jPhOwvsk17e3PGnsosupw'], ['Dr. Omar Rahman', 'Veterinary Dentist', 'IM2ntxXb6z8PIvMYTiLlkUCWVs'], ['Dr. Ethan Parker', 'Veterinarian', 'FZgW4E6mOMzf0IKKx6Ewm1CaeSA'], ['Dr. David Brooks', 'Veterinary Surgeon', 'p8bEkEfUvo7gvH4nddMdu7tIttM']];
  const teamSec = `<section class="team"><div class="team__in">
    <div class="center-head"><span class="eyebrow eyebrow--primary reveal">Inside PetCare+</span><h2 class="h2s chars" data-rot>Skilled hands.<br>Gentle hearts.</h2><p class="sub reveal" style="--d:.1s">Veterinarians, surgeons and nurses who bring deep expertise, patience and kindness to every appointment, from first puppy check to senior care.</p></div>
    <div class="tgrid">${team.map((t, i) => `<div class="tcard reveal" style="--d:${(i * 0.1).toFixed(1)}s"><img loading="lazy" decoding="async" src="${I(t[2])}" alt="${t[0]}"><i class="shutter shutter--white"></i><div class="tcard__bar"><div><b>${t[0]}</b><span>${t[1]}</span></div><svg><use href="#paw"/></svg></div></div>`).join('')}</div>
  </div></section>`;
  write('about.html', page({ title: 'About — PetCare+', desc: 'Good care makes happier pets. Meet the PetCare+ team.', active: '/about', body: [hero, safe, vision, teamSec, contact].join('\n') }));
}

/* ---------- SERVICES ---------- */
{
  const pills = `<div class="pills reveal-load" style="--d:.8s">${SERVICES.map(s => `<a class="pill" href="/services/${s.slug}">${ICONS[s.icon]}<span>${s.pill}</span></a>`).join('')}</div>`;
  const hero = phero('Complete care, under one roof.', 'From first puppy checkups to golden-years care, every service is delivered by vets who treat your pet like family.', pills);
  const list = `<section class="sec"><div class="sec__in sec__in--wide">
    <div class="sec-head"><div><span class="eyebrow eyebrow--primary reveal">Our services</span><h2 class="h2s chars" data-rot>Everything your pet needs, in one place</h2></div><p class="sec-head__p reveal" style="--d:.1s">Preventive, everyday and specialist care, coordinated by one team who knows your pet’s history.</p></div>
    <div class="grid">${SERVICES.map(scard).join('\n')}</div></div></section>`;
  const steps = [['Book online or call', 'Pick a time that suits you. Same-day slots are always held for urgent needs.'], ['Relaxed check-in', 'Separate quiet areas for cats and dogs, and no rushed, noisy waiting rooms.'], ['Unhurried care', 'Your vet explains every step and shares a clear, written care plan.'], ['Ongoing support', 'Follow-up calls, reminders and nurse chat whenever you need us.']];
  const process = `<section class="sec sec--soft"><div class="sec__in">
    <div class="center-head"><span class="eyebrow eyebrow--primary reveal">How it works</span><h2 class="h2s chars" data-rot>A calm visit, from<br>start to finish</h2></div>
    <div class="steps">${steps.map((s, i) => `<div class="step reveal" style="--d:${(i * 0.1).toFixed(1)}s"><span class="step__n">0${i + 1}</span><b>${s[0]}</b><p>${s[1]}</p></div>`).join('')}</div></div></section>`;
  const faqs = `<section class="sec"><div class="sec__in sec__in--faq">
    <div class="faq-intro"><span class="eyebrow eyebrow--primary reveal">FAQ</span><h2 class="h2s chars" data-rot>Questions,<br>answered.</h2><p class="sub reveal" style="--d:.1s">Can’t find what you’re looking for? Our team is always happy to help.</p>${btn('Contact us', '/contact', 'primary', 'paw', ' style="--d:.2s"').replace('class="btn', 'class="reveal btn')}</div>
    <div class="faq-list">${faq(FAQS.slice(0, 6))}</div></div></section>`;
  write('services.html', page({ title: 'Services — PetCare+', desc: 'Complete veterinary care under one roof in Casablanca.', active: '/services', body: [hero, list, process, faqs].join('\n') }));
}

/* ---------- SERVICE DETAIL ---------- */
SERVICES.forEach((s, idx) => {
  const others = SERVICES.filter(x => x !== s).slice(0, 3);
  const prose = s.body.map(([t, x]) => `<${t}>${x}</${t}>`).join('\n');
  const hero = `<section class="shero"><div class="shero__in">
    <div class="shero__text">
      <nav class="crumbs reveal-load" style="--d:.1s"><a href="/services">Services</a><i></i><span>${s.title}</span></nav>
      <span class="shero__ico reveal-load" style="--d:.2s">${ICONS[s.icon]}</span>
      <h1 class="h1 words" data-delay=".3">${s.title}</h1>
      <p class="lead words" data-delay=".45">${s.summary}</p>
      <div class="chips reveal-load" style="--d:.7s"><span class="tagc">${s.price}</span><span class="tagc">${ICONS.clock}${s.dur}</span></div>
      <div class="reveal-load" style="--d:.85s">${btn('Book this service', '/contact', 'light')}</div>
    </div>
    <div class="shero__img reveal-load" style="--d:.5s;--x:48px;--y:0px;--dur:1s"><img src="${I(s.hero)}" alt="${esc(s.heroAlt)}"><i class="shutter" style="--sd:1.2s"></i></div>
  </div></section>`;
  const body = `<section class="sbody"><div class="sbody__in">
    <article class="prose prose--svc reveal">${prose}</article>
    <aside class="glance reveal" style="--d:.15s">
      <span class="eyebrow eyebrow--primary">At a glance</span>
      <h3>Ready when you are.</h3>
      <dl><div><dt>Price</dt><dd>${s.price}</dd></div><div><dt>Duration</dt><dd>${s.dur}</dd></div><div><dt>Clinic</dt><dd>Casablanca, Maroc</dd></div></dl>
      ${btn('Book a Visit', '/contact', 'primary')}
      <p>Questions? Call <a href="tel:+212522004802">+212 522 00 48 02</a></p>
    </aside></div></section>`;
  const more = `<section class="sec sec--tight"><div class="sec__in sec__in--wide">
    ${secHead('More services', 'Care for every stage of life', `<div class="reveal" style="--d:.1s">${btn('All services', '/services', 'primary')}</div>`)}
    <div class="grid">${others.map(scard).join('\n')}</div></div></section>`;
  write(`services/${s.slug}.html`, page({ title: `${s.title} — PetCare+`, desc: s.summary, active: '/services', body: [hero, body, more].join('\n') }));
});

/* ---------- PRICING ---------- */
{
  const chips = `<div class="tchips reveal-load" style="--d:.8s">${['No contracts', 'Cancel anytime', 'Priority booking'].map(t => `<span>${ICONS.check}${t}</span>`).join('')}</div>`;
  const hero = phero('Simple plans for lifelong care.', 'Predictable monthly pricing for preventive care, with no long-term contracts. Members save up to 30% on routine visits.', chips);
  const plans = `<section class="sec"><div class="sec__in sec__in--wide">
    <div class="plans">${PLANS.map((p, i) => `<div class="plan${p.featured ? ' plan--feat' : ''} reveal" style="--d:${(i * 0.1).toFixed(1)}s">
      <div class="plan__top"><div class="plan__name"><b>${p.name}</b>${p.featured ? '<span class="badge2">Most popular</span>' : ''}</div><p>${p.desc}</p></div>
      <div class="plan__price"><b>${p.price}</b><span>MAD / month</span></div>
      ${btn('Choose ' + p.name, '/contact', p.featured ? 'light' : 'primary')}
      <hr><span class="eyebrow">What’s included</span>
      <ul>${p.items.map(x => `<li>${ICONS.check}${x}</li>`).join('')}</ul></div>`).join('')}</div>
    <p class="plans__note reveal">Prices in Moroccan dirhams (MAD), per pet. Add a second pet to any plan and save 15%.</p></div></section>`;
  const payg = `<section class="sec sec--soft"><div class="sec__in sec__in--faq">
    <div class="faq-intro"><span class="eyebrow eyebrow--primary reveal">Pay as you go</span><h2 class="h2s chars" data-rot>Prefer to<br>pay per visit?</h2><p class="sub reveal" style="--d:.1s">Transparent starting prices for every service. We’ll always confirm costs before any treatment begins.</p></div>
    <div class="prices reveal" style="--d:.1s">${SERVICES.map(s => `<a class="prow" href="/services/${s.slug}"><span class="prow__ico" data-tone="${s.tone}">${ICONS[s.icon]}</span><span class="prow__t"><b>${s.title}</b><em>${s.dur}</em></span><span class="prow__p">${s.price}</span><svg><use href="#arrow"/></svg></a>`).join('')}</div></div></section>`;
  const faqs = `<section class="sec"><div class="sec__in sec__in--narrow">
    <div class="center-head"><span class="eyebrow eyebrow--primary reveal">Plan questions</span><h2 class="h2s chars" data-rot>Everything you need to know</h2></div>
    <div class="faq-list">${faq(FAQS.filter(f => f[2] === 'plan'))}</div></div></section>`;
  write('pricing.html', page({ title: 'Pricing — PetCare+', desc: 'Simple plans for lifelong care.', active: '/pricing', body: [hero, plans, payg, faqs].join('\n') }));
}

/* ---------- BLOG ---------- */
{
  const hero = phero('Pet Care Journal', 'Expert advice, pet wellness tips, and guides to keep your furry friends happy and healthy.', '', 'phero--short');
  const body = `<section class="sec"><div class="sec__in sec__in--wide">
    <h2 class="h3s reveal">Latest articles</h2>
    <div class="grid">${POSTS.map(bcard).join('\n')}</div></div></section>`;
  write('blog.html', page({ title: 'Pet Care Journal — PetCare+', desc: 'Expert advice, pet wellness tips, and guides.', active: '/blog', body: [hero, body].join('\n') }));
}

/* ---------- BLOG DETAIL ---------- */
POSTS.forEach((p, idx) => {
  const more = [1, 2, 3].map(k => POSTS[(idx + k) % POSTS.length]);
  const hero = `<section class="phero phero--post"><div class="phero__bg" style="background-image:url(${HERO_BG})"></div><div class="phero__in">
    <span class="chip chip--w reveal-load" style="--d:.1s">${p.d}</span>
    <h1 class="h1 h1--post words" data-delay=".25">${p.t}</h1>
    <div class="post__cover reveal-load" style="--d:.6s;--y:40px;--dur:1s"><img src="${I(p.i)}" alt="${esc(p.t)}"><i class="shutter" style="--sd:1.3s"></i></div>
  </div></section>`;
  const art = `<section class="article"><div class="article__in">
    <div class="prose reveal">${POST_BODY_A}</div>
    <figure class="article__img reveal"><img loading="lazy" decoding="async" src="${I(p.i2)}" alt="${esc(p.alt)}"><i class="shutter shutter--white"></i></figure>
    <div class="prose reveal">${POST_BODY_B}</div></div></section>`;
  const next = `<section class="sec sec--soft"><div class="sec__in sec__in--wide">
    ${secHead('Keep reading', 'More from the blog', `<div class="reveal" style="--d:.1s">${btn('All articles', '/blog', 'primary')}</div>`)}
    <div class="grid">${more.map(bcard).join('\n')}</div></div></section>`;
  write(`blog/${p.s}.html`, page({ title: `${p.t} — PetCare+`, desc: p.t, active: '/blog', body: [hero, art, next].join('\n') }));
});

/* ---------- CONTACT ---------- */
{
  const hero = phero('Let’s talk about your pet.', 'Book a visit, ask a question or tell us how we can help. We usually reply within a few hours.', '', 'phero--short');
  const info = [['pin', 'Visit us', 'Boulevard d’Anfa, Racine', 'Casablanca 20100, Maroc'], ['phone', 'Call us', '+212 522 00 48 02', 'Mon–Sat, 9am–7pm'], ['mail', 'Email', 'hello@petcareplus.ma', 'We reply within 4 hours'], ['bell', 'Emergencies', 'Same-day urgent care', 'Call ahead so we’re ready']];
  const hours = [['Monday – Friday', '9:00am – 7:00pm'], ['Saturday', '9:00am – 5:00pm'], ['Sunday', 'Emergency line only']];
  const body = `<section class="sec sec--tight"><div class="sec__in sec__in--contact">
    <div class="cleft">
      <div class="cinfo">${info.map((c, i) => `<div class="icard reveal" style="--d:${(i * 0.08).toFixed(2)}s"><span class="icard__ico">${ICONS[c[0]]}</span><span class="eyebrow eyebrow--primary">${c[1]}</span><b>${c[2]}</b><em>${c[3]}</em></div>`).join('')}</div>
      <div class="cmap reveal" style="--d:.15s"><iframe title="PetCare+ location in Casablanca" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Boulevard+d%27Anfa+Casablanca+Maroc&output=embed"></iframe><a class="cmap__open" target="_blank" rel="noopener" href="https://maps.google.com/?q=Boulevard+d%27Anfa+Casablanca+Maroc">${ICONS.pin}Open in Google Maps</a></div>
      <div class="hours reveal" style="--d:.2s"><h3>${ICONS.clock}Opening hours</h3>${hours.map(h => `<div><span>${h[0]}</span><b>${h[1]}</b></div>`).join('')}</div>
    </div>
    <form class="form form--card reveal" style="--d:.15s" id="form" novalidate>
      <div><h3>Send us a message</h3><p>Tell us a little about your pet and we’ll get back to you shortly.</p></div>
      <div class="form__row"><label>First name*<input required name="first" placeholder="Jane"></label><label>Last name<input name="last" placeholder="Smith"></label></div>
      <div class="form__row"><label>Email*<input required type="email" name="email" placeholder="you@example.com"></label><label>Phone<input name="phone" placeholder="+1 (555) 000-0000"></label></div>
      <label>How can we help?<span class="sel"><select name="topic"><option>Wellness exam</option><option>Vaccination</option><option>Dental care</option><option>Grooming</option><option>Surgery</option><option>Pet boarding</option><option>Something else</option></select></span></label>
      <label>Message*<textarea required name="message" rows="4" placeholder="Tell us about your pet and how we can help"></textarea></label>
      <button class="form__submit" type="submit">Send message</button>
    </form></div></section>
  <section class="sec sec--soft"><div class="sec__in sec__in--narrow">
    <div class="center-head"><span class="eyebrow eyebrow--primary reveal">Before you visit</span><h2 class="h2s chars" data-rot>Good to know</h2></div>
    <div class="faq-list">${faq(FAQS.filter(f => f[2] === 'visit'))}</div></div></section>`;
  write('contact.html', page({ title: 'Contact — PetCare+', desc: 'Book a visit or ask a question.', active: '/contact', body: [hero, body].join('\n') }));
}

/* ---------- LEGAL ---------- */
const legal = (file, title, sub, intro, secs) => {
  const hero = phero(title, sub, '', 'phero--short');
  const body = `<section class="article article--legal"><div class="article__in"><div class="prose reveal">
    <span class="chip chip--p">Last updated September 30, 2026</span>
    <p>${intro}</p>
    ${secs.map(([h, t]) => `<h3>${h}</h3><p>${t}</p>`).join('\n')}
  </div></div></section>`;
  write(file, page({ title: `${title} — PetCare+`, desc: sub, body: [hero, body].join('\n') }));
};
legal('privacy.html', 'Privacy Policy', 'How PetCare+ collects, uses and protects your information and your pet’s records.',
  'At PetCare+ we take the privacy of you and your pets seriously. This policy explains what personal information we collect when you visit our clinic or use this website, why we collect it and the choices you have.', [
  ['Information we collect', 'When you book an appointment or contact us, we collect details such as your name, email address, phone number and postal address, together with information about your pet, including species, breed, age and medical history. When you browse our website we may collect anonymous usage data, such as pages visited and device type, to help us improve the experience.'],
  ['How we use your information', 'We use your information to provide veterinary care, manage appointments and reminders, process payments, respond to enquiries and meet our legal and professional obligations. We will only send you marketing messages if you have opted in, and you can unsubscribe at any time.'],
  ['Sharing your information', 'We never sell your personal information. We may share it with trusted partners who help us run our clinic, such as laboratories, referral hospitals, payment processors and pet insurers, only when necessary to care for your pet or process your request.'],
  ['How long we keep it', 'Clinical records are kept for as long as required by veterinary regulations. Other personal information is kept only for as long as it is needed for the purposes described in this policy.'],
  ['Your rights', 'You can ask to access, correct or delete the personal information we hold about you, or object to certain types of processing. To make a request, email hello@petcareplus.ma and we will respond within 30 days.'],
  ['Contact us', 'If you have any questions about this policy, contact PetCare+, Boulevard d’Anfa, Racine, Casablanca 20100, Maroc, or email hello@petcareplus.ma.']]);
legal('terms.html', 'Terms &amp; Conditions', 'The terms that apply when you use our website and book care for your pet at PetCare+.',
  'These terms apply to your use of the PetCare+ website and to the veterinary services we provide. By booking an appointment or using this website, you agree to these terms.', [
  ['Appointments &amp; cancellations', 'Please give at least 24 hours’ notice if you need to cancel or reschedule. Late cancellations or missed appointments may incur a fee. We always do our best to run on time, but emergencies can occasionally cause delays.'],
  ['Fees &amp; payment', 'Prices shown on this website are starting prices and may vary depending on your pet’s needs. We will always explain the expected costs before treatment begins. Payment is due at the time of service unless otherwise agreed.'],
  ['Wellness plans', 'Wellness plans are billed monthly and can be paused or cancelled at any time. Benefits are for the named pet only and cannot be transferred. Plan benefits reset each membership year.'],
  ['Medical advice', 'Articles and information on this website are for general guidance only and are not a substitute for a consultation with a veterinarian. If you are worried about your pet, please contact us or your nearest emergency clinic.'],
  ['Liability', 'We provide our services with reasonable skill and care. To the extent permitted by law, PetCare+ is not liable for indirect or consequential losses arising from the use of this website.'],
  ['Changes to these terms', 'We may update these terms from time to time. The latest version will always be published on this page, with the date it was last updated.']]);

/* ---------- 404 ---------- */
{
  const body = `<section class="nf"><div class="nf__bg" style="background-image:url(${HERO_BG})"></div><div class="nf__in">
    <div class="nf__art reveal-load" style="--d:.1s;--y:40px;--dur:1s">
      <img class="nf__dog" src="${I('noPWB7NcsXdlfswYwms5aYwgeA')}" alt="404 - a happy golden retriever">
    </div>
    <h1 class="h1 words" data-delay=".4">Looks like your pup wandered off.</h1>
    <p class="lead words" data-delay=".55">The page you’re looking for seems to have taken a little detour.</p>
    <div class="reveal-load" style="--d:1s">${btn('Take Me Home', '/', 'light', 'home')}</div>
  </div></section>`;
  write('404.html', page({ title: 'Page not found — PetCare+', desc: 'Page not found.', body, withCta: false }));
}

console.log('built pages:', fs.readdirSync(OUT).filter(f => f.endsWith('.html')).length, '+ services', SERVICES.length, '+ posts', POSTS.length);
