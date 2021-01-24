import createApp from './runtime-canvas'
import App from './App'
import { generateRootNode } from './Game'

createApp(App).mount(generateRootNode())

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(_ => {
        console.log('ServiceWorker registation successfull')
      })
      .catch(err => {
        console.log('ServiceWorker registration failer:', err)
      })
  })
}
