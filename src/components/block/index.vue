<script setup lang="ts">
import { computed, inject } from 'vue'

interface Prop {
  blockConfig: { [key: string]: string }
}

const props = defineProps<Prop>()
const registerConfig = inject('registerConfig')

const style = computed(() => {
  return {
    top: `${props.blockConfig.top}px`,
    left: `${props.blockConfig.left}px`,
    zIndex: `${props.blockConfig.zIndex}`,
  }
})

const currentComponent = computed(() => {
  return (registerConfig as any).componentMap.get(props.blockConfig.type).render()
})
</script>

<template>
  <component :is="currentComponent" class="editor-block" :style="style" />
</template>

<style scoped lang="scss">
.editor-block {
  position: absolute;
}
</style>
