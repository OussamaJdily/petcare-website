# PetCare+ website

Static multi-page site for a veterinary clinic (Home, About, Services + 6 service pages, Pricing, Blog + 9 articles, Contact, Privacy, Terms, 404).

- `site/` – the deployable output (HTML, CSS, JS, images)
- `build.js` + `data.js` + `home.src.html` – generator for the shared nav/footer and every page
- `icons/` – Phosphor icon SVGs inlined at build time
- `serve.js` – tiny local server with clean URLs

```bash
npm run build   # regenerate all pages into ./site
npm start       # http://localhost:5178
```
