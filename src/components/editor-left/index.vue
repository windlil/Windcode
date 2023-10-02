<script setup lang="ts">
import { inject } from 'vue'

const registerConfig = inject<any>('registerConfig')
</script>

<template>
  <div class="editor-left">
    <template v-for="block in registerConfig.componentList" :key="block.id">
      <div class="editor-left-box">
        <component :is="block.preview()" />
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.editor-left {
  width: 100%;
  height: 100%;

  &-box {
    background-color: #fff;
  }
}
</style>
