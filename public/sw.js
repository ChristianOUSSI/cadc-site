const CACHE_NAME = 'cadc-pwa-v1';
const URLS_TO_CACHE = [
  '/',
  '/manifest.json',
  '/assets/img/logo.svg',
  '/assets/js/theme-switcher.js'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  // Force l'activation immédiate pour que la PWA soit fonctionnelle dès la première visite
  self.skipWaiting();
  
  // Pré-mise en cache des ressources critiques
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activation et prise de contrôle
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Interception des requêtes (Stratégie Network First avec mise en cache dynamique)
self.addEventListener('fetch', (event) => {
  // On ignore les requêtes non-GET (POST, etc.)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la réponse est valide, on la clone et on la met en cache
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Si le réseau échoue (offline), on sert depuis le cache
        return caches.match(event.request);
      })
  );
});