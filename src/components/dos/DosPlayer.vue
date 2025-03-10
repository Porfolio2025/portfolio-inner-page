<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed, type CSSProperties } from 'vue'
import type { DosPlayer as Instance, DosPlayerFactoryType } from 'js-dos'

declare const Dos: DosPlayerFactoryType

interface PlayerProps {
  width: number
  height: number
  bundleUrl: string
}

const props = defineProps<PlayerProps>()

const rootRef = ref<HTMLDivElement | null>(null)
let dosInstance: Instance | null = null

const styleDOS = computed<CSSProperties>(() => ({
  width: props.width + 'px',
  height: props.height + 'px',
  position: 'absolute',
  margin: 0,
  padding: 0,
}))

onMounted(() => {
  if (rootRef.value) {
    dosInstance = Dos(rootRef.value)

    const elements = rootRef.value.getElementsByClassName('flex-grow-0')
    while (elements.length > 0) {
      elements[0].remove()
    }

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
  <div ref="rootRef" :style="styleDOS"></div>
</template>
