<script setup lang="ts">
import { RouterView } from 'vue-router'
import Window from '@/components/os/WindowComponent.vue'
import VerticalNavbar from '@/components/showcase/VerticalNavbar.vue'
import useInitialWindowSize from '@/hooks/useInitialWindowSize'

defineProps<{
  onClose: () => void
  onInteract: () => void
  onMinimize: () => void
}>()

const { initWidth, initHeight } = useInitialWindowSize({ margin: 100 })
</script>

<template>
  <Window
    :top="24"
    :left="56"
    :width="initWidth"
    :height="initHeight"
    windowTitle="Christian Carrasco - Portfolio 2025"
    windowBarIcon="windowExplorerIcon"
    :closeWindow="onClose"
    :onInteract="onInteract"
    :minimizeWindow="onMinimize"
    bottomLeftText="© Copyright 2025 Christian Carrasco"
  >
    <div class="site-page">
      <VerticalNavbar />
      <RouterView />
    </div>
  </Window>
</template>
