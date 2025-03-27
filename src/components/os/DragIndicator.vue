<script setup lang="ts">
import { defineProps, ref, defineExpose } from 'vue'

const BORDER_WIDTH = 6

interface DragIndicatorProps {
  width: number
  height: number
  isDragging: boolean
}

const props = defineProps<DragIndicatorProps>()

const localDragRef = ref<HTMLElement | null>(null)

defineExpose({
  dragRef: localDragRef,
})
</script>

<template>
  <div
    ref="localDragRef"
    class="absolute border-content flex-col"
    :style="[
      { width: props.width + 'px', height: props.height + 'px', opacity: props.isDragging ? 1 : 0 },
    ]"
  >
    <div
      class="w-full pointer-events-none bg-white checkerboard"
      :style="{ height: `${BORDER_WIDTH}px` }"
    ></div>

    <div
      class="w-full flex-1 justify-between pointer-events-none"
      :style="{ height: `calc(100% - ${BORDER_WIDTH * 2}px)` }"
    >
      <div
        class="h-full bg-white pointer-events-none checkerboard"
        :style="{ width: `${BORDER_WIDTH}px` }"
      ></div>
      <div
        class="h-full bg-white pointer-events-none checkerboard"
        :style="{ width: `${BORDER_WIDTH}px` }"
      ></div>
    </div>

    <div
      class="w-full pointer-events-none bg-white checkerboard"
      :style="{ height: `${BORDER_WIDTH}px` }"
    ></div>
  </div>
</template>
