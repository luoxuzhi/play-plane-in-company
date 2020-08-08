import { defineComponent, h } from '@vue/runtime-core'
import enemyBulletImg from '../assets/bullet.png'

export default defineComponent({
  render() {
    return h('Container', [h('Sprite', { texture: enemyBulletImg })])
  },
})
