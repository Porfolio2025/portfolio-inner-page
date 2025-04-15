<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import DosPlayer from '@/components/dos/DosPlayer.vue'
import Window from '@/components/os/WindowComponent.vue'

interface DoomAppProps {
  onClose: () => void
  onInteract: () => void
  onMinimize: () => void
}

const props = defineProps<DoomAppProps>()

const width = ref(980)
const height = ref(670)

const updateWidth = (newWidth: number) => {
  width.value = newWidth
}

const updateHeight = (newHeight: number) => {
  height.value = newHeight
}

watch([width, height], ([newWidth, newHeight]) => {
  console.log('New dimensions:', newWidth, newHeight)
})

const dosPlayerWidth = computed(() => width.value - 10)
const dosPlayerHeight = computed(() => height.value - 65)

const { onClose, onInteract, onMinimize } = props
</script>

<template>
  <Window
    :top="10"
    :left="10"
    :width="width"
    :height="height"
    windowTitle="Oregon Trail"
    windowBarColor="#1C1C1C"
    windowBarIcon="windowGameIcon"
    bottomLeftText="Powered by JSDOS & DOSBox"
    :closeWindow="onClose"
    :onInteract="onInteract"
    :minimizeWindow="onMinimize"
    :onWidthChange="updateWidth"
    :onHeightChange="updateHeight"
  >
    <DosPlayer :width="dosPlayerWidth" :height="dosPlayerHeight" bundleUrl="/games/trail.jsdos" />
  </Window>
</template>
