self.addEventListener("install", (event) => {
  console.log("Installing Service Worker!");
});

self.addEventListener("active", (event) => {
  console.log("Active Service Worker");
});

self.addEventListener("fetch", (event) => {
  console.log(event.request);

  event.respondWith(fetch(event.request));
});
