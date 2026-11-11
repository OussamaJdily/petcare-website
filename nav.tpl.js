const CHEV = '<svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const nav = (active) => {
  const cur = h => (active === h ? ' aria-current="page"' : '');
  const mega = SERVICES.map(s => `<a class="mega__i" role="menuitem" href="/services/${s.slug}"><span class="mega__ico" data-tone="${s.tone}">${ICONS[s.icon]}</span><span class="mega__t"><b>${s.title}</b><em>${s.price} · ${s.dur}</em></span></a>`).join('');
  const msub = SERVICES.map(s => `<a href="/services/${s.slug}"><span data-tone="${s.tone}">${ICONS[s.icon]}</span>${s.title}</a>`).join('');
  const mlink = (t, h, i) => `<a class="mm__link${active === h ? ' is-active' : ''}" style="--i:${i}" href="${h}"${cur(h)}><span>${t}</span><svg><use href="#arrow"/></svg></a>`;
  return `<!-- NAVBAR -->
<header class="nav" id="nav">
  <div class="nav__bar">
    <a class="logo" href="/" aria-label="PetCare+ home"><svg class="logo__paw"><use href="#paw"/></svg><span>PetCare+</span></a>
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
        <a href="tel:+18005564802">${ICONS.phone}+1 (800) 556-4802</a>
        <a href="mailto:hello@petcareplus.com">${ICONS.mail}hello@petcareplus.com</a>
        <span>${ICONS.clock}Mon–Sat, 8am–7pm</span>
      </div>
    </div>
  </nav>
</div>
`;
};

