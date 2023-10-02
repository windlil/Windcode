import { Button } from 'vant'

function createConfigg() {
  const componentList = []
  const componentMap = new Map()

  return {
    componentMap,
    componentList,
    register(component) {
      componentMap.set(component.type, component)
      componentList.push(component)
    }
  }
}

export const registerConfig = createConfigg()

registerConfig.register({
  id: 1,
  type: 'text',
  label: '文本',
  preview: () => <span>预览文本</span>,
  render: () => <span>标准文本</span>
})

registerConfig.register({
  id: 2,
  type: 'button',
  label: '按钮',
  preview: () => <Button type="primary">预览按钮</Button>,
  render: () => <Button type="primary">标准按钮</Button>
})
