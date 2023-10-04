import type { ComputedRef } from 'vue'

export function useMoveBlock(focusList: ComputedRef<any[]>) {
  const moveState = {
    startX: 0,
    startY: 0,
    currentFocus: focusList.value.map(({ top, left }) => ({ top, left }))
  }
  function _mousedown(e: MouseEvent) {
    moveState.startX = e.clientX
    moveState.startY = e.clientY
    document.addEventListener('mousemove', _mousemove)
  }
  function _mousemove(e: MouseEvent) {
    const { clientX: moveX, clientY: moveY } = e
    const blockMoveTop = moveY - moveState.startY
    const blockMoveLft = moveX - moveState.startX

    focusList.value.forEach((block, index) => {
      block.top = moveState.currentFocus[index].top + blockMoveTop
      block.left = moveState.currentFocus[index].left + blockMoveLft
    })
  }
  function _mouseup() {
    document.removeEventListener('mousedown', _mousedown)
    document.removeEventListener('mousemove', _mousemove)
  }
  if (focusList.value.length > 0) {
    document.addEventListener('mousedown', _mousedown)
    document.addEventListener('mouseup', _mouseup)
  }
}
