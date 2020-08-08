import { defineComponent, h, ref, onMounted, onUnmounted } from '@vue/runtime-core'
import mapImg from '../assets/map.jpg'
import { CONTAINER_HEIGHT } from '../utils'
import { game } from '../Game'

export default defineComponent({
	setup() {
		const mapY1 = ref(0)
		const mapY2 = ref(-CONTAINER_HEIGHT)

		const speed = 12

		const handleMapTicker = () => {
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
			game.ticker.add(handleMapTicker)
		})

		onUnmounted(() => {
			game.ticker.remove(handleMapTicker)
		})

		return { mapY1, mapY2 }
	},
	render(ctx) {
		const { mapY1, mapY2 } = ctx
		return h('Container', [
			h('Sprite', { texture: mapImg, y: mapY1 }),
			h('Sprite', {
				texture: mapImg,
				y: mapY2
			})
		])
	}
})
