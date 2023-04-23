// cache name
const CACHE = "pwa-sofisticao";

// files to cache
const filesToCache = [
  "https://www.sofisticao.shop/",
  "https://www.sofisticao.shop/index.html",
  "https://www.sofisticao.shop/css",
  "https://www.sofisticao.shop/css/about.css",
  "https://www.sofisticao.shop/css/bestSellers.css",
  "https://www.sofisticao.shop/css/categories.css",
  "https://www.sofisticao.shop/css/discount.css",
  "https://www.sofisticao.shop/css/dispatch.css",
  "https://www.sofisticao.shop/css/footer.css",
  "https://www.sofisticao.shop/css/globalStyles.css",
  "https://www.sofisticao.shop/css/hero.css",
  "https://www.sofisticao.shop/css/highlight.css",
  "https://www.sofisticao.shop/css/pets.css",
  "https://www.sofisticao.shop/css/rating.css",
  "https://www.sofisticao.shop/css/shop",
  "https://www.sofisticao.shop/css/shop/shop.css",
  "https://www.sofisticao.shop/css/shop/menuFilter.css",
  "https://www.sofisticao.shop/css/shop/menuAnimation.css",
  "https://www.sofisticao.shop/css/shop/headerDesk.css",
  "https://www.sofisticao.shop/js",
  "https://www.sofisticao.shop/js/ratings.js",
  "https://www.sofisticao.shop/js/navbar-shop.js",
  "https://www.sofisticao.shop/js/menuFilters.js",
  "https://www.sofisticao.shop/js/menuBurguer.js",
  "https://www.sofisticao.shop/js/hero.js",
  "https://www.sofisticao.shop/js/categories.js",
  "https://www.sofisticao.shop/assets",
  "https://www.sofisticao.shop/assets/img",
  "https://www.sofisticao.shop/assets/img/about.png",
  "https://www.sofisticao.shop/assets/img/black-logo.svg",
  "https://www.sofisticao.shop/assets/img/desktop-logo.svg",
  "https://www.sofisticao.shop/assets/img/discount-lg.png",
  "https://www.sofisticao.shop/assets/img/discount.png",
  "https://www.sofisticao.shop/assets/img/hero-img.png",
  "https://www.sofisticao.shop/assets/img/highlight.png",
  "https://www.sofisticao.shop/assets/img/highlight.svg",
  "https://www.sofisticao.shop/assets/img/mobile-logo.png",
  "https://www.sofisticao.shop/assets/img/mobile-logo.svg",
  "https://www.sofisticao.shop/assets/img/mothers-day_mobile.png",
  "https://www.sofisticao.shop/assets/img/mothers-day.png",
  "https://www.sofisticao.shop/assets/img/orange-logo.svg",
  "https://www.sofisticao.shop/assets/img/sofisticao-white.png",
  "https://www.sofisticao.shop/assets/img/sofisticao-white.svg",
  "https://www.sofisticao.shop/assets/img/sofisticao.png",
  "https://www.sofisticao.shop/assets/img/white-logo.svg",
  "https://www.sofisticao.shop/assets/img/icons",
  "https://www.sofisticao.shop/assets/img/icons/back-page.svg",
  "https://www.sofisticao.shop/assets/img/icons/search.svg",
  "https://www.sofisticao.shop/assets/img/icons/shopping-bag.svg",
  "https://www.sofisticao.shop/assets/fonts",
  "https://www.sofisticao.shop/assets/fonts/Estedad[wght,kshd].ttf",
  "https://www.sofisticao.shop/assets/icon",
  "https://www.sofisticao.shop/assets/icon/chevron-down.svg",
  "https://www.sofisticao.shop/assets/icon/chevron-left.svg",
  "https://www.sofisticao.shop/assets/icon/chevron-right.svg",
  "https://www.sofisticao.shop/assets/icon/clothes.svg",
  "https://www.sofisticao.shop/assets/icon/filter.svg",
  "https://www.sofisticao.shop/assets/icon/gift.svg",
  "https://www.sofisticao.shop/assets/icon/heart-white.svg",
  "https://www.sofisticao.shop/assets/icon/heart.svg",
  "https://www.sofisticao.shop/assets/icon/instagram.svg",
  "https://www.sofisticao.shop/assets/icon/mail.svg",
  "https://www.sofisticao.shop/assets/icon/map-pin.svg",
  "https://www.sofisticao.shop/assets/icon/menu.svg",
  "https://www.sofisticao.shop/assets/icon/next-page.svg",
  "https://www.sofisticao.shop/assets/icon/phone.svg",
  "https://www.sofisticao.shop/assets/icon/search-white.svg",
  "https://www.sofisticao.shop/assets/icon/search.svg",
  "https://www.sofisticao.shop/assets/icon/shop-store.svg",
  "https://www.sofisticao.shop/assets/icon/shopping-bag-white.svg",
  "https://www.sofisticao.shop/assets/icon/shopping-bag.svg",
  "https://www.sofisticao.shop/assets/icon/star-filled.svg",
  "https://www.sofisticao.shop/assets/icon/star.svg",
  "https://www.sofisticao.shop/assets/icon/truck.svg",
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
    self.skipWaiting();
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage("New version installed. Please refresh.");
      });
    });
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
  console.log("[ServiceWorker] Fetch", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

let deferredPrompt;

self.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  const installButton = document.getElementById("install-button");
  installButton.style.display = "block";
  installButton.addEventListener("click", () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      deferredPrompt = null;
    });
  });
});

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

const offlineFallbackPage = "ToDo-replace-this-name.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("install", async (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(offlineFallbackPage))
  );
});

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
          const offlineResp = await cache.match(offlineFallbackPage);
          return offlineResp;
        }
      })()
    );
  }
});
