// // console.log("service worker from public folder");

// // let cacheData = "appV1"  ; 
// // this.addEventListener("install" ,(event)=>{
// //     event.waitUntil(
// //         caches.open(cacheData).then((cach)=>{
// //             cach.addAll()
// //         })
// //     )
// // })

// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open('notes-cache').then((cache) => {
//             // Cache static assets (HTML, CSS, JS files)
//             return cache.addAll([
//                 '/', // Root file (index.html)
//                 '/Home.jsx', // HTML file
//                 '/static/js/index.js', // Main JS file
//                 '/static/css/index.css', // Main CSS file
//                 '/manifest.json', // Manifest file
                
//             ]);
//         })
//     );
// });

// self.addEventListener('fetch', (event) => {
//     // Handle the API request for notes (GET /api/note)
//     if (event.request.url.includes('/api/note/')) {
//         event.respondWith(
//             caches.match(event.request).then((cachedResponse) => {
//                 // If we have a cached version of the notes, return it
//                 if (cachedResponse) {
//                     return cachedResponse; // Serve cached notes data
//                 }

//                 // Otherwise, fetch the data from the network
//                 return fetch(event.request).then((networkResponse) => {
//                     // Clone the response to cache it
//                     const clonedResponse = networkResponse.clone();

//                     // Open the cache and store the notes data
//                     caches.open('notes-cache').then((cache) => {
//                         cache.put(event.request, clonedResponse); // Cache the notes API response
//                     });

//                     // Return the network response (display the data)
//                     return networkResponse;
//                 });
//             })
//         );
//     } else {
//         // For all other requests (like static files), handle normally
//         event.respondWith(
//             caches.match(event.request).then((cachedResponse) => {
//                 return cachedResponse ;
//             })
//         );
//     }
// });

// // Optionally, you can add a background sync for POST, PUT, DELETE requests if needed
// // self.addEventListener('sync', (event) => {
// //     if (event.tag === 'sync-notes') {
// //         event.waitUntil(
// //             // Your logic to send queued POST, PUT, DELETE requests
// //         );
// //     }
// // });

// // self.addEventListener('activate', (event) => {
// //     const cacheWhitelist = ['notes-cache']; // Only keep the current cache

// //     event.waitUntil(
// //         caches.keys().then((cacheNames) => {
// //             return Promise.all(
// //                 cacheNames.map((cacheName) => {
// //                     if (!cacheWhitelist.includes(cacheName)) {
// //                         return caches.delete(cacheName); // Clean up old caches
// //                     }
// //                 })
// //             );
// //         })
// //     );
// // });


//STORAGE OF BROWSER
const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];
const self = this;

//installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// // listen for request
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((res) => {
//       return fetch(event.request).catch(() => caches.match("offline.html"));
//     })
//   );
// });

// // actitivate the service worker
// self.addEventListener("activate", (event) => {
//     const cacheWhitelist = [];
//     cacheWhitelist.push(CACHE_NAME);
//     event.waitUntil(
//         caches.keys().then((cacheNames) => Promise.all(
//             cacheNames.map((cacheName) => {
//                 if(!cacheWhitelist.includes(cacheName)){
//                     return caches.delete(cacheName);
//                 }
//             })
//         ))
//     )
// });

const CACHE_NAME = "notes-cache-v1";
const urlsToCache = ["index.html", "offline.html"];

// Install event - Cache static files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - Cache dynamic content (e.g., notes)
self.addEventListener("fetch", (event) => {
  // Check if the request is for the notes API
  if (event.request.url.includes('/api/note')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // If we have a cached version of the notes, return it
        if (cachedResponse) {
          return cachedResponse; // Serve cached notes data
        }

        // Otherwise, fetch the data from the network
        return fetch(event.request).then((networkResponse) => {
          // Clone the response to cache it
          const clonedResponse = networkResponse.clone();

          // Open the cache and store the notes data
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clonedResponse); // Cache the notes API response
          });

          // Return the network response (display the data)
          return networkResponse;
        });
      })
    );
  } else {
    // For all other requests (like static files), handle normally
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});

// Activate event - Clean up old caches if needed
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => 
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Clean up old caches
          }
        })
      )
    )
  );
});

