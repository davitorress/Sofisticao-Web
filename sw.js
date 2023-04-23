// cache name
const CACHE = "pwa-sofisticao-v2";

// files to cache
const filesToCache = [
  "index.html",
  "css/about.css",
  "css/bestSellers.css",
  "css/categories.css",
  "css/discount.css",
  "css/dispatch.css",
  "css/footer.css",
  "css/globalStyles.css",
  "css/hero.css",
  "css/highlight.css",
  "css/pets.css",
  "css/rating.css",
  "css/shop/shop.css",
  "css/shop/menuFilter.css",
  "css/shop/menuAnimation.css",
  "css/shop/headerDesk.css",
  "js/ratings.js",
  "js/navbar-shop.js",
  "js/menuFilters.js",
  "js/menuBurguer.js",
  "js/hero.js",
  "js/categories.js",
  "assets/img/about.png",
  "assets/img/black-logo.svg",
  "assets/img/desktop-logo.svg",
  "assets/img/discount-lg.png",
  "assets/img/discount.png",
  "assets/img/hero-img.png",
  "assets/img/highlight.png",
  "assets/img/highlight.svg",
  "assets/img/mobile-logo.png",
  "assets/img/mobile-logo.svg",
  "assets/img/mothers-day_mobile.png",
  "assets/img/mothers-day.png",
  "assets/img/orange-logo.svg",
  "assets/img/sofisticao-white.png",
  "assets/img/sofisticao-white.svg",
  "assets/img/sofisticao.png",
  "assets/img/white-logo.svg",
  "assets/img/icons/back-page.svg",
  "assets/img/icons/search.svg",
  "assets/img/icons/shopping-bag.svg",
  "assets/fonts/Estedad[wght,kshd].ttf",
  "assets/icon/chevron-down.svg",
  "assets/icon/chevron-left.svg",
  "assets/icon/chevron-right.svg",
  "assets/icon/clothes.svg",
  "assets/icon/filter.svg",
  "assets/icon/gift.svg",
  "assets/icon/heart-white.svg",
  "assets/icon/heart.svg",
  "assets/icon/instagram.svg",
  "assets/icon/mail.svg",
  "assets/icon/map-pin.svg",
  "assets/icon/menu.svg",
  "assets/icon/next-page.svg",
  "assets/icon/phone.svg",
  "assets/icon/search-white.svg",
  "assets/icon/search.svg",
  "assets/icon/shop-store.svg",
  "assets/icon/shopping-bag-white.svg",
  "assets/icon/shopping-bag.svg",
  "assets/icon/star-filled.svg",
  "assets/icon/star.svg",
  "assets/icon/truck.svg",
];

self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      console.log("[ServiceWorker] Caching app shell");
      return Promise.all(
        filesToCache.map((file) => {
          return cache.add(file).catch((error) => {
            console.log(`Failed to cache ${file}: ${error}`);
          });
        })
      );
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

let deferredInstallPrompt = null;
self.addEventListener("beforeinstallprompt", (event) => {
  console.log("[ServiceWorker] beforeinstallprompt event");
  event.preventDefault();
  deferredInstallPrompt = event;
});

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResp = await event.preloadResponse;

          if (preloadResp) {
            return preloadResp;
          }

          const networkResp = await fetch(event.request);
          const cache = await caches.open(CACHE);
          cache.put(event.request, networkResp.clone());
          return networkResp;
        } catch (error) {
          const cache = await caches.open(CACHE);
          const cachedResp = await cache.match(event.request);
          if (cachedResp) {
            return cachedResp;
          }
        }
      })()
    );
  }
});
