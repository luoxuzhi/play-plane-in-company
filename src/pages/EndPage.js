import { defineComponent, h } from '@vue/runtime-core'
import endPageImg from '../assets/start_page.jpg'
import restartBtnImg from '../assets/restartBtn.png'

export default defineComponent({
	setup(props, ctx) {
		const onClick = () => {
			ctx.emit('changePage', 'GamePage')
		}
		return { onClick }
	},
	render(ctx) {
		return h('Container', [
			h('Sprite', { texture: endPageImg }),
			h('Sprite', {
				texture: restartBtnImg,
				x: 228,
				y: 514,
				interactive: true,
				onClick: ctx.onClick
			})
		])
	}
})
