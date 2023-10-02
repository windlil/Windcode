<script setup lang="ts">
import { inject } from 'vue'

const registerConfig = inject<any>('registerConfig')
</script>

<template>
  <div class="editor-left">
    <div class="editor-left-title">
      组件列表
    </div>
    <template v-for="block in registerConfig.componentList" :key="block.id">
      <div class="editor-left-box">
        <component :is="block.preview()" />
        <div class="editor-left-box__name">
          {{ block.label }}
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.editor-left {
  width: 100%;
  height: 100%;
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
</style>
