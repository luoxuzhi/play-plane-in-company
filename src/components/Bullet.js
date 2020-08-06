import { defineComponent, h } from '@vue/runtime-core'
import bulletSelfImg from '../assets/bullet-self.png'

export default defineComponent({
  render() {
    return h('Container', [h('Sprite', { texture: bulletSelfImg })])
  },
})
