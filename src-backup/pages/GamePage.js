import { defineComponent, h, reactive, onMounted, onUnmounted } from '@vue/runtime-core'
import Map from '../components/Map'
import Plane from '../components/Plane'
import EnemyPlane from '../components/EnemyPlane'
import Bullet from '../components/Bullet'
import { game } from '../Game'
import { objHitTest } from '../utils'

export default defineComponent({
  setup(props, ctx) {
    const planeInfo = useCreatePlane()

    // 创建敌军飞机
    const enemyPlanes = useCreateEnemyPlanes()

    // 创建子弹，维护数组方式一
    // const bullets = reactive([])
    // window.addEventListener('keydown', (e) => {
    // 	switch (e.code) {
    // 		case 'Space':
    // 			let bullet = { x: planeInfo.x + 105, y: planeInfo.y - 45, width: 61, height: 99 }
    // 			bullets.push(bullet)
    // 			break
    // 	}
    // })

    // 创建子弹，维护数组方式二，将我方飞机的信息当成参数传递进去，获取我方飞机的实时位置
    const bullets = useCreateBulletArray(planeInfo)

    const handleTicker = () => {
      // 敌方飞机下移
      enemyPlanes.forEach(enemyInfo => {
        enemyInfo.y++
      })

      // 子弹上移，移动速度比飞机快
      if (bullets.length) {
        bullets.forEach(bullet => {
          bullet.y -= 5
        })
      }

      enemyPlanes.forEach(enemyInfo => {
        if (objHitTest(enemyInfo, planeInfo)) {
          ctx.emit('changePage', 'EndPage')
        }
        bullets.forEach(bullet => {
          if (objHitTest(enemyInfo, bullet)) {
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

    return { planeInfo, enemyPlanes, bullets }
  },

  render(ctx) {
    const { planeInfo, enemyPlanes, bullets } = ctx
    const createEnemyPlanes = () => {
      return enemyPlanes.map(enemyInfo => {
        return h(EnemyPlane, { x: enemyInfo.x, y: enemyInfo.y })
      })
    }

    const createBullet = () => {
      return bullets.map(bullet => h(Bullet, { x: bullet.x, y: bullet.y }))
    }

    return h('Container', [
      h(Map),
      h(Plane, { x: planeInfo.x, y: planeInfo.y }),
      ...createEnemyPlanes(),
      ...createBullet(),
    ])
  },
})

function useCreatePlane() {
  const planeInfo = reactive({ x: 220, y: 700, width: 258, height: 364 })
  const distance = 10
  window.addEventListener('keydown', e => {
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
    { x: 400, y: 0, width: 308, height: 207 },
  ])
  return enemyPlanes
}

function useCreateBulletArray(planeInfo) {
  const bullets = reactive([])
  window.addEventListener('keydown', e => {
    switch (e.code) {
      case 'Space':
        let bullet = { x: planeInfo.x + 105, y: planeInfo.y - 45, width: 61, height: 99 }
        bullets.push(bullet)
        break
    }
  })
  return bullets
}
