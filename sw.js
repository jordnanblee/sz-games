const CACHE_NAME = 'cache-v2';
const urlsToCache = [
 'https://jordnanblee.github.io/sz-games/index.html',
 'https://jordnanblee.github.io/sz-games/style.css',
 'https://jordnanblee.github.io/sz-gamesmanifest.json',
 'https://jordnanblee.github.io/sz-games/privacypolicy.html',
 'https://jordnanblee.github.io/sz-gamesicons/icon-48x48.png',
 'https://jordnanblee.github.io/sz-games/icons/icon-72x72.png',
 'https://jordnanblee.github.io/sz-games/icons/icon-96x96.png',
 'https://jordnanblee.github.io/sz-games/icons/icon-128x128.png',
 'https://jordnanblee.github.io/sz-games/icons/icon-144x144.png',
 'https://jordnanblee.github.io/sz-games/icons/icon-152x152.png',
 'https://jordnanblee.github.io/sz-games/icons/icon-192x192.png',
 'https://jordnanblee.github.io/sz-games/icons/icon-384x384.png',
 'https://jordnanblee.github.io/sz-games/icons/icon-512x512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => console.log('Cache successfully initialized'))
      .catch(error => console.log('Cache initialization failed:', error))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(error => console.log('Fetch error:', error))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});