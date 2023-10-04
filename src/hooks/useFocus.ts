import { computed } from 'vue'

export function useFocus(data: any, callback: any) {
  function clearAllFocus() {
    data.value.block.forEach((block: any) => {
      block.focus = false
    })
  }

  function _mouseDown(e: MouseEvent, block: any) {
    e.preventDefault()
    e.stopPropagation()
    if (e.ctrlKey) {
      block.focus = !block.focus
      callback()
      return
    }
    if (!block.focus) {
      clearAllFocus()
    }
    block.focus = !block.focus
    callback()
  }

  const focusList = computed(() => {
    const list = data.value.block.filter((block: any) => {
      return block.focus
    })
    return list
  })

  // 点击画板取消焦点
  function canvasClick() {
    clearAllFocus()
  }

  return {
    _mouseDown,
    canvasClick,
    focusList
  }
}
