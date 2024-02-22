const CACHE_NAME = 'pwa-demo-cache-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/scripts.js',
  '/data.json',
  '/images/pwa.webp',
  '/icons/100.png',
  '/icons/192.png',
  '/icons/256.png',
  '/icons/512.png',
  './screenshots/wide.png',
  './screenshots/narrow.png',
]

// Install a service worker
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
})

// Network first, falling back on cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Try to fetch the resource from the network
    fetch(event.request)
      .then((networkResponse) => {
        // If the fetch is successful, return the network response
        return networkResponse
      })
      .catch(async () => {
        // If the network is unavailable, try to get the resource from the cache
        const cachedResponse = await caches.match(event.request)
        if (cachedResponse) {
          // If we have a cached version, return it
          return cachedResponse
        }
        return new Response(
          'The network is unavailable and no cache entry was found. Please check your internet connection.',
          {
            headers: { 'Content-Type': 'text/plain' },
          }
        )
      })
  )
})

self.addEventListener('activate', (event) => {
  // 'activate' event will be fired when the service worker starts to take control of the pages.
  // This happens after the installation step is completed.

  const cacheWhitelist = [CACHE_NAME] // This array contains the names of the cache you want to keep.

  event.waitUntil(
    // Extend the lifetime of the event until the caches are updated.
    caches.keys().then((cacheNames) => {
      // Retrieve all cache names.
      return Promise.all(
        // Return a single promise that resolves when all caches that are not in the whitelist are deleted.
        cacheNames.map((cacheName) => {
          // Map over all cache names.
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // If the cache name is not found in the whitelist...
            return caches.delete(cacheName) // ...delete that cache.
          }
        })
      )
    })
  )
})
