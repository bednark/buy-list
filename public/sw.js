const CACHE_NAME = "buy-list-v1";

const urlsToCache = [
  "/",
  "/recepies",
  "/buy-list",
  "/index.html",
  "/buylist.html",
  "/recepies.html",
  "/static/css/style.css",
  "/static/js/script.js",
  "/static/icons/favicon.ico",
  "/static/icons/icon-192x192.png",
  "/static/icons/icon-512x512.png",
  "/static/icons/apple-icon.png",
  "/static/icons/bars-solid.svg",
  "/static/icons/check-solid.svg",
  "/static/icons/trash-solid.svg",
  "/static/icons/cart-plus-solid.svg",
  "/static/icons/favicon-96x96.png",
  "/static/icons/favicon.svg",
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME)
            return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.url.includes("/api/")) {
    event.respondWith(
      fetch(request).then((response) => response)
        .catch(() => {
          return new Response(null, {
            status: 503,
            statusText: "Service Unavailable",
          })
        })
    );
  } else {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const networkFetch = fetch(request).then((networkResponse) => {
            if (networkResponse.ok)
              cache.put(request, networkResponse.clone());
            return networkResponse;
          }).catch(() => cachedResponse);
          return cachedResponse || networkFetch;
        });
      })
    );
  }
});
