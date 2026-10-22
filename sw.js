const C = "kmt-v1";
const SHELL = ["./", "./index.html", "./firebase-config.js", "./manifest.json"];
self.addEventListener("install", e => e.waitUntil(caches.open(C).then(c => c.addAll(SHELL))));
self.addEventListener("activate", e => e.waitUntil(
  caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x))))
));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
