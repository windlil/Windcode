<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'

interface Prop {
  blockConfig: {
    top: number
    left: number
    zIndex: number
    type: string
    center: boolean
    focus?: boolean
    width?: number
    height?: number
  }
}

const props = defineProps<Prop>()
const registerConfig = inject('registerConfig')
const { blockConfig } = props

const currentComponentRef = ref()
const setCurrentComponentRef = function (e: any) {
  currentComponentRef.value = e
}

const style = computed(() => {
  return {
    top: `${blockConfig.top}px`,
    left: `${blockConfig.left}px`,
    zIndex: `${blockConfig.zIndex}`,
  }
})

const currentComponent = computed(() => {
  return (registerConfig as any).componentMap.get(blockConfig.type).render()
})

onMounted(() => {
  if (blockConfig.center && currentComponentRef.value) {
    // 判断是否为vant组件
    const el: HTMLElement = currentComponentRef.value.$el ?? currentComponentRef.value
    blockConfig.top = blockConfig.top - el.offsetHeight / 2
    blockConfig.left = blockConfig.left - el.offsetWidth / 2
    blockConfig.width = el.offsetWidth
    blockConfig.height = el.offsetHeight
    blockConfig.center = false
  }
})
</script>

<template>
  <div class="editor-block" :style="style">
    <component
      :is="currentComponent"
      :ref="setCurrentComponentRef"
    />
  </div>
</template>

<style scoped lang="scss">
.editor-block {
  position: absolute;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent !important;
  }
}
</style>
