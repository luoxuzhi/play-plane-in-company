// console.log('main.js')
import { createApp } from './runtime-canvas'
import App from './App'
import { generateRootNode } from './Game'

createApp(App).mount(generateRootNode())
