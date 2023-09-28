<script setup lang="ts">
import { ref } from 'vue'
import data from './data.json'
import Editor from '@/components/editor/index.vue'

const state = ref(data)
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
