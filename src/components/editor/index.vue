<script setup lang="ts">
interface Prop {
  data: object
}

defineProps<Prop>()
</script>

<template>
  <div class="editor">
    <div class="editor-left">

    </div>
    <div class="editor-center">
      <div class="editor-center-top">

      </div>
      <div class="editor-center-container">
        <div class="editor-canvas">

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
    background-color: blue;
  }

  &-right {
    width: 340px;
    background-color: rgb(72, 66, 194);
  }

  &-center {
    display: flex;
    flex-direction: column;
    flex: 1;

    &-top {
      height: 50px;
      background-color: purple;
    }

    &-container {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      overflow: auto;
      background-color: rgb(153, 153, 153);

      // 画布
      .editor-canvas {
        height: 600px;
        width: 400px;
        background-color: pink;
      }
    }
  }
}
</style>
