var VERSION = 'dev-12';

function rvlog(a, b, c) {
    var style = 'background: #a52a9b; color: #000; font-size: 12px; padding: 2px 8px;';
    if (typeof c !== 'undefined') console.log('%c ' + '[SW]', style, a, b, c);
    else if (typeof b !== 'undefined') console.log('%c ' + '[SW]', style, a, b);
    else if (typeof a !== 'undefined') console.log('%c ' + '[SW]', style, a);
    else console.log('%c ' + '[SW]', style);
}


var cacheFiles = [
    "/",
    "/wp-content/themes/dzNumedia/assets/svg/ellipse-separator.svg",
    "/wp-content/themes/dzNumedia/assets/icons/android-chrome-144x144.png",
    "/wp-content/uploads/2019/03/logo-small.png",
    "/video",
    "/watch/",
    "/live/",
    "/wp-json/dz/v1/desktop/featured?view=featured&id=0&page=1",
    "/wp-content/themes/dzNumedia/assets/icons/favicon.ico",
    "/wp-json/dz/v1/desktop/homepage?view=homepage",
    "/wp-json/dz/v1/desktop/any?view=live&id=0&page=1",
    "/wp-json/dz/v1/desktop/video?view=video&id=0&page=1",
    "/wp-json/dz/v1/desktop/watch?view=watch&id=0&page=1",
    "/wp-json/dz/v1/mobile/homepage?view=homepage",
    "/wp-json/dz/v1/mobile/any?view=live&id=0&page=1",
    "/wp-json/dz/v1/mobile/watch?view=watch&id=0&page=1",
    "/wp-json/dz/v1/mobile/video?view=video&id=0&page=1",
    "/category/news/",
    "/category/politique/",

];

cacheFiles = [];


// Below is the service worker code.

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(VERSION).then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', function(e) {
    var cacheWhitelist = [VERSION];
    rvlog('SW now ready to handle fetches!', VERSION);
    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        rvlog('[ServiceWorker] Removing old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    /*
     * Fixes a corner case in which the app wasn't returning the latest data.
     * You can reproduce the corner case by commenting out the line below and
     * then doing the following steps: 
     * 1) load app for first time so that the initial New York City data is shown 
     * 2) press the refresh button on the app 
     * 3) go offline 
     * 4) reload the app. 
     * You expect to see the newer NYC data, but you actually see the initial data. This happens because the
     * service worker is not yet activated. The code below essentially lets
     * you activate the service worker faster.
     */
    return self.clients.claim();
});

/**
 * CACHE_AND_UPDATE__ELSE_NETWORK
 * If there's a cached version available, use it, but fetch an update for next time.
 */
self.addEventListener('fetch', function(event) {
    // return;
    if ( //
        event.request.url.indexOf('chrome-extension://') > -1 || //
        event.request.url.indexOf('wp-admin') > -1 //
    ) {
        return;
    }
    if (event.request.method === 'GET') {
        rvlog('request', event.request);
        // API MUST BE FROM NETWORK THEN CACHE
        if ( //
            false && (
                event.request.url.indexOf('wp-json/') > -1 || //
                event.request.url.indexOf('api/') > -1 //
            )
        ) {
            event.respondWith(
                caches.open(VERSION).then(function(cache) {
                    return fetch(event.request).then(function(networkResponse) {
                        console.log('API FOUND ON NETWORK', event.request.url);
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    }).catch(function(err) {
                        console.log('API NOT FOUND ON NETWORK', event.request.url);
                        return cache.match(event.request).then(function(response) {
                            return response;
                        })
                    })
                })
            );
        } else {
            event.respondWith(
                caches.open(VERSION).then(function(cache) {
                    return cache.match(event.request).then(function(response) {
                        var fetchPromise = fetch(event.request).then(function(networkResponse) {
                            rvlog('networkResponse', networkResponse.url, networkResponse.statusText, networkResponse);
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        }).catch(function(err) {
                            rvlog('NOT FOUND ON NETWORK', event.request.url, err);
                        });
                        return response || fetchPromise;
                    })
                })
            );
        }

    } else {
        rvlog('METHOD ESCAPED: ', event.request.method, event.request);
    }

});