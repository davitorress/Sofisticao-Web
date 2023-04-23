// cache name
const CACHE = "pwa-sofisticao";

// files to cache
const filesToCache = [
  "/",
  "/index.html",
  "/css",
  "/css/about.css",
  "/css/bestSellers.css",
  "/css/categories.css",
  "/css/discount.css",
  "/css/dispatch.css",
  "/css/footer.css",
  "/css/globalStyles.css",
  "/css/hero.css",
  "/css/highlight.css",
  "/css/pets.css",
  "/css/rating.css",
  "/css/shop",
  "/css/shop/shop.css",
  "/css/shop/menuFilter.css",
  "/css/shop/menuAnimation.css",
  "/css/shop/headerDesk.css",
  "/js",
  "/js/ratings.js",
  "/js/navbar-shop.js",
  "/js/menuFilters.js",
  "/js/menuBurguer.js",
  "/js/hero.js",
  "/js/categories.js",
  "/assets",
  "/assets/img",
  "/assets/img/about.png",
  "/assets/img/black-logo.svg",
  "/assets/img/desktop-logo.svg",
  "/assets/img/discount-lg.png",
  "/assets/img/discount.png",
  "/assets/img/hero-img.png",
  "/assets/img/highlight.png",
  "/assets/img/highlight.svg",
  "/assets/img/mobile-logo.png",
  "/assets/img/mobile-logo.svg",
  "/assets/img/mothers-day_mobile.png",
  "/assets/img/mothers-day.png",
  "/assets/img/orange-logo.svg",
  "/assets/img/sofisticao-white.png",
  "/assets/img/sofisticao-white.svg",
  "/assets/img/sofisticao.png",
  "/assets/img/white-logo.svg",
  "/assets/img/icons",
  "/assets/img/icons/back-page.svg",
  "/assets/img/icons/search.svg",
  "/assets/img/icons/shopping-bag.svg",
  "/assets/fonts",
  "/assets/fonts/Estedad[wght,kshd].ttf",
  "/assets/icon",
  "/assets/icon/chevron-down.svg",
  "/assets/icon/chevron-left.svg",
  "/assets/icon/chevron-right.svg",
  "/assets/icon/clothes.svg",
  "/assets/icon/filter.svg",
  "/assets/icon/gift.svg",
  "/assets/icon/heart-white.svg",
  "/assets/icon/heart.svg",
  "/assets/icon/instagram.svg",
  "/assets/icon/mail.svg",
  "/assets/icon/map-pin.svg",
  "/assets/icon/menu.svg",
  "/assets/icon/next-page.svg",
  "/assets/icon/phone.svg",
  "/assets/icon/search-white.svg",
  "/assets/icon/search.svg",
  "/assets/icon/shop-store.svg",
  "/assets/icon/shopping-bag-white.svg",
  "/assets/icon/shopping-bag.svg",
  "/assets/icon/star-filled.svg",
  "/assets/icon/star.svg",
  "/assets/icon/truck.svg",
];

self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
      caches.open(CACHE).then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
    );
    // Add install popup
    self.skipWaiting();
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage('New version installed. Please refresh.');
      });
    });
  });
  
  self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
  });
  
  self.addEventListener('fetch', (event) => {
    console.log('[ServiceWorker] Fetch', event.request.url);
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });

  let deferredPrompt;

  self.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = event;
    // Show a custom install button or trigger the install prompt
    const installButton = document.getElementById('install-button');
    installButton.style.display = 'block';
    installButton.addEventListener('click', () => {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        // Clear the deferredPrompt variable
        deferredPrompt = null;
      });
    });
  });
  
  // This is the "Offline page" service worker
  
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
  
  // TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
  const offlineFallbackPage = "ToDo-replace-this-name.html";
  
  self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
      self.skipWaiting();
    }
  });
  
  self.addEventListener('install', async (event) => {
    event.waitUntil(
      caches.open(CACHE)
        .then((cache) => cache.add(offlineFallbackPage))
    );
  });
  
  if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
  }

  self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
      event.respondWith((async () => {
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
      })());
    }
  });
  