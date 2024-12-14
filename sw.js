const cacheName = "adopt";

const assets =[
    '/',
    '/index.html',
    '/about.html',
    '/cats.html',
    '/contact.html',
    '/dogs.html',
    '/script.js',
    '/CSS/style1.css',
    '/CSS/style2.css',
    '/CSS/style3.css',
    '/CSS/style4.css',
    '/CSS/style5.css',
    '/manifest.json',
    '/IMG/1.jpg',
    '/IMG/2.jpg',
    '/IMG/3.jpg',
    '/IMG/4.jpg',
    '/IMG/5.jpg',
    '/IMG/a.jpg',
    '/IMG/b.jpg',
    '/IMG/c.jpg',
    '/IMG/contact.jpg',
    '/IMG/d.jpg',
    '/IMG/e.jpg',
    '/IMG/email.jpg',
    '/IMG/f.jpg',
    '/IMG/Facebook.jpg',
    '/IMG/icon.png',
    '/IMG/Instagram.jpg',
    '/IMG/logo.jpg',
    '/IMG/logo.png',
    '/IMG/m.jpg',
    '/IMG/m2.jpg',
    '/IMG/m3.jpg',
    '/IMG/m4.jpg',
    '/IMG/m5.jpg',
    '/IMG/m6.jpg',
    '/IMG/p.jpg',
    '/IMG/pet.jpg',
    '/IMG/t.jpg',
    '/IMG/whatsapp.jpg'
]
/* Event: Installation ==> Installing files (assets) into cache Storage.
self.addEventListener('install', (installEvent) =>{
    installEvent.waitUntil(
        caches.open(cacheName).then((cache) => {
            cache.addAll(assets).then().catch()
        })
        .catch((err) => {})
    )
})



// Event: Fetched ==> It fetches the files stored in the cache to be used in the event of a network failure (Offline).
self.addEventListener('fetch', (fetchEvent) => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then((res) => {
            return res || fetch(fetchEvent.request);
        })
    )
})*/

// Install Service Worker and Cache Files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch from Cache or Network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Update Cache When Service Worker Activates
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [cacheName];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
