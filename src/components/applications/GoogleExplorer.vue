<script setup lang="ts">
import { ref, watch } from 'vue'
import Window from '@/components/os/WindowComponent.vue'

interface GoogleExplorerProps {
  onClose: () => void
  onInteract: () => void
  onMinimize: () => void
}

const props = defineProps<GoogleExplorerProps>()

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

const { onClose, onInteract, onMinimize } = props
</script>

<template>
  <Window
    :top="10"
    :left="10"
    :width="width"
    :height="height"
    windowTitle="Google Explorer"
    windowBarColor="#1C1C1C"
    windowBarIcon="computerSmall"
    :closeWindow="onClose"
    :onInteract="onInteract"
    :minimizeWindow="onMinimize"
    :onWidthChange="updateWidth"
    :onHeightChange="updateHeight"
  >
    <div className="site-page">
      <iframe
        src="https://oldgoogle.neocities.org/1998/"
        title="google"
        width="100%"
        height="100%"
      />
    </div>
  </Window>
</template>
