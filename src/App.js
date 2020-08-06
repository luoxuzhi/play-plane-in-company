import { defineComponent, h, ref, computed } from '@vue/runtime-core'
import StartPage from './pages/StartPage'
import GamePage from './pages/GamePage'
import EndPage from './pages/EndPage'

export default defineComponent({
	setup(props, ctx) {
		const currentPageName = ref('StartPage')

		const handleChangePage = (page) => {
			currentPageName.value = page
		}

		const currentPage = computed(() => {
			if (currentPageName.value === 'StartPage') {
				return StartPage
			} else if (currentPageName.value === 'GamePage') {
				return GamePage
			} else if (currentPageName.value === 'EndPage') {
				return EndPage
			}
		})

		return { handleChangePage, currentPage }
	},
	render(ctx) {
		const { handleChangePage, currentPage } = ctx
		return h('Container', [
			h(currentPage, {
				onChangePage: handleChangePage
			})
		])
	}
})
