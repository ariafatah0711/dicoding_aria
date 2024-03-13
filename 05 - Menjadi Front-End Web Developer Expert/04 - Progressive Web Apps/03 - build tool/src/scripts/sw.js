import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, Route } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

const themoviedbApi = new Route(
  ({ url }) => url.href.startsWith("https://api.themoviedb.org/3/"),
  new StaleWhileRevalidate({
    cacheName: "themoviedb-api",
  })
);

const themoviedbImageApi = new Route(
  ({ url }) => url.href.startsWith("https://image.tmdb.org/t/p/w500/"),
  new StaleWhileRevalidate({
    cacheName: "themoviedb-image-api",
  })
);

registerRoute(themoviedbApi);
registerRoute(themoviedbImageApi);

self.addEventListener("install", () => {
  console.log("Service Worker: Installed");
  self.skipWaiting();
});

self.addEventListener("push", (event) => {
  console.log("Service Worker: Pushed");

  const notificationData = {
    title: "Push Notification",
    options: {
      body: "This is a push notification",
      icon: "/favicon.png",
      image: "/icon-512x512/icon-512x512.jpg",
    },
  };

  const showNotification = self.registration.showNotification(
    notificationData.title,
    notificationData.options
  );

  event.waitUntil(showNotification);
});
