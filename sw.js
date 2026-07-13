const CACHE_NAME = 'study-cache-v1';
const ASSETS = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './manifest.json',
    './logo.svg',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
    'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(k => { if(k !== CACHE_NAME) return caches.delete(k); })
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    // For YouTube API calls or origins, go network first.
    if(e.request.url.includes('youtube.com') || e.request.url.includes('api.')) {
        e.respondWith(
            fetch(e.request).catch(() => caches.match(e.request)).then(res => {
                return res || new Response('Offline and not cached', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: { 'Content-Type': 'text/plain' }
                });
            })
        );
        return;
    }
    
    // For local assets, cache first
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request).then(fetchRes => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(e.request, fetchRes.clone());
                    return fetchRes;
                });
            });
        }).catch(() => {
            // Offline and not in cache — return a graceful fallback instead of
            // letting the browser throw an unhandled network error.
            if (e.request.mode === 'navigate') {
                return caches.match('./index.html');
            }
            return new Response('Offline and not cached', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: { 'Content-Type': 'text/plain' }
            });
        })
    );
});
