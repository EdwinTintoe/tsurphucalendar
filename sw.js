const CACHE = "calendar-pwa-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/css/app.css",
  "/js/app.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});