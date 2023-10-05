<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { showConfirmDialog } from 'vant'
import { inject, reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'
import Block from '../block/index.vue'
import { useDrag } from '@/hooks/useDrag'
import { useFocus } from '@/hooks/useFocus'
import { useMoveBlock } from '@/hooks/useMoveBlock'
import { useCommand } from '@/hooks/useCommand'
import { useDataStore } from '@/store/modules/data'

interface buttonListItem {
  label: string
  icon: string
  handler: () => any
}

const dataStore = useDataStore()
const { data } = storeToRefs(dataStore)

const canvasRef = ref<HTMLElement>()
const currentComponent = ref<any>(null)
const registerConfig = inject<any>('registerConfig')
let _lineData = reactive<any>({})
const { state } = useCommand(data, dataStore.setData)

// Dialog
const show = ref(false)
const dialogTitle = ref('')

// 导入导出数据
const useData = reactive({
  exportData: '',
  importData: ''
})
const currentOpen = ref('')

function importData() {
  try {
    data.value = JSON.parse(useData.importData)
  }
  catch {
    console.warn('请输入正确的格式')
  }
  useData.importData = ''
}

const buttonList: buttonListItem[] = [
  {
    label: '撤销',
    icon: 'mingcute:back-2-fill',
    handler() {
      state.commands.back.back()
    },
  },
  {
    label: '重置',
    icon: 'grommet-icons:power-reset',
    handler() {
      showConfirmDialog({
        title: '重置',
        message:
          '是否确认重置',
      })
        .then(() => {
          state.commands.reset.reset()
        })
    }
  },
  {
    label: '导出',
    icon: 'mingcute:file-import-line',
    handler() {
      currentOpen.value = 'exportData'
      show.value = true
      dialogTitle.value = '导出数据'
      useData.exportData = JSON.stringify(state.commands.export.export())
    }
  },
  {
    label: '导入',
    icon: 'mingcute:file-export-line',
    handler() {
      currentOpen.value = 'importData'
      show.value = true
      dialogTitle.value = '导入数据'
      state.commands.import.import()
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
            <div class="editor-center-top-button" @click="button.handler">
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
            <Block
              :style="{
                top: `${block.top}px`,
                left: `${block.left}px`,
                zIndex: block.zIndex,
              }"
              :class="{ focus: block?.focus }"
              :block-config="block"
              @click="_mouseDown($event, block, index)"
            />
          </template>
          <div v-if="_lineData?.x" :style="{ left: `${_lineData.x}px` }" class="lineX" />
          <div v-if="_lineData?.y" :style="{ top: `${_lineData.y}px` }" class="lineY" />
        </div>
      </div>
    </div>
    <div class="editor-right">
      1
    </div>
    <van-dialog
      v-model:show="show"
      :show-confirm-button="currentOpen === 'importData'"
      show-cancel-button class="diglog" width="500"
      :title="dialogTitle"
      @confirm="importData"
    >
      <textarea v-model="(useData as any)[currentOpen]" cols="50" rows="25" />
    </van-dialog>
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
          transition: all 0.2s;
          .icon {
            font-size: 20px;
          }

          &__tip {
            margin-left: 6px;
          }

          &:hover {
            color: #54a9fd;
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

  .diglog {
    textarea {
      box-sizing: border-box;
      outline: none;
      padding: 10px;
      margin-top: 20px;
      border: 1px solid #dddddd;
      resize: none;
    }
  }
}

:deep(.van-dialog__content) {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
