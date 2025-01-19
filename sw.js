(function () {
  'use strict';

  const VERSION = '1737325799161|0.6982423907101187';
  self.CACHE_BUSTER = VERSION;
  self.addEventListener('install', function installEventListenerCallback(event) {
    return self.skipWaiting();
  });
  self.addEventListener('activate', function installEventListenerCallback(event) {
    return self.clients.claim();
  });

  const FILES = ['assets/chunk.app.85e1a5f36829c18b56dc.js', 'assets/chunk.tests.7ee16d82950c7267e5f5.js', 'assets/chunk.vendors-node_modules_ember-qunit_dist_index_js-node_modules_dom-element-descriptors_dist_es_i-a01131.01505bcd27c0712e0836.js', 'assets/chunk.vendors-node_modules_formatjs_intl_lib_index_js-node_modules_decimal_js_decimal_js-node_modul-b7cfc6.3484c6dfee58a7dc8983.js', 'assets/css/bootstrapv53.min.css', 'assets/css/bootstrapv53.min.css.map', 'assets/css/fonts/Outfit-Black.ttf', 'assets/css/fonts/Outfit-Bold.ttf', 'assets/css/fonts/Outfit-ExtraBold.ttf', 'assets/css/fonts/Outfit-ExtraLight.ttf', 'assets/css/fonts/Outfit-Light.ttf', 'assets/css/fonts/Outfit-Medium.ttf', 'assets/css/fonts/Outfit-Regular.ttf', 'assets/css/fonts/Outfit-SemiBold.ttf', 'assets/css/fonts/Outfit-Thin.ttf', 'assets/css/fonts/ropa.woff', 'assets/css/glyphicon.css', 'assets/css/glyphicon.css.map', 'assets/css/glyphicon.scss', 'assets/css/host-app.css', 'assets/css/img/ajax-loader.gif', 'assets/css/img/black-filter.png', 'assets/css/img/cancel.png', 'assets/css/img/climpek.png', 'assets/css/img/colors-2.png', 'assets/css/img/colors-green-blue.png', 'assets/css/img/colors-green-red.png', 'assets/css/img/colors-invert.png', 'assets/css/img/colors-red-blue.png', 'assets/css/img/colors-sepia.png', 'assets/css/img/edge-detect-black.png', 'assets/css/img/edge-detect.png', 'assets/css/img/fabric.png', 'assets/css/img/fond.png', 'assets/css/img/fullscreen.png', 'assets/css/img/hue-rotate.png', 'assets/css/img/image.png', 'assets/css/img/outil-de-coloration.png', 'assets/css/img/paint.png', 'assets/css/img/pattern.png', 'assets/css/img/play.png', 'assets/css/img/reload.png', 'assets/css/img/resize-horizontal.png', 'assets/css/img/resize-vertical.png', 'assets/css/img/rotate.png', 'assets/css/img/shadow.png', 'assets/css/img/triangle.jpg', 'assets/css/img/triangle.png', 'assets/css/img/zoom.png', 'assets/css/mind-sweep.css', 'assets/css/mind-sweep.css.map', 'assets/css/mind-sweep.scss', 'assets/css/universlogique.css', 'assets/css/universlogique.css.map', 'assets/css/universlogique.scss', 'assets/fonts/glyphicons-halflings-regular.eot', 'assets/fonts/glyphicons-halflings-regular.svg', 'assets/fonts/glyphicons-halflings-regular.ttf', 'assets/fonts/glyphicons-halflings-regular.woff', 'assets/fonts/glyphicons-halflings-regular.woff2', 'assets/fonts/ropa.woff', 'assets/fonts/VCR_OSD_MONO_1.001.woff', 'assets/fonts/VCR_OSD_MONO_1.001.woff2', 'assets/host-app.css', 'assets/host-app.js', 'assets/host-app.map', 'assets/img/beach_1.jpg', 'assets/img/business-man-grey.png', 'assets/img/business-man.png', 'assets/img/carreaux2.jpg', 'assets/img/colors-2.png', 'assets/img/colors-lightness.png', 'assets/img/colors-shifts.png', 'assets/img/favicon.ico', 'assets/img/favicon.png', 'assets/img/find-number.png', 'assets/img/icon-100-100.jpg', 'assets/img/icon-32-32.ico', 'assets/img/icon-32-32.jpg', 'assets/img/icon-32-32.png', 'assets/img/img-curves-1-hypotrochoid.png', 'assets/img/img-square-loading.png', 'assets/img/julia_w_300.png', 'assets/img/julia.jpg', 'assets/img/logo-132-132.png', 'assets/img/logo-32-32.png', 'assets/img/logo-64-64.png', 'assets/img/logo.jpg', 'assets/img/logo.png', 'assets/img/man_standing_silhouette.png', 'assets/img/man-silhouette.png', 'assets/img/man-test.png', 'assets/img/menu-1.jpg', 'assets/img/menu-2.jpg', 'assets/img/menu-3.jpg', 'assets/img/menu-4.jpg', 'assets/img/menu-color-shift.jpg', 'assets/img/menu-color.jpg', 'assets/img/menu-drawings.jpg', 'assets/img/menu-games.jpg', 'assets/img/menu-surface.jpg', 'assets/img/square-color.png', 'assets/img/star_w_300.png', 'assets/img/tomatoe.jpg', 'assets/img/tree.jpg', 'assets/img/triangle-144-144.png', 'assets/img/triangle-32-32.png', 'assets/img/triangle-64-64.png', 'assets/img/triangle.jpg', 'assets/img/triangle.png', 'assets/js/complex.js', 'assets/js/ffmpeg/ffmpeg-core.js', 'assets/js/fractals-lib/addon/models/fractal-parameters.js', 'assets/js/fractals-lib/addon/models/fractal-process.js', 'assets/js/fractals-lib/addon/models/fractal.js', 'assets/js/fractals-lib/addon/models/ganeshabrot-process.js', 'assets/js/fractals-lib/addon/models/ganeshabrot.js', 'assets/js/fractals-lib/addon/models/julia-star-functions.js', 'assets/js/fractals-lib/addon/models/julia-star-parameters.js', 'assets/js/fractals-lib/addon/models/julia-star.js', 'assets/js/fractals-lib/addon/models/mandelbrot-functions.js', 'assets/js/fractals-lib/addon/models/mandelbrot-parameters.js', 'assets/js/fractals-lib/addon/models/mandelbrot-process.js', 'assets/js/fractals-lib/addon/models/mandelbrot.js', 'assets/js/fractals-lib/addon/models/mandelbrot3d.js', 'assets/js/fractals-lib/addon/models/mandelbulb.js', 'assets/js/fractals-lib/addon/models/newton-fractal_.js', 'assets/js/fractals-lib/addon/models/newton-fractal-functions.js', 'assets/js/fractals-lib/addon/models/newton-fractal-parameters.js', 'assets/js/fractals-lib/addon/models/newton-fractal-process.js', 'assets/js/fractals-lib/addon/models/newton-fractal.js', 'assets/js/fractals-lib/addon/models/workers/canvas2DDrawer.js', 'assets/js/fractals-lib/addon/models/workers/canvas3DDrawer.js', 'assets/js/fractals-lib/addon/models/workers/color-drawer.js', 'assets/js/fractals-lib/addon/models/workers/color.js', 'assets/js/fractals-lib/addon/models/workers/colorDemo.js', 'assets/js/fractals-lib/addon/models/workers/complex.js', 'assets/js/fractals-lib/addon/models/workers/julia.js', 'assets/js/fractals-lib/addon/models/workers/juliaDemo.js', 'assets/js/fractals-lib/addon/models/workers/juliaGL.js', 'assets/js/fractals-lib/addon/models/workers/juliaWrkDrawer.js', 'assets/js/fractals-lib/addon/models/workers/palette.js', 'assets/js/fractals-lib/config/environment.js', 'assets/js/fractals-lib/index.js', 'assets/js/juliaWrk.js', 'assets/js/newton-fractal-worker.bundle.js', 'assets/js/newton-fractal-wrk.js', 'assets/js/support.js', 'assets/js/worker.js', 'assets/manifest.webmanifest', 'assets/mp3/a1.mp3', 'assets/mp3/a1s.mp3', 'assets/mp3/b1.mp3', 'assets/mp3/c1.mp3', 'assets/mp3/c1s.mp3', 'assets/mp3/c2.mp3', 'assets/mp3/click.mp3', 'assets/mp3/d1.mp3', 'assets/mp3/d1s.mp3', 'assets/mp3/do-2.mp3', 'assets/mp3/do-d.mp3', 'assets/mp3/do.mp3', 'assets/mp3/drum-1.mp3', 'assets/mp3/e1.mp3', 'assets/mp3/f1.mp3', 'assets/mp3/f1s.mp3', 'assets/mp3/fa-2.mp3', 'assets/mp3/fa-d.mp3', 'assets/mp3/g1.mp3', 'assets/mp3/g1s.mp3', 'assets/mp3/Guaz-Guaz-01Guaz.mp3', 'assets/mp3/la-2.mp3', 'assets/mp3/la-d.mp3', 'assets/mp3/la.mp3', 'assets/mp3/lab-d.mp3', 'assets/mp3/mi-2.mp3', 'assets/mp3/mi-d.mp3', 'assets/mp3/mib-d.mp3', 'assets/mp3/pluck-1.mp3', 'assets/mp3/re-2.mp3', 'assets/mp3/re-d.mp3', 'assets/mp3/re.mp3', 'assets/mp3/reb-d.mp3', 'assets/mp3/si-2.mp3', 'assets/mp3/si-d.mp3', 'assets/mp3/si.mp3', 'assets/mp3/sib-d.mp3', 'assets/mp3/sol-2.mp3', 'assets/mp3/sol-d.mp3', 'assets/mp3/sol.mp3', 'assets/mp3/solb-d.mp3', 'assets/test-support.js', 'assets/test-support.map', 'assets/tests.js', 'assets/tests.map', 'assets/universlogique.css', 'assets/vendor.css', 'assets/vendor.js', 'assets/vendor.map'];
  const VERSION$1 = '1';
  const REQUEST_MODE = 'cors';

  /*
   * Deletes all caches that start with the `prefix`, except for the
   * cache defined by `currentCache`
   */
  var cleanupCaches = (prefix, currentCache) => {
    return caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        let isOwnCache = cacheName.indexOf(prefix) === 0;
        let isNotCurrentCache = cacheName !== currentCache;
        if (isOwnCache && isNotCurrentCache) {
          caches.delete(cacheName);
        }
      });
    });
  };

  const CACHE_KEY_PREFIX = 'esw-asset-cache';
  const CACHE_NAME = `${CACHE_KEY_PREFIX}-${VERSION$1}`;
  const CACHE_URLS = FILES.map(file => {
    return new URL(file,  self.location).toString();
  });

  /*
   * Removes all cached requests from the cache that aren't in the `CACHE_URLS`
   * list.
   */
  const PRUNE_CURRENT_CACHE = () => {
    caches.open(CACHE_NAME).then(cache => {
      return cache.keys().then(keys => {
        keys.forEach(request => {
          if (CACHE_URLS.indexOf(request.url) === -1) {
            cache.delete(request);
          }
        });
      });
    });
  };
  self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => {
      return Promise.all(CACHE_URLS.map(url => {
        let request = new Request(url, {
          mode: REQUEST_MODE
        });
        return fetch(request).then(response => {
          if (response.status >= 400) {
            let error = new Error(`Request for ${url} failed with status ${response.statusText}`);
            {
              throw error;
            }
          }
          return cache.put(url, response);
        }).catch(function (error) {
          console.error(`Not caching ${url} due to ${error}`);
        });
      }));
    }));
  });
  self.addEventListener('activate', event => {
    event.waitUntil(Promise.all([cleanupCaches(CACHE_KEY_PREFIX, CACHE_NAME), PRUNE_CURRENT_CACHE()]));
  });
  self.addEventListener('fetch', event => {
    let isGETRequest = event.request.method === 'GET';
    let shouldRespond = CACHE_URLS.indexOf(event.request.url) !== -1;
    if (isGETRequest && shouldRespond) {
      event.respondWith(caches.match(event.request, {
        cacheName: CACHE_NAME
      }).then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request.url, {
          mode: REQUEST_MODE
        });
      }));
    }
  });

}());
