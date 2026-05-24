const CACHE_NAME = 'studio-admin-cache-v4';
const assets = ['./', './index.html', './manifest.json', './logo.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets).catch(err => console.log("Aviso de cache inicial:", err));
    })
  );
  self.skipWaiting(); // Força o novo código a entrar em ação imediatamente
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Limpa as versões velhas e travadas da memória
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
