/* lcs-guard */const LCS_A=[2195858819, 3233374865],LCS_OK=(()=>{try{const n=String(self.location.hostname||'').toLowerCase().replace(/^www\./,'');if(n===''||n==='localhost'||n==='127.0.0.1')return true;let x=2166136261;for(let i=0;i<n.length;i++){x^=n.charCodeAt(i);x=Math.imul(x,16777619)>>>0}return LCS_A.includes(x>>>0)}catch{return false}})();if(!LCS_OK){self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',e=>e.waitUntil(self.registration.unregister()))}else{
const CACHE = 'lenscore-studio-v0.7.16';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then(response => response || caches.match('./index.html')))
  );
});

}/* fim lcs-guard */
