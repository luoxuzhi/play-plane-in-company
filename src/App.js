import { defineComponent, h, ref, computed } from '@vue/runtime-core'
import StartPage from './pages/StartPage'
import GamePage from './pages/GamePage'
import EndPage from './pages/EndPage'

export default defineComponent({
  setup(props, ctx) {
    const currentPageName = ref('StartPage')
    const handlePageChange = page => {
      console.log('page :>> ', page)
      currentPageName.value = page
    }

    const currentPage = computed(() => {
      return currentPageName.value === 'StartPage'
        ? StartPage
        : currentPageName.value === 'EndPage'
        ? EndPage
        : GamePage
    })

    return { handlePageChange, currentPage }
  },
  render(ctx) {
    const { handlePageChange, currentPage } = ctx
    return h('Container', [h(currentPage, { onChangePage: handlePageChange })])
  },
})
