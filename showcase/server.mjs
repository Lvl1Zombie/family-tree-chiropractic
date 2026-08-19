import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.webp':'image/webp', '.mp4':'video/mp4', '.png':'image/png', '.svg':'image/svg+xml' };

http.createServer(async (req, res) => {
  try {
    const clean = decodeURIComponent((req.url || '/').split('?')[0]);
    if (clean !== '/' && !path.extname(clean) && !clean.endsWith('/')) {
      res.writeHead(308, { Location: `${clean}/` });
      return res.end();
    }
    let file = path.join(root, clean.replace(/^\/+/, ''));
    if (!path.extname(file) || (await stat(file).catch(() => null))?.isDirectory()) file = path.join(file, 'index.html');
    if (!file.startsWith(root)) throw new Error('Invalid path');
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache', 'X-Content-Type-Options':'nosniff' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type':'text/plain; charset=utf-8' });
    res.end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`Codex Five / http://localhost:${port}`));
