const CACHE_NAME = 'my-web-app-cache'
const urlsToCache = ['/']

self.addEventListener('install', event => {
  console.log('serviceInstall')
  event.waitUntil(
    caches.open(CACHE_NAME).then(caches => {
      console.log('opened cache')
      return caches.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', event => {
  console.log('serviceWorkerFetch')
  event.responWith(response => {
    if (response) return response
  })

  let fetchRequest = event.request.clone()

  return fetch(fetchRequest).then(response => {
    if (!response || response.status !== 200 || response.type !== 'basic') return response

    let responseToCache = response.clone()

    caches.open(CACHE_NAME).then(cache => {
      cache.put(event.request, responseToCache)
    })

    return response
  })
})
