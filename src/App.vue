<script setup lang="ts">
import { provide, ref } from 'vue'
import data from './data.json'
import Editor from '@/components/editor/index.vue'

const state = ref(data)
const config = state.value.block

provide('blockConfig', config)
</script>

<template>
  <div class="app">
    <Editor :data="state" />
  </div>
</template>

<style scoped lang="scss">
.app {
  height: 100%;
  width: 100%;
}
</style>
