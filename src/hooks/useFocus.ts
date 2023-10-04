import { computed, ref } from 'vue'

export function useFocus(data: any, callback: any) {
  const selectedIndex = ref(-1)
  const lastSelectedIndexBlock = computed(() => {
    return data.value.block[selectedIndex.value]
  })

  function clearAllFocus() {
    selectedIndex.value = -1
    data.value.block.forEach((block: any) => {
      block.focus = false
    })
  }

  function _mouseDown(e: MouseEvent, block: any, index: number) {
    e.preventDefault()
    e.stopPropagation()
    if (e.ctrlKey) {
      block.focus = !block.focus
      selectedIndex.value = index
      callback()
      return
    }
    if (!block.focus) {
      clearAllFocus()
    }
    selectedIndex.value = index
    block.focus = !block.focus
    callback()
  }

  const focusData = computed(() => {
    const focus: any[] = []
    const unfocus: any[] = []
    data.value.block.forEach((block: any) => block.focus ? focus.push(block) : unfocus.push(block))
    return {
      focus,
      unfocus
    }
  })

  // 点击画板取消焦点
  function canvasClick() {
    clearAllFocus()
  }

  return {
    _mouseDown,
    canvasClick,
    focusData,
    lastSelectedIndexBlock
  }
}
