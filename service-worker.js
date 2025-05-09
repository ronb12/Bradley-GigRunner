self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache =>
      cache.addAll([
        'index.html',
        'offline.html',  // Fallback page for offline use
        'manifest.json',
        'icons/icon-192.png',
        'icons/icon-512.png',
        'favicon.ico'
      ])
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== 'v1') return caches.delete(key);
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request).catch(() => caches.match('offline.html'))
    )
  );
});
