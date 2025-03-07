<script setup lang="ts">
import { computed, defineProps, ref, defineExpose } from 'vue'
import type { CSSProperties } from 'vue'
import Colors from '@/constants/colors'

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

const draggable = computed<CSSProperties>(() => ({
  opacity: props.isDragging ? 1 : 0,
  position: 'absolute',
  boxSizing: 'border-box',
  flexDirection: 'column',
}))

const hozDrag = computed<CSSProperties>(() => ({
  width: '100%',
  height: `${BORDER_WIDTH}px`,
  backgroundColor: Colors.white,
  pointerEvents: 'none',
}))

const vertDragContainer = computed<CSSProperties>(() => ({
  width: '100%',
  height: `calc(100% - ${BORDER_WIDTH * 2}px)`,
  flex: 1,
  justifyContent: 'space-between',
  pointerEvents: 'none',
}))

const vertDrag = computed<CSSProperties>(() => ({
  width: `${BORDER_WIDTH}px`,
  height: '100%',
  backgroundColor: Colors.white,
  pointerEvents: 'none',
}))

const checkerboard = computed<CSSProperties>(() => ({
  backgroundImage: `linear-gradient(45deg, black 25%, transparent 25%), linear-gradient(-45deg, black 25%, transparent 25%), linear-gradient(45deg, transparent 75%, black 75%), linear-gradient(-45deg, transparent 75%, black 75%)`,
  backgroundSize: '4px 4px',
  backgroundPosition: '0 0, 0 2px, 2px -2px, -2px 0px',
  pointerEvents: 'none',
}))
</script>

<template>
  <div
    ref="localDragRef"
    :style="[draggable, { width: props.width + 'px', height: props.height + 'px' }]"
  >
    <div :style="[hozDrag, checkerboard]"></div>

    <div :style="vertDragContainer">
      <div :style="[vertDrag, checkerboard]"></div>
      <div :style="[vertDrag, checkerboard]"></div>
    </div>

    <div :style="[hozDrag, checkerboard]"></div>
  </div>
</template>
