const CACHE_NAME = 'cadc-app-v2.0';
const STATIC_ASSETS = [
  './mobile-standalone.html',
  './index.html',
  'assets/css/main.css',
  'assets/css/theme-auto.css',
  'assets/css/custom-improvements.css',
  'assets/css/slider-fix.css',
  'assets/js/theme-switcher.js',
  'assets/js/functions-min.js',
  'assets/img/icon-192.png',
  'assets/img/icon-512.png',
  'assets/img/introduction-visual.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    // Network first pour navigation
    e.respondWith(
      fetch(e.request).catch(() => caches.match('./mobile-standalone.html'))
    );
  } else if (e.request.destination === 'image' || e.request.destination === 'style' || e.request.destination === 'script') {
    // Cache first pour assets statiques
    e.respondWith(
      caches.match(e.request).then(resp => resp || fetch(e.request))
    );
  }
});