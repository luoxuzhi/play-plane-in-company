import { createRenderer } from '@vue/runtime-core'
import { Graphics, Container, Sprite, Text, Texture } from 'pixi.js'

const renderer = createRenderer({
  createElement(type) {
    let element
    switch (type) {
      case 'rect':
        element = new Graphics()
        element.beginFill(0xff0000)
        element.drawRect(0, 0, 150, 150)
        element.endFill()
        break
      case 'Container':
        element = new Container()
        break
      case 'Sprite':
        element = new Sprite()
        break

      case 'Text':
        element = new Text()
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
    let parent = el.parent
    if (parent) {
      parent.removeChild(el)
    }
  },
  patchProp(el, key, prevValue, nextValue) {
    switch (key) {
      case 'texture':
        el.texture = Texture.from(nextValue)
        break
      case 'onClick':
        el.on('pointertap', nextValue)
        break
      case 'score':
        el.text = `分数:${nextValue}`
        break
      default:
        el[key] = nextValue
        break
    }
  },
  setElementText(node, text) {
    node.text = text
  },
  createComment() {},
  parentNode(node) {},
  nextSibling() {},
})

export default function (rootNode) {
  return renderer.createApp(rootNode)
}
