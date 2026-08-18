'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { openBrowser } = require('./open-browser');
const { acquireLock, writeLock, releaseLock } = require('./lock');
const { version, author } = require('../package.json');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

function resolveFile(filePath) {
  let decoded;
  try {
    decoded = decodeURIComponent(filePath);
  } catch {
    return null;
  }
  if (decoded.includes('\0')) return null;

  let resolved = path.normalize(path.join(PUBLIC_DIR, decoded));
  const rel = path.relative(PUBLIC_DIR, resolved);
  if (rel.startsWith('..') || path.isAbsolute(rel)) return null;

  if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
    resolved = path.join(resolved, 'index.html');
  }
  return resolved;
}

function serveFile(req, res) {
  const filePath = resolveFile(req.url.split('?')[0] || '/');

  if (!filePath) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    res.end(data);
  });
}

function startServer({ port = 3000, host = '127.0.0.1', open = true } = {}) {
  const server = http.createServer(serveFile);

  return new Promise((resolve, reject) => {
    const lock = acquireLock();
    if (!lock.ok) {
      resolve({
        alreadyRunning: true,
        url: lock.url || `http://${host}:${port}/`,
      });
      return;
    }

    server.on('error', reject);

    server.listen(port, host, () => {
      const url = `http://${host}:${port}/`;
      writeLock(port, url);

      process.on('exit', releaseLock);
      process.on('SIGINT', () => {
        releaseLock();
        process.exit(0);
      });
      process.on('SIGTERM', () => {
        releaseLock();
        process.exit(0);
      });

      console.log('');
      console.log(`  gpt-image-maker v${version} by ${author}`);
      console.log('  AI Image Generator is running!');
      console.log(`  -> ${url}`);
      console.log('  Press Ctrl+C to stop.');
      console.log('');
      if (open) openBrowser(url);
      resolve({ server, url });
    });
  });
}

module.exports = { startServer, PUBLIC_DIR };