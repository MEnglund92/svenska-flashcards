const CACHE = 'svenska-v15';
const FILES = ['.','index.html','data.js','data_deck.js','manifest.json','novels_reading.json','icons/icon-192.png','icons/icon-512.png'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if(e.request.url.includes('/tts?'))return e.respondWith(fetch(e.request));
  const u = e.request.url;
  const p = new URL(u).pathname;
  if (p.endsWith('/data_deck.js') || p.endsWith('/novels_reading.json')) {
    return e.respondWith(fetch(e.request).catch(() => caches.match(u)));
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (!resp || resp.status !== 200) return resp;
        const ct = resp.headers.get('content-type') || '';
        if (ct.startsWith('text/') || ct.startsWith('application/') || ct.startsWith('image/')) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
