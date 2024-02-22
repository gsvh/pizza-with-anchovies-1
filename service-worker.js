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

// Cache and return requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response
      }
      // Attempt to fetch from the network
      return fetch(event.request).catch(() => {
        // If both the cache and the network are unavailable,
        // return a simple message directly
        return new Response(
          'The cache is unavailable and you are offline. Please check your internet connection.',
          {
            headers: { 'Content-Type': 'text/plain' },
          }
        )
      })
    })
  )
})
// self.addEventListener('fetch', (event) => {
//   // Check if this is a request for an image
//   if (event.request.destination === 'image') {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(async (cache) => {
//         // Go to the cache first
//         const cachedResponse = await cache.match(event.request.url)
//         // Return a cached response if we have one
//         if (cachedResponse) {
//           return cachedResponse
//         }
//         const fetchedResponse = await fetch(event.request)
//         // Add the network response to the cache for later visits
//         cache.put(event.request, fetchedResponse.clone())
//         return fetchedResponse
//       })
//     )
//   } else {
//     return
//   }
// })

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
