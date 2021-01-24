import { Application } from 'pixi.js'
import { CONTAINER_WIDTH, CONTAINER_HEIGHT } from './utils'

export const game = new Application({
  width: CONTAINER_WIDTH,
  height: CONTAINER_HEIGHT,
})

document.body.append(game.view)

export const generateRootNode = () => game.stage
