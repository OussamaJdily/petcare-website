// Tiny static server with clean URLs (/about -> about.html, /services/x -> services/x.html) and a 404 page.
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, 'site');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
const find = p => {
  const tries = p.endsWith('/') ? [p + 'index.html'] : [p, p + '.html', p + '/index.html'];
  for (const t of tries) { const f = path.join(root, t); if (f.startsWith(root) && fs.existsSync(f) && fs.statSync(f).isFile()) return f; }
  return null;
};
http.createServer((q, r) => {
  const p = decodeURIComponent(q.url.split('?')[0]);
  const f = find(p);
  const file = f || path.join(root, '404.html');
  fs.readFile(file, (e, d) => {
    if (e) { r.writeHead(404); return r.end('Not found'); }
    const ext = path.extname(file);
    r.writeHead(f ? 200 : 404, { 'Content-Type': types[ext] || 'application/octet-stream', 'Cache-Control': ['.html','.css','.js'].includes(ext) ? 'no-cache' : 'public, max-age=3600' });
    r.end(d);
  });
}).listen(5178, () => console.log('PetCare+ running on http://localhost:5178'));
