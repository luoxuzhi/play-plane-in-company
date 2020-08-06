import { defineComponent, h } from '@vue/runtime-core'
import planeImg from '../assets/plane.png'

export default defineComponent({
	render() {
		return h('Container', [h('Sprite', { texture: planeImg })])
	}
})
