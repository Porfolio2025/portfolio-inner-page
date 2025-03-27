<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch, defineProps, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import Button from './ButtonComponent.vue'
import type { IconName } from '../../assets/icons'
import Colors from '../../constants/colors'
import colors from '../../constants/colors'
import Icon from '@/components/general/IconComponent.vue'
import DragIndicator from './DragIndicator.vue'
import ResizeIndicator from './ResizeIndicator.vue'

export interface WindowProps {
  closeWindow: () => void
  minimizeWindow: () => void
  onInteract: () => void
  width: number
  height: number
  top: number
  left: number
  windowTitle?: string
  bottomLeftText?: string
  rainbow?: boolean
  windowBarColor?: string
  windowBarIcon?: IconName
  onWidthChange?: (width: number) => void
  onHeightChange?: (height: number) => void
}

const props = defineProps<WindowProps>()

const windowRef = ref<HTMLElement | null>(null)
const dragRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const resizeRef = ref<HTMLElement | null>(null)

const onResizeRef = ref<InstanceType<typeof ResizeIndicator> | null>(null)
const dragIndicatorRef = ref<InstanceType<typeof DragIndicator> | null>(null)

const dragProps = ref<{ offsetX: number; offsetY: number } | null>(null)
const lastClickInside = ref(false)

const topVal = ref(props.top)
const leftVal = ref(props.left)
const widthVal = ref(props.width)
const heightVal = ref(props.height)

const windowActive = ref(true)
const isMaximized = ref(false)
const isDragging = ref(false)
const isResizing = ref(false)

const preMaxSize = reactive({
  width: widthVal.value,
  height: heightVal.value,
  top: topVal.value,
  left: leftVal.value,
})

const styleTopBar = computed<CSSProperties>(() => {
  let backgroundColor: string = Colors.blue

  if (props.windowBarColor) {
    backgroundColor = props.windowBarColor
  }
  if (!windowActive.value) {
    backgroundColor = Colors.darkGray
  }

  return {
    backgroundColor,
    width: '100%',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    paddingRight: '2px',
    boxSizing: 'border-box',
  }
})

const startResize = (event: MouseEvent) => {
  event.preventDefault()
  isResizing.value = true
  window.addEventListener('mousemove', onResize, false)
  window.addEventListener('mouseup', stopResize, false)
}

const onResize = (event: MouseEvent) => {
  const curWidth = event.clientX - leftVal.value
  const curHeight = event.clientY - topVal.value
  if (curWidth > 520 && resizeRef.value) {
    if (onResizeRef.value?.resizeRef) onResizeRef.value.resizeRef.style.width = `${curWidth}px`
  }
  if (curHeight > 220 && resizeRef.value) {
    if (onResizeRef.value?.resizeRef) onResizeRef.value.resizeRef.style.height = `${curHeight}px`
  }
  if (resizeRef.value) {
    if (onResizeRef.value?.resizeRef) onResizeRef.value.resizeRef.style.opacity = '1'
  }
}

const stopResize = () => {
  isResizing.value = false
  if (resizeRef.value) {
    widthVal.value = parseInt(resizeRef.value.style.width)
    heightVal.value = parseInt(resizeRef.value.style.height)
    console.log(
      'Final width and height:',
      resizeRef.value.style.width,
      resizeRef.value.style.height,
    )
    resizeRef.value.style.opacity = '0'
  }
  window.removeEventListener('mousemove', onResize, false)
  window.removeEventListener('mouseup', stopResize, false)
}

const startDrag = (event: MouseEvent) => {
  event.preventDefault()
  isDragging.value = true

  dragProps.value = {
    offsetX: event.clientX - leftVal.value,
    offsetY: event.clientY - topVal.value,
  }

  nextTick(() => {
    onDrag(event)
  })

  window.addEventListener('mousemove', onDrag, false)
  window.addEventListener('mouseup', stopDrag, false)
}

const onDrag = (event: MouseEvent) => {
  if (!dragProps.value) return

  const newLeft = event.clientX - dragProps.value.offsetX
  const newTop = event.clientY - dragProps.value.offsetY

  if (dragIndicatorRef.value?.dragRef) {
    dragIndicatorRef.value.dragRef.style.transform = `translate(${newLeft}px, ${newTop}px)`
  }
}

const stopDrag = (event: MouseEvent) => {
  isDragging.value = false
  if (!dragProps.value) return

  leftVal.value = event.clientX - dragProps.value.offsetX
  topVal.value = event.clientY - dragProps.value.offsetY

  dragProps.value = null
  window.removeEventListener('mousemove', onDrag, false)
  window.removeEventListener('mouseup', stopDrag, false)
}

watch([leftVal, topVal], ([newLeft, newTop]) => {
  if (dragRef.value) {
    dragRef.value.style.transform = `translate(${newLeft}px, ${newTop}px)`
  }
})

watch(widthVal, (newVal) => {
  if (props.onWidthChange) {
    props.onWidthChange(newVal)
  }
})
watch(heightVal, (newVal) => {
  if (props.onHeightChange) {
    props.onHeightChange(newVal)
  }
})

const maximize = () => {
  if (isMaximized.value) {
    widthVal.value = preMaxSize.width
    heightVal.value = preMaxSize.height
    topVal.value = preMaxSize.top
    leftVal.value = preMaxSize.left
    isMaximized.value = false
  } else {
    preMaxSize.width = widthVal.value
    preMaxSize.height = heightVal.value
    preMaxSize.top = topVal.value
    preMaxSize.left = leftVal.value
    widthVal.value = window.innerWidth
    heightVal.value = window.innerHeight - 32
    topVal.value = 0
    leftVal.value = 0
    isMaximized.value = true
  }
}

const onCheckClick = (event: MouseEvent) => {
  if (windowRef.value && windowRef.value.contains(event.target as Node)) {
    windowActive.value = true
  } else {
    windowActive.value = false
  }
}

const onWindowInteract = () => {
  props.onInteract()
  windowActive.value = true
  lastClickInside.value = true
}

onMounted(() => {
  window.addEventListener('mousedown', onCheckClick, false)
})
onUnmounted(() => {
  window.removeEventListener('mousedown', onCheckClick, false)
})
</script>

<template>
  <div @mousedown="onWindowInteract">
    <div
      class="absolute bg-[var(--lightGray)]"
      :style="{
        width: `${widthVal}px`,
        height: `${heightVal}px`,
        top: `${topVal}px`,
        left: `${leftVal}px`,
      }"
      ref="windowRef"
    >
      <div
        class="border border-[var(--black)] border-t-[var(--lightGray)] border-l-[var(--lightGray)] flex-1"
      >
        <div
          class="border border-[var(--darkGray)] border-t-[var(--white)] border-l-[var(--white)] flex-1 p-[2px] flex-col"
        >
          <div
            class="absolute top-0 left-0 w-[90%] h-[20px] cursor-move"
            @mousedown="startDrag"
          ></div>

          <div :class="[props.rainbow ? 'rainbow-wrapper' : '']" :style="styleTopBar">
            <div class="flex-1 d-flex items-center">
              <template v-if="props.windowBarIcon">
                <Icon
                  :icon="props.windowBarIcon"
                  class="pr-[4px] pl-[4px]"
                  :style="{ ...(windowActive ? {} : { opacity: 0.5 }) }"
                  :size="18"
                />
              </template>
              <template v-else>
                <div style="width: 16px"></div>
              </template>
              <p class="showcase-header" :style="!windowActive ? { color: colors.lightGray } : {}">
                {{ props.windowTitle }}
              </p>
            </div>
            <div class="d-flex items-center">
              <Button icon="minimize" @click="props.minimizeWindow" />
              <Button icon="maximize" @click="maximize" />
              <div style="padding-left: 2px">
                <Button icon="close" @click="props.closeWindow" />
              </div>
            </div>
          </div>

          <div
            class="border border-white border-t-[var(--darkGray)] border-l-[var(--darkGray)] grow mt-[8px] mb-[8px] overflow-hidden"
          >
            <div
              class="flex-1 overflow-hidden border border-2-[var(--lightGray)] border-t-[var(--black)] border-l-[var(--black)]"
            >
              <div class="flex-1 relative overflow-hidden bg-white" ref="contentRef">
                <slot />
              </div>
            </div>
          </div>

          <div
            class="absolute w-[60px] h-[60px] bottom-[-20px] rigth-[-20px] cursor-nwse-resize"
            @mousedown="startResize"
          ></div>

          <div class="d-flex shrink w-full h-[20px] bg-[var(--lightGray)]">
            <div
              class="items-center items-center p-[2px] border border-white border-t-[var(--darkGray)] border-l-[var(--darkGray)]"
              :style="{ flex: 5 / 7 }"
            >
              <p style="font-size: 12px; margin-left: 4px; font-family: MSSerif; color: black">
                {{ props.bottomLeftText }}
              </p>
            </div>
            <div
              class="w-[16px] ml-[2px] p-[2px] border border-white border-t-[var(--darkGray)] border-l-[var(--darkGray)]"
            ></div>
            <div
              class="w-[16px] ml-[2px] p-[2px] border border-white border-t-[var(--darkGray)] border-l-[var(--darkGray)]"
            ></div>
            <div
              class="d-flex justify-end ml-[2px] pl-[2px] p-[2px] border border-white border-t-[var(--darkGray)] border-l-[var(--darkGray)]"
              :style="{ flex: 2 / 7 }"
            >
              <div style="align-items: flex-end">
                <Icon size="12px" icon="windowResize" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isDragging"
      style="position: absolute; left: 0; top: 0; mix-blend-mode: difference; z-index: 1000"
    >
      <DragIndicator
        :width="widthVal"
        :height="heightVal"
        ref="dragIndicatorRef"
        :is-dragging="isDragging"
      />
    </div>

    <!-- TODO: Implement ResizeIndicator -->
    <!-- <div
      :style="
        !isResizing
          ? { zIndex: -10000, pointerEvents: 'none' }
          : { zIndex: 1000, cursor: 'nwse-resize', mixBlendMode: 'difference' }
      "
    >
      <ResizeIndicator
        ref="onResizeRef"
        :top="topVal"
        :left="leftVal"
        :width="widthVal"
        :height="heightVal"
      />
    </div> -->
  </div>
</template>
