<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { CSSProperties } from 'vue'
import Colors from '@/constants/colors'

const BORDER_WIDTH = 6

interface DragIndicatorProps {
  dragRef: any
  width: number
  height: number
}

const props = defineProps<DragIndicatorProps>()

// Definimos un objeto de estilos similar al de React:
const styles = computed<Record<string, CSSProperties>>(() => ({
  draggable: {
    opacity: 0,
    position: 'absolute',
    boxSizing: 'border-box',
    flexDirection: 'column',
  },
  hozDrag: {
    width: '100%',
    height: `${BORDER_WIDTH}px`,
    backgroundColor: Colors.white,
    pointerEvents: 'none',
  },
  vertDragContainer: {
    width: '100%',
    height: `calc(100% - ${BORDER_WIDTH * 2}px)`,
    flex: 1,
    justifyContent: 'space-between',
    pointerEvents: 'none',
  },
  vertDrag: {
    width: `${BORDER_WIDTH}px`,
    height: '100%',
    backgroundColor: Colors.white,
    pointerEvents: 'none',
  },
  checkerboard: {
    backgroundImage: `linear-gradient(45deg, black 25%, transparent 25%), linear-gradient(-45deg, black 25%, transparent 25%), linear-gradient(45deg, transparent 75%, black 75%), linear-gradient(-45deg, transparent 75%, black 75%)`,
    backgroundSize: '4px 4px',
    backgroundPosition: '0 0, 0 2px, 2px -2px, -2px 0px',
    pointerEvents: 'none',
  },
}))
</script>

<template>
  <!-- Usamos un array en :style para combinar objetos -->
  <div
    ref="props.dragRef"
    :style="[styles.draggable, { width: props.width + 'px', height: props.height + 'px' }]"
  >
    <!-- Barra horizontal superior -->
    <div :style="[styles.hozDrag, styles.checkerboard]"></div>
    <!-- Contenedor vertical con dos barras -->
    <div :style="styles.vertDragContainer">
      <div :style="[styles.vertDrag, styles.checkerboard]"></div>
      <div :style="[styles.vertDrag, styles.checkerboard]"></div>
    </div>
    <!-- Barra horizontal inferior -->
    <div :style="[styles.hozDrag, styles.checkerboard]"></div>
  </div>
</template>
