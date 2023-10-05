<script setup lang="ts">
import { computed, inject, reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'
import Block from '../block/index.vue'
import { useDrag } from '@/hooks/useDrag'
import { useFocus } from '@/hooks/useFocus'
import { useMoveBlock } from '@/hooks/useMoveBlock'

interface Prop {
  modelValue: any
}

interface buttonListItem {
  label: string
  icon: string
  handler: () => any
}

const props = defineProps<Prop>()
const emit = defineEmits(['update:modelValue'])
const data = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', structuredClone(newValue))
  }
})

const canvasRef = ref<HTMLElement>()
const currentComponent = ref<any>(null)
const registerConfig = inject<any>('registerConfig')
let _lineData = reactive<any>({})

const buttonList: buttonListItem[] = [
  {
    label: '撤销',
    icon: 'mingcute:back-2-fill',
    handler() {
      console.log('撤销')
    },
  },
  {
    label: '重做',
    icon: 'grommet-icons:power-reset',
    handler() {
      console.log('重做')
    }
  }
]
// 绑定拖拽事件
const { _dragstart, _dragend } = useDrag(data, canvasRef, currentComponent)

// 焦点获取
const { _mouseDown, canvasClick, focusData, lastSelectedIndexBlock } = useFocus(data, () => {
  // block拖拽
  const { lineData } = useMoveBlock(focusData, lastSelectedIndexBlock, data)
  _lineData = lineData
})
</script>

<template>
  <div class="editor">
    <div class="editor-left">
      <div class="editor-left" @mousedown="canvasClick">
        <div class="editor-left-title">
          组件列表
        </div>
        <template v-for="component in registerConfig.componentList" :key="component">
          <div
            class="editor-left-box"
            draggable="true"
            @dragstart="_dragstart(component)"
            @dragend="_dragend"
          >
            <component :is="component.preview()" />
            <div class="editor-left-box__name">
              {{ component.label }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="editor-center">
      <div class="editor-center-top">
        <div class="editor-center-top-button-group">
          <template v-for="button in buttonList" :key="button.label">
            <div class="editor-center-top-button">
              <Icon class="icon" :icon="button.icon" />
              <span class="editor-center-top-button__tip">
                {{ button.label }}
              </span>
            </div>
          </template>
        </div>
      </div>
      <div class="editor-center-container">
        <div
          ref="canvasRef"
          class="editor-canvas"
          :style="{
            width: `${data.container.width}px`,
            height: `${data.container.height}px`,
          }"
          @click="canvasClick"
        >
          <template v-for="(block, index) in data.block" :key="block.id">
            <Block :class="{ focus: block?.focus }" :block-config="block" @click="_mouseDown($event, block, index)" />
          </template>
          <div v-if="_lineData?.x" :style="{ left: `${_lineData.x}px` }" class="lineX" />
          <div v-if="_lineData?.y" :style="{ top: `${_lineData.y}px` }" class="lineY" />
        </div>
      </div>
    </div>
    <div class="editor-right">
      1
    </div>
  </div>
</template>

<style scoped lang="scss">
.lineX {
  position: absolute;
  top: 0;
  bottom: 0;
  border: 1px dashed red;
}

.lineY {
  position: absolute;
  left: 0;
  right: 0;
  border: 1px dashed red;
}
.focus {
  &::after {
    border: 4px dashed rgb(255, 98, 0);
  }
}
.editor {
  display: flex;
  width: 100%;
  height: 100%;
  user-select: none;

  &>div {
    height: 100%;
  }

  &-left {
    width: 340px;
    background-color: var(--eidtor-sider-background-color);
    overflow: auto;
    user-select: none;

    &-title {
      width: 100%;
      height: 50px;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      background-color: #18181b;
    }

    &-box {
      position: relative;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 100px;
      min-height: 100px;
      margin: 10px;
      background-color: #fff;
      border-radius: 15px;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
      }

      &__name {
        position: absolute;
        font-size: 12px;
        bottom: 5px;
        right: 10px;
        padding: 4px 12px;
        border-radius: 10px;
        background-color: #e4e4e49d;
        color: #9c9c9c;
      }
    }
  }

  &-right {
    width: 340px;
    background-color: var(--eidtor-sider-background-color);
  }

  &-center {
    display: flex;
    flex-direction: column;
    flex: 1;

    &-top {
      height: 50px;
      border-left: 1px solid #454545;
      background-color: var(--editor-top-background-color);

      &-button-group {
        display: flex;
        width: 100%;
        height: 100%;
        padding-left: 10px;

        .editor-center-top-button {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px;
          cursor: pointer;
          color: #cccccc;
          .icon {
            font-size: 20px;
          }

          &__tip {
            margin-left: 6px;
          }
        }
      }
    }

    &-container {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      overflow: auto;
      background-color: var(--editor-center-background-color);

      // 画布
      .editor-canvas {
        position: relative;
        background-color: rgb(227, 227, 227);
      }
    }
  }
}
</style>
