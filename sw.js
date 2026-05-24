const CACHE_NAME = 'studio-admin-cache-v2';
const assets = ['./', './index.html', './manifest.json', './logo.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets).catch(err => console.log("Aviso de cache inicial:", err));
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
