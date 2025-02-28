<script setup lang="ts">
import type { Component } from 'vue'
import { ref, reactive, onMounted, watch, h } from 'vue'
import type { VNode } from 'vue'
import type { IconName } from '@/assets/icons'
import DesktopShortcut from '@/components/os/DesktopShortcut.vue'

import Doom from '../applications/DoomApp.vue'
const windows = reactive<Record<string, any>>({})
const shortcuts = ref<any[]>([])
const shutdown = ref(false)
// const numShutdowns = ref(1)

interface Application {
  key: string
  name: string
  shortcutIcon: IconName
  component: Component
}

const APPLICATIONS: Record<string, Application> = {
  // trail: {
  //   key: 'trail',
  //   name: 'The Oregon Trail',
  //   shortcutIcon: 'trailIcon',
  //   component: OregonTrail,
  // },
  doom: {
    key: 'doom',
    name: 'Doom',
    shortcutIcon: 'doomIcon',
    component: Doom,
  },
}

const rebootDesktop = () => {
  for (const key in windows) {
    delete windows[key]
  }
}

watch(shutdown, (newVal) => {
  if (newVal) {
    rebootDesktop()
  }
})

const getHighestZIndex = () => {
  let highest = 0
  for (const key in windows) {
    const win = windows[key]
    if (win && win.zIndex > highest) {
      highest = win.zIndex
    }
  }
  return highest
}

const removeWindow = (key: string) => {
  setTimeout(() => {
    delete windows[key]
  }, 100)
}

const minimizeWindow = (key: string) => {
  if (windows[key]) {
    windows[key].minimized = true
  }
}

// const toggleMinimize = (key: string) => {
//   const win = windows[key]
//   if (win) {
//     const highestIndex = getHighestZIndex()
//     if (win.minimized || win.zIndex === highestIndex) {
//       win.minimized = !win.minimized
//     }
//     win.zIndex = getHighestZIndex() + 1
//   }
// }

const onWindowInteract = (key: string) => {
  if (windows[key]) {
    windows[key].zIndex = getHighestZIndex() + 1
  }
}

// const startShutdown = () => {
//   setTimeout(() => {
//     shutdown.value = true
//     numShutdowns.value++
//   }, 600)
// }

const addWindow = (key: string, component: VNode): void => {
  windows[key] = {
    zIndex: getHighestZIndex() + 1,
    minimized: false,
    component: component,
    name: APPLICATIONS[key].name,
    icon: APPLICATIONS[key].shortcutIcon,
  }
}

//TODO: Implementar secuencia de apagado
// const setShutdown = (value: boolean) => {
//   shutdown.value = value
// }

onMounted(() => {
  const newShortcuts: any[] = []
  Object.keys(APPLICATIONS).forEach((key) => {
    const app = APPLICATIONS[key]
    newShortcuts.push({
      shortcutName: app.name,
      icon: app.shortcutIcon,
      onOpen: () => {
        addWindow(
          app.key,
          h(app.component, {
            onInteract: () => onWindowInteract(app.key),
            onMinimize: () => minimizeWindow(app.key),
            onClose: () => removeWindow(app.key),
            key: app.key,
          }),
        )
      },
    })
  })

  // Abrir automáticamente el shortcut "My Showcase"
  newShortcuts.forEach((shortcut) => {
    if (shortcut.shortcutName === 'Doom') {
      shortcut.onOpen()
    }
  })

  shortcuts.value = newShortcuts
})
</script>

<template>
  <div v-if="!shutdown" class="min-h-full flex-1">
    <!-- Render de ventanas -->
    <div
      v-for="(win, key) in windows"
      :key="`win-${key}`"
      :style="{ zIndex: win.zIndex }"
      :class="{ 'pointer-events-none opacity-0': win.minimized }"
    >
      <component
        :is="win.component"
        @interact="() => onWindowInteract(key)"
        @close="() => removeWindow(key)"
      />
    </div>

    <!-- Render de shortcuts -->
    <div class="absolute top-4 left-[6px]">
      <div
        v-for="(shortcut, i) in shortcuts"
        :key="shortcut.shortcutName"
        class="absolute"
        :style="{ top: i * 104 + 'px' }"
      >
        <DesktopShortcut
          :icon="shortcut.icon"
          :shortcutName="shortcut.shortcutName"
          :onOpen="shortcut.onOpen"
        />
      </div>
    </div>

    <!-- Toolbar -->
    <!-- <Toolbar :windows="windows" :toggleMinimize="toggleMinimize" :shutdown="startShutdown" /> -->
  </div>

  <!-- Secuencia de apagado -->
  <!-- <ShutdownSequence v-else :setShutdown="setShutdown" :numShutdowns="numShutdowns" /> -->
</template>
