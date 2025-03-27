<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Icon from '../general/IconComponent.vue'

const props = defineProps({
  windows: {
    type: Object,
    required: true,
  },
  toggleMinimize: {
    type: Function,
    required: true,
  },
  shutdown: {
    type: Function,
    required: true,
  },
})

const handleShutdown = (event: MouseEvent): void => {
  console.log('shutdown')

  props.shutdown(event)
}

const startWindowOpen = ref(false)
const lastClickInside = ref(false)
const time = ref(getTime())

const lastActive = computed(() => {
  let max = 0,
    keyActive = ''
  for (const key in props.windows) {
    if (props.windows[key].zIndex >= max) {
      max = props.windows[key].zIndex
      keyActive = key
    }
  }
  return keyActive
})

function getTime() {
  const date = new Date()
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const amPm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12
  const mins = minutes < 10 ? '0' + minutes : minutes
  return `${hours}:${mins} ${amPm}`
}

function updateTime() {
  time.value = getTime()
  setTimeout(updateTime, 5000)
}

function onCheckClick() {
  if (lastClickInside.value) {
    startWindowOpen.value = true
  } else {
    startWindowOpen.value = false
  }
  lastClickInside.value = false
}

function toggleStartWindow() {
  if (!startWindowOpen.value) {
    lastClickInside.value = true
  } else {
    lastClickInside.value = false
  }
}

function onStartWindowClicked() {
  startWindowOpen.value = true
  lastClickInside.value = true
}

onMounted(() => {
  updateTime()
  window.addEventListener('mousedown', onCheckClick, false)
})
onUnmounted(() => {
  window.removeEventListener('mousedown', onCheckClick, false)
})
</script>

<template>
  <div
    class="absolute bottom-0 left-0 w-full h-8 bg-[var(--lightGray)] box-border z-[100000] border-t border-l border-r border-t-white border-l-white border-r-black"
  >
    <div
      v-if="startWindowOpen"
      @mousedown="onStartWindowClicked"
      class="absolute bottom-[28px] flex flex-1 w-[256px] left-[4px] box-border border border-white border-b-black border-r-black bg-[var(--lightGray)]"
    >
      <div
        class="border border-[var(--lightGray)] border-b-[var(--darkGray)] border-r-[var(--darkGray)] flex-1"
      >
        <div class="h-full bg-[var(--darkGray)]">
          <p
            class="verticalText font-[Terminal] text-[32px] px-[4px] pt-[8px] pb-[64px] tracking-[1px] text-[var(--lightGray)] transform [transform:scale(-1)] [writing-mode:vertical-rl]"
          >
            ChrisOS
          </p>
        </div>
        <div class="flex-1 flex flex-col justify-end">
          <div class="flex-1"></div>
          <div class="h-[1px] bg-[var(--white)] border border-t-[var(--darkGray)]"></div>
          <div
            class="start-menu-option flex items-center p-[8px] text-black"
            @mousedown="handleShutdown"
          >
            <Icon class="size-8" icon="computerBig" />
            <p class="text-sm ml-2 font-[MSSerif]">Sh<u>u</u>t down...</p>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex items-center justify-between w-full h-full box-border p-[2px]">
      <div class="d-flex grow w-full">
        <div
          :class="{
            activeTabOuter: startWindowOpen,
            startContainerOuter: true,
          }"
          @mousedown="toggleStartWindow"
        >
          <div :class="{ activeTabInner: startWindowOpen, startContainer: true }">
            <Icon size="18px" icon="windowsStartIcon" class="mr-[4px]" />
            <p class="toolbar-text">Start</p>
          </div>
        </div>

        <div class="flex-1 ml-[4px] mr-[4px] mt-[4px] d-flex">
          <div
            v-for="(win, key) in windows"
            :key="key"
            :class="{
              activeTabOuter: lastActive === key && !win.minimized,
              tabContainerOuter: true,
            }"
            @mousedown="() => toggleMinimize(key)"
          >
            <div
              :class="{
                activeTabInner: lastActive === key && !win.minimized,
                tabContainer: true,
              }"
            >
              <Icon size="18px" :icon="win.icon" class="mr-[12px]" />
              <p class="text-[14px] font-[MSSerif] pt-[4px]">{{ win.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="shrink w-[86px] h-[24px] box-border mr-[4px] pl-[4px] pr-[4px] border border-[var(--white)] border-t-[var(--darkGray)] border-l-[var(--darkGray)] justify-between items-center text-black"
      >
        <Icon class="cursor-pointer h-[18px]" icon="volumeOn" />
        <p class="text-[12px] font-[MSSerif] pt-[4px]">{{ time }}</p>
      </div>
    </div>
  </div>
</template>
