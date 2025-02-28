<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { DosPlayer as Instance, DosPlayerFactoryType } from 'js-dos';

declare const Dos: DosPlayerFactoryType;

interface PlayerProps {
  width: number
  height: number
  bundleUrl: string
}

const props = defineProps<PlayerProps>()

const rootRef = ref<HTMLDivElement | null>(null)
let dosInstance: any = null

onMounted(() => {
  if (rootRef.value) {
    dosInstance = Dos(rootRef.value)

    // Elimina todos los elementos con la clase 'flex-grow-0'
    const elements = rootRef.value.getElementsByClassName('flex-grow-0')
    while (elements.length > 0) {
      elements[0].remove()
    }

    // Ejecuta el juego inicialmente
    if (props.bundleUrl) {
      dosInstance.run(props.bundleUrl)
    }
  }
})

onUnmounted(() => {
  if (dosInstance) {
    dosInstance.stop()
  }
})

// Observa cambios en bundleUrl y ejecuta el juego en consecuencia
watch(
  () => props.bundleUrl,
  (newBundleUrl) => {
    if (dosInstance && newBundleUrl) {
      dosInstance.run(newBundleUrl)
    }
  },
)
</script>

<template>
  <div ref="rootRef" :style="{ width: props.width + 'px', height: props.height + 'px' }"></div>
</template>
