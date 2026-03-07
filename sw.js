const CACHE_NAME = "tsurphucalendar-v1";

// List all files to cache for offline use
const urlsToCache = [
  "/",
  "/index.html",

  // CSS
  "/css/app.css",
  "/css/framework7-icons.css",
  "/css/icons.css",
  "/framework7/framework7-bundle.min.css",
  // FONTS
  "/fonts/NotoSerifTibetan-VariableFont_wght.ttf",
  "/fonts/FacultyGlyphic-Regular.ttf",
  "/fonts/Framework7Icons-Regular.ttf",
  "/fonts/Framework7Icons-Regular.woff",
  "/fonts/Framework7Icons-Regular.woff2",

  // JS
  "/js/app.js",
  "/js/database.js",
  "/js/specials.js",
  "/js/astro.js",
  "/js/astroData.js",
  "/js/locales.js",
  "/js/templates.js",
  "/js/routes.js",
  "/js/store.js",
  "/framework7/framework7-bundle.min.js",
  "/framework7/framework7-bundle.min.js.map",


  // Pages
  "/pages/month.html",

  // Assets / images
  "/assets/backdrop2.png",
  "/assets/baden.svg",
  "/assets/card-bg.svg",
  "/assets/dk.svg",
  "/assets/dp.svg",
  "/assets/dreamflag.svg",
  "/assets/fmBg.svg",
  "/assets/fmCloud.svg",
  "/assets/fm.svg",
  "/assets/gr.svg",
  "/assets/karmapamoon.png",
  "/assets/logo.png",
  "/assets/lu.svg",
  "/assets/mb.svg",
  "/assets/middleCloud.svg",
  "/assets/nmCloud.svg",
  "/assets/nm.svg",
  "/assets/sojong.svg",
  "/assets/special.svg",
  "/assets/specialbg.svg",
  "/assets/month.svg",
  "/assets/month2.svg",
  "/assets/icon192.png",
  "/assets/icon512.png",
  "/assets/warning.svg",
  "/assets/Akong.jpg",
  "/assets/HHGKFull2010.jpg",
  "/assets/Karmapa-1.jpg",
  "/assets/Karmapa-10.jpg",
  "/assets/Karmapa-11.jpg",
  "/assets/Karmapa-12.jpg",
  "/assets/Karmapa-13.jpg",
  "/assets/Karmapa-14.jpg",
  "/assets/Karmapa-15.jpg",
  "/assets/Karmapa-2.jpg",
  "/assets/Karmapa-3.jpg",
  "/assets/Karmapa-4.jpg",
  "/assets/Karmapa-5.jpg",
  "/assets/Karmapa-6.jpg",
  "/assets/Karmapa-7.jpg",
  "/assets/Karmapa-8.jpg",
  "/assets/Karmapa-9.jpg",
  "/assets/gampopa.jpg",
  "/assets/marpa.jpg",
  "/assets/Mila.jpg"
];

// Install event — cache all files upfront
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate event — clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// Fetch event — network first, fallback to cache
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Update cache with latest response
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        return networkResponse;
      })
      .catch(() => caches.match(event.request)) // fallback if offline
  );
});