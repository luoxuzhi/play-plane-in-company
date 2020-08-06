import { defineComponent, h, reactive, onMounted, onUnmounted } from '@vue/runtime-core'
import Map from '../components/Map'
import Plane from '../components/Plane'
import EnemyPlane from '../components/EnemyPlane'
import Bully from '../components/Bully'
import { game } from '../Game'
import { objHitTest } from '../utils'

export default defineComponent({
	setup(props, ctx) {
		const planeInfo = useCreatePlane()

		// 创建敌军飞机
		const enemyPlanes = useCreateEnemyPlanes()

		// 创建子弹，维护数组
		const bullys = reactive([])
		window.addEventListener('keydown', (e) => {
			switch (e.code) {
				case 'Space':
					let bully = { x: planeInfo.x + 105, y: planeInfo.y - 45, width: 61, height: 99 }
					bullys.push(bully)
					break
			}
		})

		const handleTicker = () => {
			// 敌方飞机下移
			enemyPlanes.forEach((enemyInfo) => {
				enemyInfo.y++
			})

			// 子弹上移，移动速度比飞机快
			if (bullys.length) {
				bullys.forEach((bully) => {
					bully.y -= 5
				})
			}

			enemyPlanes.forEach((enemyInfo) => {
				if (objHitTest(enemyInfo, planeInfo)) {
					ctx.emit('changePage', 'EndPage')
				}
				bullys.forEach((bully) => {
					if (objHitTest(enemyInfo, bully)) {
						enemyInfo.y = 0
					}
				})
			})
		}
		onMounted(() => {
			game.ticker.add(handleTicker)
		})

		onUnmounted(() => {
			game.ticker.remove(handleTicker)
		})

		return { planeInfo, enemyPlanes, bullys }
	},

	render(ctx) {
		const { planeInfo, enemyPlanes, bullys } = ctx
		const createEnemyPlanes = () => {
			return enemyPlanes.map((enemyInfo) => {
				return h(EnemyPlane, { x: enemyInfo.x, y: enemyInfo.y })
			})
		}

		const createBully = () => {
			return bullys.map((bully) => h(Bully, { x: bully.x, y: bully.y }))
		}

		return h('Container', [
			h(Map),
			h(Plane, { x: planeInfo.x, y: planeInfo.y }),
			...createEnemyPlanes(),
			...createBully()
		])
	}
})

function useCreatePlane() {
	const planeInfo = reactive({ x: 220, y: 700, width: 258, height: 364 })
	const distance = 10
	window.addEventListener('keydown', (e) => {
		switch (e.code) {
			case 'ArrowUp':
				planeInfo.y -= distance
				break

			case 'ArrowDown':
				planeInfo.y += distance
				break

			case 'ArrowLeft':
				planeInfo.x -= distance
				break

			case 'ArrowRight':
				planeInfo.x += distance
				break
		}
	})
	return planeInfo
}

function useCreateEnemyPlanes() {
	const enemyPlanes = reactive([
		{ x: 50, y: 0, width: 308, height: 207 },
		{ x: 400, y: 0, width: 308, height: 207 }
	])
	return enemyPlanes
}

function useCreateBullyArray() {
	const bullys = reactive([])
	window.addEventListener('keydown', (e) => {
		switch (e.code) {
			case 'Space':
				let bully = { x: planeInfo.x + 105, y: planeInfo.y - 45 }
				bullys.push(bully)
				break
		}
	})
	return bullys
}
