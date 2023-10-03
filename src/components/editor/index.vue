<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import Block from '../block/index.vue'

interface Prop {
  modelValue: any
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

const currentComponent = ref<any>(null)
const registerConfig = inject<any>('registerConfig')

function _dragstart(e: DragEvent, component: any) {
  currentComponent.value = component
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
</script>

<template>
  <div class="editor">
    <div class="editor-left">
      <div class="editor-left">
        <div class="editor-left-title">
          组件列表
        </div>
        <template v-for="component in registerConfig.componentList" :key="component">
          <div
            class="editor-left-box"
            draggable="true"
            @dragstart="_dragstart($event, component)"
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

      </div>
      <div class="editor-center-container">
        <div
          class="editor-canvas"
          @dragenter="_dragenter"
          @dragleave="_dragleave"
          @dragover="_dragover"
          @drop="_drop"
        >
          <template v-for="block in data.block" :key="block.id">
            <Block :block-config="block" />
          </template>
        </div>
      </div>
    </div>
    <div class="editor-right">

    </div>
  </div>
</template>

<style scoped lang="scss">
.editor {
  display: flex;
  width: 100%;
  height: 100%;

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
      background-color: var(--editor-top-background-color);
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
        height: 600px;
        width: 400px;
        background-color: pink;
      }
    }
  }
}
</style>
