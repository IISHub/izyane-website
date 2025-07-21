// Service Worker for iZyane
const CACHE_NAME = 'izyane-v1';
const STATIC_ASSETS = [
  '/',
  '/client/index.html',
  '/client/src/main.tsx',
  '/client/src/App.tsx',
  '/client/src/index.css',
  '/logo.png',
  '/logo-dark.svg',
  '/logo-light.svg'
];

// Network-first strategy for API calls
const NETWORK_FIRST_PATTERNS = [
  '/api/',
  '/data/'
];

// Cache-first strategy for static assets
const CACHE_FIRST_PATTERNS = [
  '.js',
  '.css',
  '.png',
  '.jpg',
  '.jpeg',
  '.svg',
  '.webp',
  '.avif',
  '.woff',
  '.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const { url } = request;

  // Skip cross-origin requests
  if (!url.startsWith(self.location.origin)) {
    return;
  }

  // Network-first for API calls
  if (NETWORK_FIRST_PATTERNS.some(pattern => url.includes(pattern))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Cache-first for static assets
  if (CACHE_FIRST_PATTERNS.some(ext => url.endsWith(ext))) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            // Update cache in background
            fetch(request)
              .then((response) => {
                if (response.status === 200) {
                  const responseClone = response.clone();
                  caches.open(CACHE_NAME)
                    .then((cache) => {
                      cache.put(request, responseClone);
                    });
                }
              })
              .catch(() => {}); // Ignore network errors
            
            return cachedResponse;
          }

          // Not in cache, fetch from network
          return fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            });
        })
    );
    return;
  }

  // Stale-while-revalidate for everything else
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
            }
            return response;
          })
          .catch(() => {
            // Return cached response if network fails
            return cachedResponse;
          });

        return cachedResponse || fetchPromise;
      })
  );
});

// Handle background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(handleContactFormSync());
  }
});

async function handleContactFormSync() {
  try {
    const cache = await caches.open('form-data');
    const requests = await cache.keys();
    
    for (const request of requests) {
      if (request.url.includes('contact-form')) {
        try {
          const response = await fetch(request);
          if (response.ok) {
            await cache.delete(request);
          }
        } catch (error) {
          console.error('Failed to sync contact form:', error);
        }
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});
