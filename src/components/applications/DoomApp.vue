<script setup lang="ts">
import { ref } from 'vue'
import DosPlayer from '@/components/dos/DosPlayer.vue'
import Window from '../os/WindowComponent.vue'

interface DoomAppProps {
  onClose: []
  onInteract: () => void;
  onMinimize: () => void
  // Puedes agregar más propiedades si es necesario (por ejemplo, extendiendo WindowAppProps)
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

const { onClose, onInteract, onMinimize } = props
</script>

<template>
  <Window
    :top="10"
    :left="10"
    :width="width"
    :height="height"
    windowTitle="Doom"
    windowBarColor="#1C1C1C"
    windowBarIcon="windowGameIcon"
    bottomLeftText="Powered by JSDOS & DOSBox"
    :closeWindow="onClose"
    :onInteract="onInteract"
    :minimizeWindow="onMinimize"
    :onWidthChange="updateWidth"
    :onHeightChange="updateHeight"
  >
    <DosPlayer :width="width" :height="height" bundleUrl="doom.jsdos" />
  </Window>
</template>
