import { defineComponent, h, reactive, onMounted, onUnmounted, ref } from '@vue/runtime-core'
import Map from '../components/Map'
import Plane from '../components/Plane'
import Bullet from '../components/Bullet'
import EnemyPlane from '../components/EnemyPlane'
import EnemyBullet from '../components/EnemyBullet'
import Score from '../components/Scroe'
import { game } from '../Game'
import { CONTAINER_WIDTH, CONTAINER_HEIGHT, objHitTest, debounce } from '../utils'

export default defineComponent({
  setup(props, { emit }) {
    const planeInfo = useCreatePlane()
    const selfBulletsArray = useCreateSelfBullet(planeInfo)
    const { enemyPlanesInfo, addEnemyPlane } = useCreateEnemyPlanes()
    const enemyBulletsArray = reactive([])
    const score = ref(0)

    useFighting(planeInfo, selfBulletsArray, enemyPlanesInfo, addEnemyPlane, enemyBulletsArray, score, emit)

    return { planeInfo, selfBulletsArray, enemyPlanesInfo, enemyBulletsArray, score }
  },
  render(ctx) {
    const { planeInfo, selfBulletsArray, enemyPlanesInfo, enemyBulletsArray, score } = ctx

    const createEnemyPlanes = () => {
      return enemyPlanesInfo.map(enemyIfo => {
        return h(EnemyPlane, { x: enemyIfo.x, y: enemyIfo.y })
      })
    }

    const createSelfBullets = () => {
      return selfBulletsArray.map(selfBulletInfo => {
        return h(Bullet, { x: selfBulletInfo.x, y: selfBulletInfo.y })
      })
    }

    const creatEnemyBullets = () => {
      return enemyBulletsArray.map(eBulletInfo => {
        return h(EnemyBullet, { x: eBulletInfo.x, y: eBulletInfo.y })
      })
    }

    return h('Container', [
      h(Map),
      h(Plane, { x: planeInfo.x, y: planeInfo.y }),
      h(Score, { score, x: 600, y: 50 }),
      ...createSelfBullets(),
      ...createEnemyPlanes(),
      ...creatEnemyBullets(),
    ])
  },
})

function useCreatePlane() {
  // 我方飞机高度设置小于实际边框宽度，使得视觉上看是敌方子弹和飞机碰撞后才消失
  const planeInfo = reactive({ x: 220, y: 700, width: 240, height: 280 })
  const distance = 30
  window.addEventListener('keydown', e => {
    switch (e.code) {
      case 'ArrowUp':
        planeInfo.y -= distance
        break
      case 'ArrowDown':
        planeInfo.y += distance
        break
      case 'ArrowRight':
        planeInfo.x += distance
        break
      case 'ArrowLeft':
        planeInfo.x -= distance
        break
    }
  })
  return planeInfo
}

function useCreateSelfBullet(planeInfo) {
  const selfBullets = reactive([])
  window.addEventListener(
    'keydown',
    debounce(e => {
      switch (e.code) {
        case 'Space':
          selfBullets.push({ x: planeInfo.x + 105, y: planeInfo.y - 45, width: 61, height: 99 })
          break
      }
    }, 1000)
  )
  return selfBullets
}

function useCreateEnemyPlanes() {
  const enemyPlanesInfo = reactive([{ x: 0, y: 0, width: 308, height: 207, direction: 'r' }])
  const addEnemyPlane = () => {
    let x = (CONTAINER_WIDTH - 308) * Math.random().toFixed(2)
    let y = 100 * Math.random().toFixed(2)
    enemyPlanesInfo.push({ x, y, width: 308, height: 207, direction: 'r' })
  }
  return { enemyPlanesInfo, addEnemyPlane }
}

// 方法中的所有splice都是为了减少数组长度从而减少遍历次数，优化性能
function useFighting(
  planeInfo,
  selfBulletsArray,
  enemyPlanesInfo,
  addEnemyPlane,
  enemyBulletsArray,
  score,
  emit
) {
  const enemyPlaneMoveSpeed = 1
  const bulletMoveSpeend = 2
  const handleEnemyCountAndMoveTicker = () => {
    // 敌方飞机移动并且产生子弹
    enemyPlanesInfo.forEach((eInfo, index) => {
      // r代表右移
      eInfo.y += enemyPlaneMoveSpeed / 5
      // 敌方飞机触底后从数组移除，添加新的飞机
      if (eInfo.y + 200 >= CONTAINER_HEIGHT) {
        enemyPlanesInfo.splice(index, 1)
        addEnemyPlane()
      }
      // 飞机碰到右边后左移
      if (eInfo.direction === 'r') {
        eInfo.x += enemyPlaneMoveSpeed
        if (eInfo.x + eInfo.width >= CONTAINER_WIDTH) {
          eInfo.x = CONTAINER_WIDTH - eInfo.width
          eInfo.direction = 'l'
        }
      } else {
        eInfo.x -= enemyPlaneMoveSpeed
        if (eInfo.x <= 0) {
          eInfo.direction = 'r'
        }
      }
      // 敌方添加子弹，分母愈大，敌方子弹越少
      if (eInfo.x % 110 === 0) {
        enemyBulletsArray.push({ x: eInfo.x + 128, y: eInfo.y + 207, width: 61, height: 10 })
      }
    })

    // 我方子弹自动上移
    selfBulletsArray.forEach((selfBullet, index) => {
      selfBullet.y -= bulletMoveSpeend
      if (selfBullet.y <= 0) {
        selfBulletsArray.splice(index, 1)
      }
    })

    // 敌方子弹自动移动
    if (enemyBulletsArray.length) {
      enemyBulletsArray.forEach((eBullet, index) => {
        eBullet.y += bulletMoveSpeend
        if (eBullet.y >= CONTAINER_HEIGHT) {
          enemyBulletsArray.splice(index, 1)
        }
      })
    }

    // 保持敌方数量
    if (enemyPlanesInfo.length < 3) {
      addEnemyPlane()
    }
  }

  const handleHitTestTicker = () => {
    // 子弹碰撞检测
    enemyBulletsArray.forEach((eBullet, index) => {
      selfBulletsArray.forEach((sBullet, sIndex) => {
        if (objHitTest(eBullet, sBullet)) {
          enemyBulletsArray.splice(index, 1)
          selfBulletsArray.splice(sIndex, 1)
        }
      })
      // 敌方子弹和我方飞机碰撞检测
      if (objHitTest(eBullet, planeInfo)) {
        emit('changePage', 'EndPage')
      }
    })

    // 敌方飞机和我方子弹碰撞检测
    enemyPlanesInfo.forEach((ePlaneInfo, index) => {
      selfBulletsArray.forEach((sBullet, sIndex) => {
        if (objHitTest(ePlaneInfo, sBullet)) {
          score.value++
          enemyPlanesInfo.splice(index, 1)
          selfBulletsArray.splice(sIndex, 1)
        }
      })
    })
  }

  onMounted(() => {
    game.ticker.add(handleEnemyCountAndMoveTicker)
    game.ticker.add(handleHitTestTicker)
  })

  onUnmounted(() => {
    game.ticker.remove(handleEnemyCountAndMoveTicker)
    game.ticker.remove(handleHitTestTicker)
  })
}
