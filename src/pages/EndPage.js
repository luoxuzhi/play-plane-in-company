import { defineComponent, h } from '@vue/runtime-core'
import endPageImg from '../assets/end_page.jpg'
import restartBtnImg from '../assets/restartBtn.png'

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
      h('Sprite', { texture: endPageImg }),
      h('Sprite', { texture: restartBtnImg, x: 225, y: 514, interactive: true, onClick }),
    ])
  },
})
