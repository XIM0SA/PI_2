
const CACHE_NAME = "pwa-cache-v1";

const ASSETS = [
  "/students.html",
  "/styles.css",
  "/script.js",
  "/icons/delete.png",
  "/liza.jpg",
  "/icons/edit.png",
  "/icons/notification-bell.png"
];

// Подія встановлення Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Кешування ресурсів...");
      return cache.addAll(ASSETS).catch(console.error);
    })
  );
});


self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const networkFetch = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });


        return cachedResponse || networkFetch;
      });
    })
  );
});


// Подія активації Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME) // Знаходимо старі кеші
          .map((key) => caches.delete(key))   // Видаляємо їх
      );
    }).then(() => {
      console.log("Новий Service Worker активовано.");
      return self.clients.claim(); // Переключаємо новий SW для всіх вкладок
    })
  );
});
