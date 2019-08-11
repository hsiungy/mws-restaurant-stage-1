const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js'
]


/**
 * Open caches object with cache named 'v1' and return promise
 * that is chained with function that adds cacheFiles.
 */
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});

/**
 * Check if event request URL already exists in cache;
 * if there is a response for the match query, return that;
 * if not, fetch the item and add it to the cache.
 */

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response) {
                return response;
            } else {
                return fetch(e.request)
                .then(function(response) {
                    const responseClone = response.clone();
                    caches.open('v1').then(function(cache) {
                        cache.put(e.request, responseClone);
                    })
                    return response;
                })
                .catch(function(err) {
                    console.log(err);
                });
            }
        })
    ); 
});