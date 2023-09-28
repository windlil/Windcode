<script setup lang="ts">
import { computed } from 'vue'

interface Prop {
  blockConfig: { [key: string]: string }
}

const props = defineProps<Prop>()

const style = computed(() => {
  return {
    top: `${props.blockConfig.top}px`,
    left: `${props.blockConfig.left}px`,
    zIndex: `${props.blockConfig.zIndex}`,
  }
})
</script>

<template>
  <div class="editor-block" :style="style">
    这是一个代码块
  </div>
</template>

<style scoped lang="scss">
.editor-block {
  position: absolute;
}
</style>
