const CACHE_NAME = "tsurphucalendar-static-v1";
const DATA_CACHE = "tsurphucalendar-data-v1";

// List static assets to cach
const urlsToCache = [
  "index.html",

  // CSS
  "css/app.css",
  "css/framework7-icons.css",
  "css/icons.css",
  "framework7/framework7-bundle.min.css",
  // FONTS
  "fonts/NotoSerifTibetan-VariableFont_wght.ttf",
  "fonts/FacultyGlyphic-Regular.ttf",
  "fonts/Framework7Icons-Regular.ttf",
  "fonts/Framework7Icons-Regular.woff",
  "fonts/Framework7Icons-Regular.woff2",

  // JS
  "js/app.js",
  "js/database.js",
  "js/specials.js",
  "js/astro.js",
  "js/astroData.js",
  "js/locales.js",
  "js/templates.js",
  "js/routes.js",
  "js/store.js",
  "framework7/framework7-bundle.min.js",


  // Pages
  "pages/month.html",

  // Assets / images
  "assets/backdrop2.png",
  "assets/baden.svg",
  "assets/card-bg.svg",
  "assets/dk.svg",
  "assets/dp.svg",
  "assets/dreamflag.svg",
  "assets/fmBg.svg",
  "assets/fmCloud.svg",
  "assets/fm.svg",
  "assets/gr.svg",
  "assets/karmapamoon.png",
  "assets/logo.png",
  "assets/lu.svg",
  "assets/mb.svg",
  "assets/middleCloud.svg",
  "assets/nmCloud.svg",
  "assets/nm.svg",
  "assets/sojong.svg",
  "assets/special.svg",
  "assets/specialbg.svg",
  "assets/month.svg",
  "assets/month2.svg",
  "assets/icon192.png",
  "assets/icon512.png",
  "assets/warning.svg",
  "assets/specials/Akong.jpg",
  "assets/specials/HHGKFull2010.jpg",
  "assets/specials/Karmapa-1.jpg",
  "assets/specials/Karmapa-10.jpg",
  "assets/specials/Karmapa-11.jpg",
  "assets/specials/Karmapa-12.jpg",
  "assets/specials/Karmapa-13.jpg",
  "assets/specials/Karmapa-14.jpg",
  "assets/specials/Karmapa-15.jpg",
  "assets/specials/Karmapa-2.jpg",
  "assets/specials/Karmapa-3.jpg",
  "assets/specials/Karmapa-4.jpg",
  "assets/specials/Karmapa-5.jpg",
  "assets/specials/Karmapa-6.jpg",
  "assets/specials/Karmapa7.jpg",
  "assets/specials/Karmapa-8.jpg",
  "assets/specials/Karmapa-9.jpg",
  "assets/specials/gampopa.jpg",
  "assets/specials/marpa.jpg",
  "assets/specials/Mila.jpg"
];
// Install event — cache static assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate event — clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch event — network-first with cache fallback
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Dynamic JSON: use DATA_CACHE
  if (url.pathname.startsWith("/data/")) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          if (res.status === 200) {
            const resClone = res.clone();
            caches.open(DATA_CACHE).then(cache => cache.put(event.request, resClone));
          }
          return res;
        })
        .catch(() => caches.match(event.request, { cacheName: DATA_CACHE }))
    );
    return;
  }

  // Static assets: network-first
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        if (networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request, { cacheName: CACHE_NAME }))
  );
});
