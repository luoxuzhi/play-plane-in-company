import { defineComponent, h } from '@vue/runtime-core'
import bunnySelfImg from '../assets/bunny-self.png'

export default defineComponent({
	render() {
		return h('Container', [h('Sprite', { texture: bunnySelfImg })])
	}
})
