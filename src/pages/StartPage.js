import { defineComponent, h } from '@vue/runtime-core'
import startPageImg from '../assets/start_page.jpg'
import startBtnImg from '../assets/startBtn.png'

export default defineComponent({
  setup(props, { emit }) {
    const onClick = () => {
      emit('changePage', 'GamePage')
    }
    return { onClick }
  },
  render(ctx) {
    const { onClick } = ctx
    return h('Container', [
      h('Sprite', { texture: startPageImg }),
      h('Sprite', { texture: startBtnImg, x: 225, y: 514, interactive: true, onClick }),
    ])
  },
})
