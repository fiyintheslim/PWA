console.log("Hello from the service worker");
//work box
const assets = ["/", "styles.css", "app.js", "sw-register.js"];
self.addEventListener("install", (event) => {
  //service workers only run for 40 seconds
  //I a file is so large that it takes more than 40secs to download the services worker won't complete it's task
  //event.waitUntil can be used
  event.waitUntil(
    //event.waitUntil will instruct the browser to wait until what's in it is complete
    caches.open("assets").then((cache) => {
      console.log("cache", cache);
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (event) => {
  // const response = new Response(
  //   `Hi, i am the awaited response on ${event.request.url}`
  // );
  // console.log(event.request);
  // event.respondWith(response);
  //respondWith accepts a response or a promise of a response
  //Check if request is cached
  //Below is a cache first method for intercepting requests

  const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
    return fetch(request);
  };
  event.respondWith(cacheFirst(event.request));

  //not working

  //event.respondWith(
  // caches.open("assets").then((cache) => {
  //   cache.match(event.request).then((cachedResponse) => {
  //     if (cachedResponse) {
  //       //Response exists in the cache
  //       console.log("exists in cache", event.request, cachedResponse);
  //       //return cachedResponse;
  //     } else {
  //       //doesn't exist in the cache
  //       console.log("doesn't exist in cache");
  //       //return fetch(event.request);
  //     }
  //   });
  // });
  //);
});
