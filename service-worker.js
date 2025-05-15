self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        './',
        'index.html',
        'offline.html',
        'manifest.json',
        'icons/icon-192.png',
        'icons/icon-512.png',
        'favicon.ico'
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== 'v1') {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone response and store in cache
        const resClone = response.clone();
        caches.open('v1').then(cache => {
          cache.put(event.request, resClone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(res => {
          return res || caches.match('offline.html');
        });
      })
  );
});
