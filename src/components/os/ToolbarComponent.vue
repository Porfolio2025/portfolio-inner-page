<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { CSSProperties } from 'vue'
import Icon from '../general/IconComponent.vue'
import Colors from '../../constants/colors'

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

const toolbarOuter = computed<CSSProperties>(() => ({
  position: 'absolute',
  bottom: '0',
  left: '0',
  width: '100%',
  height: '32px',
  background: Colors.lightGray,
  boxSizing: 'border-box',
  zIndex: 100000,
  borderTop: '1px solid #FFFFFF',
  borderLeft: '1px solid #FFFFFF',
  borderRight: '1px solid #000000',
}))

const verticalStartContainer = computed<CSSProperties>(() => ({
  height: '100%',
  background: Colors.darkGray,
}))

const verticalText = computed<CSSProperties>(() => ({
  fontFamily: 'Terminal',
  textOrientation: 'sideways',
  fontSize: '32px',
  padding: '4px',
  paddingBottom: '64px',
  paddingTop: '8px',
  letterSpacing: 1,
  color: Colors.lightGray,
  transform: 'scale(-1)',
  WebkitTransform: 'scale(-1)',
  MozTransform: 'scale(-1)',
  msTransform: 'scale(-1)',
  OTransform: 'scale(-1)',
  writingMode: 'vertical-rl',
}))

const startWindowContent = computed<CSSProperties>(() => ({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'flex-end',
}))

const startWindow = computed<CSSProperties>(() => ({
  position: 'absolute',
  bottom: '28px',
  display: 'flex',
  flex: 1,
  width: '256px',
  left: '4px',
  boxSizing: 'border-box',
  border: `1px solid ${Colors.white}`,
  borderBottomColor: Colors.black,
  borderRightColor: Colors.black,
  background: Colors.lightGray,
}))

const activeTabOuter = computed<CSSProperties>(() => ({
  border: `1px solid ${Colors.black}`,
  borderBottomColor: Colors.white,
  borderRightColor: Colors.white,
}))

const startWindowInner = computed<CSSProperties>(() => ({
  border: `1px solid ${Colors.lightGray}`,
  borderBottomColor: Colors.darkGray,
  borderRightColor: Colors.darkGray,
  flex: 1,
}))

const startMenuIcon = computed<CSSProperties>(() => ({
  width: '32px',
  height: '32px',
}))

const startMenuText = computed<CSSProperties>(() => ({
  fontSize: '14px',
  fontFamily: 'MSSerif',
  marginLeft: '8px',
}))

const startMenuOption = computed<CSSProperties>(() => ({
  alignItems: 'center',
  height: '48px',
  padding: '12px',
  color: Colors.black,
}))

const startMenuSpace = computed<CSSProperties>(() => ({
  flex: 1,
}))

const startMenuLine = computed<CSSProperties>(() => ({
  height: '1px',
  background: Colors.white,
  borderTop: `1px solid ${Colors.darkGray}`,
}))

const activeTabInner = computed<CSSProperties>(() => ({
  border: `1px solid ${Colors.darkGray}`,
  borderBottomColor: Colors.lightGray,
  borderRightColor: Colors.lightGray,
  backgroundImage: `linear-gradient(45deg, white 25%, transparent 25%), linear-gradient(-45deg, white 25%, transparent 25%), linear-gradient(45deg, transparent 75%, white 75%), linear-gradient(-45deg, transparent 75%, white 75%)`,
  backgroundSize: `4px 4px`,
  backgroundPosition: `0 0, 0 2px, 2px -2px, -2px 0px`,
  pointerEvents: 'none',
}))

const tabContainerOuter = computed<CSSProperties>(() => ({
  display: 'flex',
  flex: 1,
  maxWidth: '300px',
  height: '28px',
  marginBottom: '2px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  border: `1px solid ${Colors.white}`,
  borderBottomColor: Colors.black,
  borderRightColor: Colors.black,
  color: Colors.black,
}))

const tabContainer = computed<CSSProperties>(() => ({
  display: 'flex',
  border: `1px solid ${Colors.lightGray}`,
  borderBottomColor: Colors.darkGray,
  borderRightColor: Colors.darkGray,
  alignItems: 'center',
  paddingLeft: '2px',
  flex: 1,
}))

const tabIcon = computed<CSSProperties>(() => ({
  marginRight: '12px',
}))

const startContainer = computed<CSSProperties>(() => ({
  alignItems: 'center',
  flexShrink: 1,
  border: `1px solid ${Colors.lightGray}`,
  borderBottomColor: Colors.darkGray,
  borderRightColor: Colors.darkGray,
  padding: '1px',
  paddingLeft: '5px',
  paddingRight: '5px',
}))

const startContainerOuter = computed<CSSProperties>(() => ({
  height: '28px',
  marginTop: '4px',
  marginBottom: '4px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  border: `1px solid ${Colors.white}`,
  borderBottomColor: Colors.black,
  borderRightColor: Colors.black,
}))

const toolbarTabsContainer = computed<CSSProperties>(() => ({
  flex: 1,
  marginLeft: '4px',
  marginRight: '4px',
  marginTop: '4px',
  display: 'flex',
}))

const startIcon = computed<CSSProperties>(() => ({
  marginRight: '4px',
}))

const toolbarInner = computed<CSSProperties>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  padding: '2px',
}))
const toolbar = computed<CSSProperties>(() => ({
  display: 'flex',
  flexGrow: 1,
  width: '100%',
}))

const timeStyle = computed<CSSProperties>(() => ({
  flexShrink: 1,
  width: '86px',
  height: '24px',
  boxSizing: 'border-box',
  marginRight: '4px',
  paddingLeft: '4px',
  paddingRight: '4px',
  border: `1px solid ${Colors.white}`,
  borderTopColor: Colors.darkGray,
  justifyContent: 'space-between',
  alignItems: 'center',
  borderLeftColor: Colors.darkGray,
  color: Colors.black,
}))

const volumeIcon = computed<CSSProperties>(() => ({
  cursor: 'pointer',
  height: '18px',
}))

const tabText = computed<CSSProperties>(() => ({
  fontSize: '14px',
  fontFamily: 'MSSerif',
}))

const timeText = computed<CSSProperties>(() => ({
  fontSize: '12px',
  fontFamily: 'MSSerif',
}))
</script>

<template>
  <div :style="toolbarOuter">
    <div v-if="startWindowOpen" @mousedown="onStartWindowClicked" :style="startWindow">
      <div :style="startWindowInner">
        <div :style="verticalStartContainer">
          <p :style="verticalText">ChrisOS</p>
        </div>
        <div :style="startWindowContent">
          <div :style="startMenuSpace"></div>
          <div :style="startMenuLine"></div>
          <div class="start-menu-option" :style="startMenuOption" @mousedown="handleShutdown">
            <Icon :style="startMenuIcon" icon="computerBig" />
            <p :style="startMenuText">Sh<u>u</u>t down...</p>
          </div>
        </div>
      </div>
    </div>

    <div :style="toolbarInner">
      <div :style="toolbar">
        <div
          :style="[startContainerOuter, startWindowOpen && activeTabOuter]"
          @mousedown="toggleStartWindow"
        >
          <div :style="[startContainer, startWindowOpen && activeTabInner]">
            <Icon size="18px" icon="windowsStartIcon" :style="startIcon" />
            <p class="toolbar-text">Start</p>
          </div>
        </div>

        <div :style="toolbarTabsContainer">
          <div
            v-for="(win, key) in windows"
            :key="key"
            :style="[tabContainerOuter, lastActive === key && !win.minimized && activeTabOuter]"
            @mousedown="() => toggleMinimize(key)"
          >
            <div :style="[tabContainer, lastActive === key && !win.minimized && activeTabInner]">
              <Icon size="18px" :icon="win.icon" :style="tabIcon" />
              <p :style="tabText">{{ win.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <div :style="timeStyle">
        <Icon :style="volumeIcon" icon="volumeOn" />
        <p :style="timeText">{{ time }}</p>
      </div>
    </div>
  </div>
</template>
