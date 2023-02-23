const cacheableApiCalls = ["/api/geolocation", "/v1/forecast"];

const putInCache = async (request, response) => {
  const cache = await caches.open("v1");

  await cache.put(request, response);
};

const fetchFromNetwork = async (request) => {
  const responseFromNetwork = await fetch(request);

  putInCache(request, responseFromNetwork.clone());

  return responseFromNetwork;
};

const cacheFirst = async (request) => {
  console.log(request.url);

  if (navigator.onLine && cacheableApiCalls.find((url) => request.url.includes(url))) {
    console.log("Fetching api call while online");
    fetchFromNetwork(request);
  }

  const responseFromCache = await caches.match(request);

  if (responseFromCache) {
    return responseFromCache;
  }

  return fetchFromNetwork(request);
};

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});
