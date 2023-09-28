import { Button } from 'vant'

function createConfigg() {
  // const componentList = []
  const componentMap = new Map()

  return {
    componentMap,
    register(component) {
      componentMap.set(component.type, component)
    }
  }
}

export const registerConfig = createConfigg()

registerConfig.register({
  type: 'text',
  preview: () => <span>标准文本</span>
})

registerConfig.register({
  type: 'button',
  preview: () => <Button type="primary">标准按钮</Button>
})
