<script setup lang="ts">
import type { Component } from 'vue'
import { ref, reactive, onMounted, watch, h } from 'vue'
import type { VNode } from 'vue'
import type { IconName } from '@/assets/icons'
import DesktopShortcut from '@/components/os/DesktopShortcut.vue'
import Toolbar from '@/components/os/ToolbarComponent.vue'
import Doom from '../applications/DoomApp.vue'
// import OregonTrail from '../applications/OregonTrailApp.vue'
import Digger from '../applications/DiggerApp.vue'
// import Scrabble from '../applications/ScrabbleApp.vue'
import GoogleExplorer from '../applications/GoogleExplorer.vue'
import ShowcaseApp from '../applications/ShowcaseApp.vue'

const windows = reactive<Record<string, WindowInstance>>({})
const shortcuts = ref<DesktopShortcut[]>([])
const shutdown = ref(false)
const numShutdowns = ref(1)

interface WindowInstance {
  zIndex: number
  minimized: boolean
  component: VNode
  name: string
  icon: IconName
}

interface DesktopShortcut {
  icon: IconName
  shortcutName: string
  onOpen: () => void
}

interface Application {
  key: string
  name: string
  shortcutIcon: IconName
  component: Component
}

const APPLICATIONS: Record<string, Application> = {
  showcase: {
    key: 'showcase',
    name: 'My Showcase',
    shortcutIcon: 'showcaseIcon',
    component: ShowcaseApp,
  },
  googleExplorer: {
    key: 'googleExplorer',
    name: 'Google Explorer',
    shortcutIcon: 'computerBig',
    component: GoogleExplorer,
  },
  doom: {
    key: 'doom',
    name: 'Doom',
    shortcutIcon: 'doomIcon',
    component: Doom,
  },
  // trail: {
  //   key: 'trail',
  //   name: 'Oregon Trail',
  //   shortcutIcon: 'trailIcon',
  //   component: OregonTrail,
  // },
  digger: {
    key: 'digger',
    name: 'Digger',
    shortcutIcon: 'diggerIcon',
    component: Digger,
  },
  // scrabble: {
  //   key: 'scrabble',
  //   name: 'Scrabble',
  //   shortcutIcon: 'scrabbleIcon',
  //   component: Scrabble,
  // },
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

const toggleMinimize = (key: string) => {
  const win = windows[key]
  if (win) {
    const highestIndex = getHighestZIndex()
    if (win.minimized || win.zIndex === highestIndex) {
      win.minimized = !win.minimized
    }
    win.zIndex = getHighestZIndex() + 1
  }
}

const onWindowInteract = (key: string) => {
  if (windows[key]) {
    windows[key].zIndex = getHighestZIndex() + 1
  }
}

const startShutdown = () => {
  setTimeout(() => {
    shutdown.value = true
    numShutdowns.value++
  }, 600)
}

const addWindow = (key: string, component: VNode): void => {
  windows[key] = {
    zIndex: getHighestZIndex() + 1,
    minimized: false,
    component: component,
    name: APPLICATIONS[key].name,
    icon: APPLICATIONS[key].shortcutIcon,
  }
}

//TODO: Implement shutdown
// const setShutdown = (value: boolean) => {
//   shutdown.value = value
// }

onMounted(() => {
  const newShortcuts: DesktopShortcut[] = []
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

  newShortcuts.forEach((shortcut) => {
    if (shortcut.shortcutName === 'My Showcase') {
      shortcut.onOpen()
    }
  })

  shortcuts.value = newShortcuts
})
</script>

<template>
  <div v-if="!shutdown" class="min-h-full flex-1">
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

    <div class="absolute top-[10px] left-[6px]">
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

    <Toolbar :windows="windows" :toggleMinimize="toggleMinimize" :shutdown="startShutdown" />
  </div>
</template>
