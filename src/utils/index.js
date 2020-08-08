import { apply } from 'file-loader'

export const CONTAINER_WIDTH = 750
export const CONTAINER_HEIGHT = 1080

export const objHitTest = (objA, objB) => {
  return (
    objA.x + objA.width >= objB.x &&
    objB.x + objB.width >= objA.x &&
    objA.y + objA.height >= objB.y &&
    objB.y + objB.height >= objA.y
  )
}

export const debounce = (fn, delay) => {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    fn.apply(this, args)
  }
}
