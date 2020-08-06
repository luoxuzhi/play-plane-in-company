import { defineComponent, h } from '@vue/runtime-core'
import enemyPlaneImg from '../assets/enemy.png'

export default defineComponent({
	render() {
		return h('Container', [h('Sprite', { texture: enemyPlaneImg })])
	}
})
