<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'

interface Prop {
  blockConfig: {
    top: number
    left: number
    zIndex: number
    type: string
    center: boolean
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
    const el: HTMLElement = currentComponentRef.value.$el ?? currentComponentRef.value
    blockConfig.top = blockConfig.top - el.offsetHeight / 2
    blockConfig.left = blockConfig.left - el.offsetWidth / 2
    blockConfig.center = false
  }
})
</script>

<template>
  <component :is="currentComponent" :ref="setCurrentComponentRef" class="editor-block" :style="style" />
</template>

<style scoped lang="scss">
.editor-block {
  position: absolute;
}
</style>
