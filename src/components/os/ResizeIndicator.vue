<script setup lang="ts">
import { defineProps } from 'vue'
import styles from './DragIndicator.vue'

interface ResizeIndicatorProps {
  resizeRef: any
  top: number
  left: number
  width: number
  height: number
}

const props = defineProps<ResizeIndicatorProps>()
</script>

<template>
  <!-- Combina los estilos de "draggable" con las dimensiones y posición dinámicas -->
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
    <!-- Elemento auxiliar, similar al div vacío en React -->
    <div
      :style="{
        position: 'absolute',
        width: '32px',
        height: '32px',
        bottom: '-20px',
        right: '-20px',
      }"
    ></div>
    <!-- Barra horizontal superior -->
    <div :style="[styles.hozDrag, styles.checkerboard]"></div>
    <!-- Contenedor vertical con dos barras horizontales internas -->
    <div :style="styles.vertDragContainer">
      <div :style="[styles.vertDrag, styles.checkerboard]"></div>
      <div :style="[styles.vertDrag, styles.checkerboard]"></div>
    </div>
    <!-- Barra horizontal inferior -->
    <div :style="[styles.hozDrag, styles.checkerboard]"></div>
  </div>
</template>
