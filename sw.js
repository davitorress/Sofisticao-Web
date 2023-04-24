// cache name
const CACHENAME = "pwa-sofisticao-v4";

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

// files to cache
const filesToCache = [
  "offline.html",
  "css/globalStyles.css",
  "css/pwa.css",
  "assets/img/orange-logo.svg",
  "assets/pwa-icons/offline-illustration.svg"
];

self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches.open(CACHENAME).then((cache) => {
      console.log("[ServiceWorker] Caching app shell");
      // Cache app shell files and offline fallback page
      return Promise.all([
        cache.addAll(filesToCache),
        cache.add("offline.html"),
      ]).catch((error) => {
        console.log(`Failed to cache: ${error}`);
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHENAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;
        if (preloadResp) {
          return preloadResp;
        }
        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHENAME);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});

let deferredInstallPrompt = null;
self.addEventListener("beforeinstallprompt", (event) => {
  console.log("[ServiceWorker] beforeinstallprompt event");
  event.preventDefault();
  deferredInstallPrompt = event;
});

const offlineFallbackPage = "offline.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHENAME
  })
);
