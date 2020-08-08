import { defineComponent, h, ref, onMounted, onUnmounted } from '@vue/runtime-core'
import mapImg from '../assets/map.jpg'
import { game } from '../Game'
import { CONTAINER_HEIGHT } from '../utils'

export default defineComponent({
  setup() {
    const mapY1 = ref(0)
    const mapY2 = ref(-CONTAINER_HEIGHT)
    const speed = 12

    const handleMapMoveTicker = () => {
      mapY1.value += speed
      mapY2.value += speed

      if (mapY1.value >= CONTAINER_HEIGHT) {
        mapY1.value = -CONTAINER_HEIGHT
      }

      if (mapY2.value >= CONTAINER_HEIGHT) {
        mapY2.value = -CONTAINER_HEIGHT
      }
    }

    onMounted(() => {
      game.ticker.add(handleMapMoveTicker)
    })

    onUnmounted(() => {
      game.ticker.remove(handleMapMoveTicker)
    })

    return { mapY1, mapY2 }
  },
  render(ctx) {
    const { mapY1, mapY2 } = ctx
    return h('Container', [
      h('Sprite', { texture: mapImg, y: mapY1 }),
      h('Sprite', { texture: mapImg, y: mapY2 }),
    ])
  },
})
