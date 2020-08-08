import { createRenderer } from '@vue/runtime-core'
import { Container, Sprite, Texture } from 'pixi.js'

const renderer = createRenderer({
	createElement(type) {
		let element
		switch (type) {
			case 'Container':
				element = new Container()
				break

			case 'Sprite':
				element = new Sprite()
				break

			default:
				break
		}
		return element
	},
	insert(el, parent) {
		parent.addChild(el)
	},
	remove(el) {
		const parent = el.parent
		if (parent) {
			parent.removeChild(el)
		}
	},
	parentNode(node) {},
	nextSibling(node) {},
	createComment() {},
	patchProp(el, key, prevValue, nextValue) {
		switch (key) {
			case 'texture':
				el.texture = Texture.from(nextValue)
				break

			case 'onClick':
				el.on('pointertap', nextValue)
				break

			default:
				el[key] = nextValue
				break
		}
	}
})

export const createApp = (rootNode) => {
	return renderer.createApp(rootNode)
}
