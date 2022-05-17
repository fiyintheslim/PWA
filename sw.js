console.log("Hello from the service worker");
//work box
const assets = ["styles.css", "app.js", "sw-register.js", "/"];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("assets").then((cache) => {
      console.log("cache", cache);
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const response = new Response(
    `Hi, i am the awaited response on ${event.request.url}`
  );
  event.respondWith(response);
});
