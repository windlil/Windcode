import type { Ref } from 'vue'

export function useDrag(data: any, canvasRef: Ref<HTMLElement | undefined>, currentComponent: Ref<any>) {
  function _dragstart(component: any) {
    currentComponent.value = component
    canvasDragEventHandler()
  }

  function _dragenter(e: DragEvent) {
    e.dataTransfer!.dropEffect = 'move'
  }

  function _dragleave(e: DragEvent) {
    e.dataTransfer!.dropEffect = 'none'
  }

  function _dragover(e: DragEvent) {
    e.preventDefault()
  }

  function _drop(e: DragEvent) {
    data.value.block.push({
      type: currentComponent!.value.type,
      top: e.offsetY,
      left: e.offsetX,
      zIndex: 1,
      center: true
    })
    currentComponent.value = null
  }

  function _dragend() {
    canvasDragEventHandler(true)
  }

  function canvasDragEventHandler(isRemove = false) {
    if (canvasRef?.value) {
      if (!isRemove) {
        canvasRef.value?.addEventListener('dragenter', _dragenter)
        canvasRef.value?.addEventListener('dragleave', _dragleave)
        canvasRef.value?.addEventListener('dragover', _dragover)
        canvasRef.value?.addEventListener('drop', _drop)
      } else {
        canvasRef.value?.removeEventListener('dragenter', _dragenter)
        canvasRef.value?.removeEventListener('dragleave', _dragleave)
        canvasRef.value?.removeEventListener('dragover', _dragover)
        canvasRef.value?.removeEventListener('drop', _drop)
      }
    }
  }

  return {
    _dragstart,
    _dragend
  }
}
