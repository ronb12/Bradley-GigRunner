// ─── Firebase Cloud Messaging (background messages) ───────────────────────
// Must use compat SDKs in service worker
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBYJkHvoa43DbF5Wn_a8uGZ9o_olCMnuFc",
  authDomain: "bradley-gigrunner.firebaseapp.com",
  projectId: "bradley-gigrunner",
  storageBucket: "bradley-gigrunner.firebasestorage.app",
  messagingSenderId: "497753581430",
  appId: "1:497753581430:web:db6c22866194dd3285bc57",
});

const messaging = firebase.messaging();

// Handle background FCM messages (when app is not in foreground)
messaging.onBackgroundMessage((payload) => {
  const {title, body} = payload.notification || {};
  const {orderId, type} = payload.data || {};

  const notifTitle = title || "GigRunner Update";
  const notifOptions = {
    body: body || "",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    vibrate: [200, 100, 200],
    data: {orderId, type, url: payload.data?.link || "/customer-dashboard.html"},
    actions: [
      {action: "view", title: "View Order"},
      {action: "dismiss", title: "Dismiss"},
    ],
  };

  self.registration.showNotification(notifTitle, notifOptions);
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "dismiss") return;

  const targetUrl = event.notification.data?.url || "/customer-dashboard.html";

  event.waitUntil(
    clients.matchAll({type: "window", includeUncontrolled: true}).then((clientList) => {
      // Focus existing tab if open
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      // Otherwise open a new tab
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// ─── Cache Strategy (PWA offline support) ─────────────────────────────────
const CACHE_NAME = "gigrunner-v2";
const STATIC_ASSETS = [
  "./",
  "index.html",
  "offline.html",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "favicon.ico",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Skip non-GET and cross-origin requests
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => cached || caches.match("offline.html"))
      )
  );
});
