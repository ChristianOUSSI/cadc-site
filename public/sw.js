const CACHE_NAME = 'cadc-pwa-v2'; // Version incrémentée pour forcer la mise à jour
const URLS_TO_CACHE = [
  '/',
  '/manifest.json',
  '/assets/img/logo.svg',
  '/assets/js/theme-switcher.js',
  '/assets/js/functions.js', // Changed from functions-min.js to functions.js
  '/assets/js/custom.js',
  '/assets/js/gsap-animations.js'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  // Pré-mise en cache des ressources critiques
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache and caching URLs');
      return cache.addAll(URLS_TO_CACHE);
    }).then(() => self.skipWaiting()) // Activation immédiate après l'installation
  );
});

// Activation, nettoyage des anciens caches et prise de contrôle
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interception des requêtes avec des stratégies de cache adaptées
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // On ignore les requêtes non-GET et les requêtes vers des extensions Chrome
  if (request.method !== 'GET' || request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Stratégie "Stale-While-Revalidate" pour les assets (CSS, JS, images)
  // Sert le cache immédiatement pour la vitesse, puis met à jour en arrière-plan.
  if (request.url.match(/\.(css|js|png|jpg|jpeg|svg|gif|woff|woff2)$/)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(request).then(cachedResponse => {
          const fetchPromise = fetch(request).then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // Stratégie "Network First" pour les pages HTML
  // On essaie toujours d'obtenir la version la plus fraîche, avec un fallback sur le cache.
  event.respondWith(
    fetch(request)
      .then(response => {
        // Si la réponse est valide, on la met en cache pour le mode hors-ligne
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, responseToCache));
        }
        return response;
      }).catch(() => caches.match(request)) // Si le réseau échoue, on sert depuis le cache
  );
});