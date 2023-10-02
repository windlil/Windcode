<script setup lang="ts">
import EditorLeft from '../editor-left/index.vue'
import Block from '../block/index.vue'

interface Prop {
  data: any
}

defineProps<Prop>()
</script>

<template>
  <div class="editor">
    <div class="editor-left">
      <EditorLeft />
    </div>
    <div class="editor-center">
      <div class="editor-center-top">

      </div>
      <div class="editor-center-container">
        <div class="editor-canvas">
          <template v-for="block in data.block" :key="block.id">
            <Block :block-config="block" />
          </template>
        </div>
      </div>
    </div>
    <div class="editor-right">

    </div>
  </div>
</template>

<style scoped lang="scss">
.editor {
  display: flex;
  width: 100%;
  height: 100%;

  &>div {
    height: 100%;
  }

  &-left {
    width: 340px;
    background-color: var(--eidtor-sider-background-color);
  }

  &-right {
    width: 340px;
    background-color: var(--eidtor-sider-background-color);
  }

  &-center {
    display: flex;
    flex-direction: column;
    flex: 1;

    &-top {
      height: 50px;
      background-color: var(--editor-top-background-color);
    }

    &-container {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      overflow: auto;
      background-color: var(--editor-center-background-color);

      // 画布
      .editor-canvas {
        position: relative;
        height: 600px;
        width: 400px;
        background-color: pink;
      }
    }
  }
}
</style>
