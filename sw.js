const CACHE = "itube-v1";
const CORE = [
  "./",
  "./index.html",
  "./style.css",
  "./theme.js",
  "./app.js",
  "./manifest.json",
  "./ml/index.html",
  "./ml/ch1/index.html",
  "./ml/ch2/index.html",
  "./ml/ch3/index.html",
  "./ml/ch4/index.html",
  "./ml/ch5/index.html",
  "./ml/ch6/index.html",
  "./ml/ch7/index.html",
  "./ml/ch8/index.html",
  "./ml/ch9/index.html",
  "./ml/ch10/index.html"
];

self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(CORE.map(function (u) { return new Request(u, { cache: "reload" }); })).catch(function () {
        // Best-effort: some paths may not resolve during install depending on scope; ignore individual failures.
      });
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // let CDN requests (fonts, KaTeX) pass through to the network normally

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var networkFetch = fetch(event.request)
        .then(function (response) {
          if (response && response.status === 200) {
            var copy = response.clone();
            caches.open(CACHE).then(function (cache) { cache.put(event.request, copy); });
          }
          return response;
        })
        .catch(function () { return cached; });
      return cached || networkFetch;
    })
  );
});
