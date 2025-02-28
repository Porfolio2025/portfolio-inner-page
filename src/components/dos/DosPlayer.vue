<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { DosPlayer as Instance, DosPlayerFactoryType } from 'js-dos'

// Se asume que Dos está disponible globalmente según la definición de js-dos
declare const Dos: DosPlayerFactoryType

interface PlayerProps {
  width: number
  height: number
  bundleUrl: string
}

const props = defineProps<PlayerProps>()

const rootRef = ref<HTMLDivElement | null>(null)
const dos = ref<Instance | null>(null)

onMounted(() => {
  if (!rootRef.value) return
  const instance = Dos(rootRef.value)
  dos.value = instance

  // Elimina todos los elementos con la clase 'flex-grow-0'
  const elements = rootRef.value.getElementsByClassName('flex-grow-0')
  while (elements.length > 0) {
    elements[0].remove()
  }

  onUnmounted(() => {
    instance.stop()
  })
})

// Cuando cambie el bundleUrl o cuando ya esté inicializado "dos", ejecuta el juego
watch(
  () => props.bundleUrl,
  (newBundleUrl) => {
    if (dos.value !== null) {
      dos.value.run(newBundleUrl)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div
    ref="rootRef"
    class="absolute"
    :style="{ width: props.width + 'px', height: props.height + 'px' }"
  ></div>
</template>
