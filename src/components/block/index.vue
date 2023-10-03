<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'

interface Prop {
  blockConfig: { [key: string]: number }
}

const props = defineProps<Prop>()
const registerConfig = inject('registerConfig')

const currentComponentRef = ref()
const setCurrentComponentRef = function(e: any) {
  currentComponentRef.value = e
}

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

onMounted(() => {
  if (props.blockConfig.center && currentComponentRef.value) {
    // props.blockConfig.top = props.blockConfig.top - currentComponentRef.value!.offsetHeight / 2
    // props.blockConfig.left = props.blockConfig.left - currentComponentRef.value!.offsetWidth / 2
    console.log(props.blockConfig.top, currentComponentRef.value)
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
