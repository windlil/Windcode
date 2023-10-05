<script setup lang="ts">
import { provide, ref } from 'vue'
import data from './data.json'
import { registerConfig } from './utils/register.jsx'
import Editor from '@/components/editor/index.vue'
import { useDataStore } from '@/store/modules/data'

const state = ref(data)
const dataStore = useDataStore()
dataStore.setData(state)
provide('registerConfig', registerConfig)
</script>

<template>
  <div class="app">
    <Editor />
  </div>
</template>

<style scoped lang="scss">
.app {
  height: 100%;
  width: 100%;
}
</style>
