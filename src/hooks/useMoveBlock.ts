import { reactive, type ComputedRef } from 'vue'
import { eventsBus } from '@/utils/emit'

interface blockConfig {
  top: number
  left: number
  zIndex: number
  type: string
  center: boolean
  focus?: boolean
  width?: number
  height?: number
}

export function useMoveBlock(focusList: ComputedRef<{ focus: any[]; unfocus: any[] }>, lastBlock: any, data: any) {
  const moveState: any = {
    startX: 0,
    startY: 0,
    isDrag: false,
    currentFocus: focusList.value.focus.map(({ top, left }) => ({ top, left }))
  }

  const lastBlockState = {
    startX: lastBlock.value.left,
    startY: lastBlock.value.top
  }

  const lineData = reactive({
    x: null,
    y: null
  })

  function _mousedown(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const { width: lastBlockWidth, height: lastBlockHeight } = lastBlock.value
    moveState.startX = e.clientX
    moveState.startY = e.clientY
    moveState.isDrag = false
    moveState.allLines = (function () {
      const { unfocus } = focusList.value
      const lines: {
        y: { top: number; linesTop: number }[]
        x: { left: number; linesLeft: number }[]
      } = {
        x: [],
        y: []
      };

      [...unfocus,
        {
          top: 0,
          left: 0,
          width: data.value.container.width,
          height: data.value.container.height,
        }
      ].forEach((block: blockConfig) => {
        const { top: compareTop, left: compareLeft, width, height } = block
        // 拖拽元素的顶对齐比较元素的顶
        lines.y.push({ top: compareTop, linesTop: compareTop })
        // 拖拽元素的底对齐比较元素的顶
        lines.y.push({ top: compareTop - lastBlockHeight, linesTop: compareTop })
        // 中间对中间
        lines.y.push({ top: compareTop + (height as number) / 2 - lastBlockHeight / 2, linesTop: compareTop + (height as number) / 2 })
        // 顶对底
        lines.y.push({ top: compareTop + (height as number), linesTop: compareTop + (height as number) })
        // 底对底
        lines.y.push({ top: compareTop + (height as number) - lastBlockHeight, linesTop: compareTop + (height as number) })
        // 左对左
        lines.x.push({ left: compareLeft, linesLeft: compareLeft })
        // 拖拽元素的左对齐比较元素的右
        lines.x.push({ left: compareLeft + (width as number), linesLeft: compareLeft + (width as number) })
        // 中间对中间
        lines.x.push({ left: compareLeft + (width as number) / 2 - lastBlockWidth / 2, linesLeft: compareLeft + (width as number) / 2 })
        // 拖拽元素的右边对齐比较元素的右
        lines.x.push({ left: compareLeft + (width as number) - lastBlockWidth, linesLeft: compareLeft + (width as number) })
        // 拖拽元素的右边对齐比较元素的左边
        lines.x.push({ left: compareLeft - lastBlockWidth, linesLeft: compareLeft })
      })
      return lines
    })()
    document.addEventListener('mousemove', _mousemove)
  }

  function _mousemove(e: MouseEvent) {
    if (!moveState.isDrag) {
      moveState.isDrag = true
      eventsBus.emit('drag:start')
    }
    let { clientX: moveX, clientY: moveY } = e
    let x = null
    let y = null

    const top = moveY - moveState.startY + lastBlockState.startY
    const left = moveX - moveState.startX + lastBlockState.startX

    for (let i = 0; i < moveState.allLines.y.length; i++) {
      const { top: t, linesTop } = moveState.allLines.y[i]
      if (Math.abs(t - top) < 10) {
        y = linesTop
        moveY = moveState.startY - lastBlockState.startY + t
        break
      }
    }

    for (let i = 0; i < moveState.allLines.x.length; i++) {
      const { left: l, linesLeft } = moveState.allLines.x[i]
      if (Math.abs(l - left) < 10) {
        x = linesLeft
        moveX = moveState.startX - lastBlockState.startX + l
        break
      }
    }

    lineData.x = x
    lineData.y = y
    const blockMoveTop = moveY - moveState.startY
    const blockMoveLft = moveX - moveState.startX

    focusList.value.focus.forEach((block, index) => {
      block.top = moveState.currentFocus[index].top + blockMoveTop
      block.left = moveState.currentFocus[index].left + blockMoveLft
    })
  }
  function _mouseup() {
    document.removeEventListener('mousedown', _mousedown)
    document.removeEventListener('mousemove', _mousemove)
    lineData.x = null
    lineData.y = null

    if (moveState.isDrag) {
      eventsBus.emit('drag:end')
      moveState.isDrag = false
    }
  }
  if (focusList.value.focus.length > 0) {
    document.addEventListener('mousedown', _mousedown)
    document.addEventListener('mouseup', _mouseup)
  }

  return {
    lineData
  }
}
