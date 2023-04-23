// cache name
const cacheName = 'pwa-basic-v1';

// files to cache
const filesToCache = [
'/',
'/index.html',
'/css/style.css',
'/js/main.js'
];

// install event
self.addEventListener('install', (event) => {
console.log('[ServiceWorker] Install');
event.waitUntil(
caches.open(cacheName).then((cache) => {
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

// activate event
self.addEventListener('activate', (event) => {
console.log('[ServiceWorker] Activate');
event.waitUntil(
caches.keys().then((keyList) => {
return Promise.all(keyList.map((key) => {
if (key !== cacheName) {
console.log('[ServiceWorker] Removing old cache', key);
return caches.delete(key);
}
}));
})
);
return self.clients.claim();
});

// fetch event
self.addEventListener('fetch', (event) => {
console.log('[ServiceWorker] Fetch', event.request.url);
event.respondWith(
caches.match(event.request).then((response) => {
return response || fetch(event.request);
})
);
});

// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";

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
  return networkResp;
} catch (error) {

  const cache = await caches.open(CACHE);
  const cachedResp = await cache.match(offlineFallbackPage);
  return cachedResp;
}
})());
}
});