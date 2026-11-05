const CACHE = "alarmeg-v2-2026-11-05";
const STATIC = ["./", "./index.html", "./manifest.json", "./assets/alarmeg-logo.svg"];
self.addEventListener("install", e => {e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)));self.skipWaiting();});
self.addEventListener("activate", e => {e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch", e => {
 if(e.request.method!=="GET" || !e.request.url.startsWith(self.location.origin)) return;
 if(e.request.mode==="navigate"){
   e.respondWith(fetch(e.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return response;}).catch(()=>caches.match(e.request)));
   return;
 }
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));
});
