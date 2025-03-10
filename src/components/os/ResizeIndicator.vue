<script setup lang="ts">
import { defineProps, type Ref } from 'vue'
import styles from './DragIndicator.vue'

interface ResizeIndicatorProps {
  resizeRef: Ref<HTMLElement | null>
  top: number
  left: number
  width: number
  height: number
}

const props = defineProps<ResizeIndicatorProps>()
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
    :ref="props.resizeRef"
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
