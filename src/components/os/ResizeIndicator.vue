<script setup lang="ts">
import { defineProps, ref } from 'vue'
import styles from './DragIndicator.vue'

interface ResizeIndicatorProps {
  top: number
  left: number
  width: number
  height: number
}

const props = defineProps<ResizeIndicatorProps>()

const localResizeRef = ref<HTMLElement | null>(null)

defineExpose({
  resizeRef: localResizeRef,
})
</script>

<template>
  <div
    :style="[
      styles.draggable,
      {
        top: props.top + 'px',
        left: props.left + 'px',
        width: props.width + 'px',
        height: props.height + 'px',
      },
    ]"
    ref="localResizeRef"
  >
    <div
      :style="{
        position: 'absolute',
        width: '32px',
        height: '32px',
        bottom: '-20px',
        right: '-20px',
      }"
    ></div>

    <div :style="[styles.hozDrag, styles.checkerboard]"></div>

    <div :style="styles.vertDragContainer">
      <div :style="[styles.vertDrag, styles.checkerboard]"></div>
      <div :style="[styles.vertDrag, styles.checkerboard]"></div>
    </div>

    <div :style="[styles.hozDrag, styles.checkerboard]"></div>
  </div>
</template>
